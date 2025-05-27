import React from 'react';
import { getCategoryData } from "./actions";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import { Header } from '@/app/_components/Header';
import { getPresignedDownloadUrl } from '@/lib/s3';

interface Props {
  params: Promise<{
    key: string;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { key } = await params;
  const data = await getCategoryData(key);

  if (!data || !data.category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-100 to-red-200 dark:from-zinc-900 dark:to-black">
        <div className="text-red-600 dark:text-red-400 text-xl font-semibold">
          Category not found.
        </div>
      </div>
    );
  }

  const { category, subcategories, listings } = data;

 
  const listingsWithSignedUrls = await Promise.all(
    listings.map(async (listing) => {
      if (listing.images?.length && listing.images[0].thumb) {
        try {
          const presignedUrl = await getPresignedDownloadUrl(listing.images[0].thumb);
          return {
            ...listing,
            images: [
              {
                ...listing.images[0],
                presignedUrl,
              },
              ...listing.images.slice(1),
            ],
          };
        } catch (err) {
          console.error(`Error fetching presigned URL for key ${listing.images[0].thumb}`, err);
        }
      }
      return listing;
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-zinc-900 dark:to-black p-6 sm:p-12">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
      
        <aside className="flex flex-col gap-6 p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white">
            {category.categoryName}
          </h2>

          {subcategories.length > 0 && (
            <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
              <div className="flex flex-col gap-3">
                {subcategories.map((sub) => (
                  <Link
                    key={sub._id}
                    href={`/category/${key}/subcategory/${sub.subcategoryKey}`}
                    className="block text-center bg-blue-200 hover:bg-blue-300 text-black font-bold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:scale-105"
                  >
                    {sub.subcategoryName}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

      
        <main className="flex flex-col gap-6">
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white">
            Listings in {category.categoryName}
          </h2>

          {listingsWithSignedUrls.length > 0 ? (
            listingsWithSignedUrls.map((listing) => (
              <div
                key={listing._id}
                className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-[1.03]"
              >
                <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">
                  <Link href={`/item/${listing._id}`} className="hover:underline">
                    {listing.itemTitle}
                  </Link>
                </h3>

                <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                  <Link
                    href={`/contact/${listing.createdBy?._id}`}
                    className="font-bold text-blue-700 dark:text-blue-300 hover:underline"
                  >
                    {listing.createdBy?.username ?? 'Unknown'}
                  </Link>{' '}
                  ·{' '}
                  {moment(listing.createdAt).calendar(null, {
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]',
                    nextWeek: 'dddd',
                    lastDay: '[Yesterday]',
                    lastWeek: '[Last] dddd',
                    sameElse: 'MMM Do YYYY',
                  })}{' '}
                  • {moment(listing.createdAt).format('h:mm A')}
                </div>

                {listing.images && listing.images[0]?.presignedUrl && (
                  <Link href={`/item/${listing._id}`}>
                    <div className="relative w-full h-64 mb-4">
                      <Image
                        src={listing.images[0].presignedUrl as string}
                        alt={listing.itemTitle}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg cursor-pointer"
                      />
                    </div>
                  </Link>
                )}

                <p className="text-base text-gray-700 dark:text-gray-300 whitespace-pre-line truncate-lines-2">
                  {listing.itemDescription}
                </p>
              </div>
            ))
          ) : (
            <div className="text-lg text-gray-600 dark:text-gray-400">
              No listings found under this category.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
