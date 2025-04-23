import { getItemsForSubcategory } from "./actions";
import { ItemType } from "@/types";
import Link from "next/link";

type SubcategoryPageProps = {
  params: {
    key: string;
    subCategoryKey: string;
  };
};

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { key, subCategoryKey } = params;

  const items: ItemType[] = await getItemsForSubcategory(subCategoryKey);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-100 dark:from-zinc-900 dark:to-black p-6 sm:p-12">
      
      {/* Top Navigation Links */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Link
          href="/"
          className="inline-block px-5 py-2 rounded-full backdrop-blur-sm bg-pink-300 text-black font-bold shadow-md hover:bg-pink-400 hover:scale-105 transition duration-300"
        >
          ⬅ Home
        </Link>
        <Link
          href={`/category/${key}`}
          className="inline-block px-5 py-2 rounded-full backdrop-blur-sm bg-pink-300 text-black font-bold shadow-md hover:bg-pink-400 hover:scale-105 transition duration-300"
        >
          ⬅ Go Back
        </Link>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
        {/* Sidebar - Category & Subcategory Info */}
        <aside className="flex flex-col gap-6 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
          {/* Category Link */}
          <Link
            href={`/category/${key}`}
            className="text-base px-4 py-2 rounded-full font-bold bg-gradient-to-r from-purple-100 to-purple-300 dark:from-zinc-700 dark:to-zinc-800 text-black hover:scale-105 transition-transform duration-300 text-center"
          >
            🔙 {key.replace(/-/g, " ").toUpperCase()}
          </Link>

          {/* Subcategory Link */}
          <Link
            href={`/category/${key}/subcategory/${subCategoryKey}`}
            className="text-base px-4 py-2 rounded-full font-bold bg-gradient-to-r from-blue-100 to-blue-300 dark:from-zinc-700 dark:to-zinc-800 text-black hover:scale-105 transition-transform duration-300 text-center"
          >
             {subCategoryKey.replace(/-/g, " ").toUpperCase()}
          </Link>
        </aside>

        {/* Main Content - Items */}
        <main className="flex flex-col gap-6">
          {items.length > 0 ? (
            items.map((listing) => (
              <div
                key={listing._id}
                className="p-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
              >
                <h2 className="font-bold text-2xl text-gray-800 dark:text-white mb-3">
                  {listing.itemTitle}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-line line-clamp-2">
                  {listing.itemDescription}
                </p>
              </div>
            ))
          ) : (
            <div className="text-gray-600 dark:text-gray-400 text-lg">
              No items found under this subcategory.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
