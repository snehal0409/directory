import { CategoryType, SubcategoryType, ItemType } from "@/types";
import { getCategoryData } from "./actions";
import Link from "next/link";
import moment from "moment"; // Import moment for date formatting
import Image from "next/image"; // Import Image component for displaying images

interface Props {
  params: Promise <{
    key: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { key } = await params; // Await the params to get the key
  const data = await getCategoryData( key);

  if (!data || !data.category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-red-200 dark:from-zinc-900 dark:to-black">
        <div className="text-red-600 dark:text-red-400 text-xl font-semibold">
          Category not found.
        </div>
      </div>
    );
  }

  const { category, subcategories, listings }: {
    category: CategoryType;
    subcategories: SubcategoryType[];
    listings: ItemType[];
  } = data as { category: CategoryType; subcategories: SubcategoryType[]; listings: ItemType[] };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-orange-100 dark:from-zinc-900 dark:to-black p-6 sm:p-12">
      
      {/* Top Navigation Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-block px-5 py-2 rounded-full backdrop-blur-sm bg-pink-300 text-black font-bold shadow-md hover:bg-pink-400 hover:scale-105 transition duration-300"
        >
          ⬅ Home
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar - Subcategories & Category Info */}
        <aside className="flex flex-col gap-6 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
          <div className="flex flex-col gap-2 text-gray-700 dark:text-gray-300">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {category.categoryName}
            </h2>
          </div>

          {subcategories.length > 0 && (
            <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
              <div className="flex flex-col gap-3">
                {subcategories.map((sub) => (
                  <Link
                    key={sub._id}
                    href={`/category/${key}/subcategory/${sub.subcategoryKey}`}
                    className="text-base px-4 py-2 rounded-lg font-bold bg-gradient-to-r from-blue-100 to-blue-200 dark:from-zinc-700 dark:to-zinc-800 text-black hover:scale-105 transition-transform duration-300"
                  >
                    {sub.subcategoryName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Main Content - Listings */}
        <main className="flex flex-col gap-6">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <Link
                key={listing._id}
                href={`/item/${listing._id}`}
                className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                {/* Title */}
                <h2 className="font-bold text-2xl text-gray-800 dark:text-white mb-2">
                  {listing.itemTitle}
                </h2>

                {/* Username and Date below Title */}
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <Link
                    href={`/profile/${listing.createdBy?._id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    {listing.createdBy?.username ?? "Unknown"}
                  </Link>
                  <span className="mx-2">•</span>
                  <span className="text-gray-500 dark:text-gray-300">
                    {moment(listing.createdAt).calendar(null, {
                      sameDay: '[Today]',
                      nextDay: '[Tomorrow]',
                      nextWeek: 'dddd',
                      lastDay: '[Yesterday]',
                      lastWeek: '[Last] dddd',
                      sameElse: 'MMM Do YYYY',
                    })} at {moment(listing.createdAt).format('h:mm A')}
                  </span>
                </div>

                {/* Image */}
                {listing.images && listing.images[0]?.url && (
                  <Link href={`/item/${listing._id}`}>
                    <div className="relative w-full h-64 mb-4">
                      <Image
                        src={`/uploads/${listing.images[0].url}`} // Correct image path
                        alt={listing.itemTitle}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg cursor-pointer"
                      />
                    </div>
                  </Link>
                )}

                {/* Description */}
                <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line truncate-lines-2">
                  {listing.itemDescription}
                </p>
              </Link>
            ))
          ) : (
            <div className="text-gray-600 dark:text-gray-400 text-lg">
              No listings found under this category.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
