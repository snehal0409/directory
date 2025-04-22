// src/app/page.tsx
import Link from "next/link";
import { getAllItems } from "../user/listings/actions";
import { getAllCategories } from "@/app/admin/categories/actions/getAllCategories";
import type { ItemType, CategoryType } from "@/types";

type Props = {
  user: {
    username: string;
    email: string;
  } | null;
};

export default async function Home({ user }: Props) {
  const listings: ItemType[] = await getAllItems();
  const categories: CategoryType[] = await getAllCategories();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 p-6 sm:p-12 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-black">
      
      {/* Sidebar - Categories & Auth */}
      <aside className="flex flex-col gap-6 p-4 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
        
        {/* Auth Links */}
        <div className="flex flex-col gap-2 text-gray-700 dark:text-gray-300">
          {user ? (
            <>
              <Link href="/profile" className="text-lg text-blue-600 dark:text-blue-400 hover:underline">
                Profile
              </Link>
              <Link href="/" className="text-lg text-blue-600 dark:text-blue-400 hover:underline">
                Home
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-lg text-gray-600 dark:text-gray-400 hover:underline">
                Login
              </Link>
              <Link href="/register" className="text-lg text-gray-600 dark:text-gray-400 hover:underline">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Category Links */}
        <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/category/${cat.categoryKey}`} // ⬅️ updated route
                className="text-lg text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 transition-colors duration-300"
              >
                {cat.categoryName}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content - Listings */}
      <main className="flex flex-col gap-6">
        {listings.map((listing) => (
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
        ))}
      </main>
    </div>
  );
}
