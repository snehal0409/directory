import { redirect } from 'next/navigation';
import Link from 'next/link';
import { session } from '@/app/actions/auth';
import { getItemsWithCategories } from './actions';
import DeleteButton from './components/DeleteButton';

export default async function ListingsPage() {
  const user = await session();

  if (!user) {
    redirect('/login');
  }

  const items = await getItemsWithCategories(user.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Listings</h2>
        <Link
          href="/user/listings/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          + Add New Listing
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500">No listings yet.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full text-sm text-left bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 border">Title</th>
                <th className="px-4 py-3 border">Category</th>
                <th className="px-4 py-3 border">Subcategory</th>
                <th className="px-4 py-3 border">Description</th>
                <th className="px-4 py-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 border font-medium text-gray-900">{item.itemTitle}</td>
                  <td className="px-4 py-3 border text-gray-700">{item.categoryName}</td>
                  <td className="px-4 py-3 border text-gray-700">{item.subcategoryName}</td>
                  <td className="px-4 py-3 border text-gray-600">{item.itemDescription}</td>
                  <td className="px-4 py-3 border text-center">
                    <div className="flex justify-center gap-4">
                      <Link
                        href={`/user/listings/edit/${item._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <DeleteButton itemId={item._id.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
