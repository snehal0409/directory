import Link from 'next/link';
import moment from 'moment';
import { getItemById } from './actions';
import { notFound } from 'next/navigation';
import Image from 'next/image'; // Import Image component

type Item = {
  _id: string;
  itemTitle: string;
  itemDescription: string;
  itemSubcategory: string;
  categoryName: string;
  categoryKey: string;
  subcategoryName: string;
  subcategoryKey: string;
  createdAt: string;
  createdBy: {
    username: string;
  };
  images: { url: string }[]; // Assuming `images` is an array of objects containing `url`
};

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const singleItem: Item | null = await getItemById(id);

  if (!singleItem) return notFound();

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
        {/* Left Sidebar - Category Info */}
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
          {/* Item Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {singleItem.itemTitle}
          </h1>

          {/* Posted by and Date */}
          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="#"
              className="font-semibold text-gray-800 dark:text-white hover:underline"
            >
              {singleItem.createdBy?.username ?? 'Unknown'}
            </Link>
            <span className="mx-1">•</span>
            <span>
              {moment(singleItem.createdAt).calendar(null, {
                sameDay: '[Today]',
                nextDay: '[Tomorrow]',
                nextWeek: 'dddd',
                lastDay: '[Yesterday]',
                lastWeek: '[Last] dddd',
                sameElse: 'MMM Do YYYY',
              })}
              {' • '}
              {moment(singleItem.createdAt).format('h:mm A')}
            </span>
          </div>

          {/* Image */}
          {singleItem.images && singleItem.images[0]?.url && (
            <div className="relative w-full h-64 mb-4">
              <Image
                src={`/uploads/${singleItem.images[0].url}`} // Correct image path
                alt={singleItem.itemTitle}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}

          {/* Item Description */}
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-400">
            {singleItem.itemDescription}
          </p>
        </main>
      </div>
    </div>
  );
}
