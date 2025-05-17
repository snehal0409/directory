import Link from 'next/link';
import { deleteItem, getItemsWithCategories } from './actions';
import Image from 'next/image';
import { getSessionAdmin } from '@/lib/session';
import { redirect } from 'next/navigation';
import AdminNav from '../dashboard/components/AdminNav';
import LogoutButton from '../dashboard/components/logout';


export default async function ItemsPage() {
  const user = await getSessionAdmin();
  if (!user) redirect('/admin/login');

  const items = await getItemsWithCategories();

  return (
    <><div className="p-4">
      <AdminNav />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Items</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/items/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Item
          </Link>
          <LogoutButton />
        </div>
      </div>
    </div>
      <table className="w-full border-collapse border border-gray-300 mt-4 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-black-300">Title</th>
            <th className="p-2 border border-black-300">Description</th>
            <th className="p-2 border border-black-300">Category</th>
            <th className="p-2 border border-black-300">Subcategory</th>
            <th className="p-2 border border-black-300">Images</th>
            <th className="p-2 border border-black-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td className="p-2 border border-black-300">{item.itemTitle}</td>
              <td className="p-2 border border-black-300">{item.itemDescription}</td>
              <td className="p-2 border border-black-300">{item.categoryName}</td>
              <td className="p-2 border border-black-300">{item.subcategoryName}</td>
              <td className="p-2 border border-black-300">
                {item.images && item.images.length > 0 ? (
                  <Image
                    src={`/uploads/thumbnails/${item.images[0].thumb}`}
                    alt={item.itemTitle}
                    width={64}
                    height={64}
                    className="object-cover rounded" />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="p-2 border border-black-500 ">
                <Link href={`/admin/items/edit/${item._id}`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
                <form action={deleteItem} className="inline">
                  <input type="hidden" name="id" value={item._id.toString()} />
                  <button type="submit" className="text-red-600 hover:underline">
                    Delete
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
