import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getItemById } from './actions';
import LightboxGallery from './components/LightboxGallery';
import moment from 'moment';
import { Header } from '@/app/_components/Header';

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getItemById(id);
  if (!item) return notFound();

  const itemOwnerId = item.createdBy?._id?.toString();

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-orange-100 dark:from-zinc-900 dark:to-black p-6 sm:p-12">
      <Header />

      <div className="flex p-6">
        <aside className="w-64 bg-white dark:bg-zinc-800 shadow-xl rounded-lg p-6">
          <div>
            <p className="text-base text-gray-900 dark:text-white">{item.categoryName}</p>
            <Link
              href={`/category/${item.categoryKey}/subcategory/${item.subcategoryKey}`}
              className="block text-base font-medium text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-zinc-700 rounded-md px-3 py-2 mt-4 hover:bg-blue-200 dark:hover:bg-zinc-600 transition"
            >
              {item.subcategoryName}
            </Link>
          </div>
        </aside>

        <main className="flex-1 bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-2xl ml-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {item.itemTitle}
          </h1>

          <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
            <Link
              href="#"
              className="font-semibold text-gray-800 dark:text-white hover:underline"
            >
              {item.createdBy?.username ?? 'Unknown'}
            </Link>
            <span>•</span>
            <div className="flex items-baseline space-x-1">
              <span>
                {moment(item.createdAt).calendar(null, {
                  sameDay: '[Today]',
                  nextDay: '[Tomorrow]',
                  nextWeek: 'dddd',
                  lastDay: '[Yesterday]',
                  lastWeek: '[Last] dddd',
                  sameElse: 'MMM Do YYYY',
                })}
              </span>
              <span className="ml-1">at {moment(item.createdAt).format('h:mm A')}</span>
            </div>
          </div>

          <div className="mb-6">
            <Link href={`/message/${itemOwnerId}`}>
              <button className="w-full p-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
                Send Message
              </button>
            </Link>
          </div>

          <LightboxGallery item={item} />
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-400 mt-6">
            {item.itemDescription}
          </p>
        </main>
      </div>
    </div>
  );
}
