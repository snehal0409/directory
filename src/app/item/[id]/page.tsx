import Link from 'next/link';
import { getItemById } from './actions';
import moment from 'moment';
import { notFound } from 'next/navigation';

type Item = {
  _id: string;
  itemTitle: string;
  itemDescription: string;
  itemSubcategory: string;
  createdAt: string;
  createdBy: {
    username: string;
  };
};

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const singleItem = await getItemById(id);

  if (!singleItem) return notFound();

  const { createdAt, createdBy } = singleItem;
  const postedDate = moment(createdAt).fromNow(); // e.g., "2 hours ago", "Yesterday"
  const username = createdBy?.username || "Unknown User";

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-orange-100 dark:from-zinc-900 dark:to-black p-6 sm:p-12">
      
      {/* Top Navigation Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="px-4 py-4 rounded-full backdrop-blur-sm bg-pink-300 text-black font-bold shadow-md hover:bg-pink-400 hover:scale-105 transition duration-300"
        >
          ⬅ Home
        </Link>
      </div>

      <div className="flex p-6">
        {/* Left Sidebar - Categories and Subcategories (Only for the current item) */}
        <aside className="w-64 bg-white dark:bg-zinc-800 shadow-xl rounded-lg p-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Category</h2>
            <p className="text-base text-gray-900 dark:text-white">{singleItem.categoryName}</p>

            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mt-4 mb-3">Subcategory</h2>
            <Link
              href={`/category/${singleItem.categoryKey}/subcategory/${singleItem.subcategoryKey}`}
              className="block text-base font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-zinc-700 rounded-md px-3 py-2 hover:bg-blue-200 dark:hover:bg-zinc-600 transition"
            >
              {singleItem.subcategoryName}
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-2xl ml-8">
          {/* Item Content */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{singleItem.itemTitle}</h1>

          {/* Username and Date */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Posted by{" "}
            <Link href="#" className="font-bold text-blue-600 dark:text-blue-400 underline hover:text-blue-500">
              {username}
            </Link>{" "}
            • {postedDate}
          </div>

          {/* Description */}
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-400">{singleItem.itemDescription}</p>
        </main>
      </div>
    </div>
  );
}
