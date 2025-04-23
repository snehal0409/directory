import { CategoryType, SubcategoryType, ItemType } from "@/types";
import { getCategoryData } from "./actions";
import Link from "next/link";

interface Props {
  params: {
    key: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const data = await getCategoryData(params.key);

  // Add a null check before destructuring the data
  if (!data || !data.category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-red-200 dark:from-zinc-900 dark:to-black">
        <div className="text-red-600 dark:text-red-400 text-xl font-semibold">
          Category not found.
        </div>
      </div>
    );
  }

  // Now that we've confirmed data.category is not null, we can safely destructure
  const { category, subcategories, listings }: {
    category: CategoryType;
    subcategories: SubcategoryType[];
    listings: ItemType[];
  } = data as { category: CategoryType; subcategories: SubcategoryType[]; listings: ItemType[] };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 p-6 sm:p-12 bg-gradient-to-r from-yellow-50 to-orange-100 dark:from-zinc-900 dark:to-black">
      {/* Sidebar - Subcategories & Back Link */}
      <aside className="flex flex-col gap-6 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
        {/* Category Info & Back */}
        <div className="flex flex-col gap-2 text-gray-700 dark:text-gray-300">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {category.categoryName}
          </h2>
          <Link href="/" className="text-md text-blue-600 dark:text-blue-400 hover:underline">
            ⬅ Home
          </Link>
        </div>

        {/* Subcategory Links */}
        {subcategories.length > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
            <div className="flex flex-col gap-3">
              {subcategories.map((sub) => (
                <Link
                  key={sub._id}
                  href={`/subcategory/${sub.subcategoryKey}`}
                  className="text-lg text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition-colors duration-300"
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
            <div
              key={listing._id}
              className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <h2 className="font-bold text-2xl text-gray-800 dark:text-white mb-3">
                {listing.itemTitle}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {listing.itemDescription}
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-600 dark:text-gray-400 text-lg">
            No listings found under this category.
          </div>
        )}
      </main>
    </div>
  );
}
