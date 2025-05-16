import AdminHeadingLink from './components/AdminHeadingLink';
import Link from 'next/link';
import { deleteItem, getItemsWithCategories } from './actions';
import Image from 'next/image';

import { getSessionAdmin } from '@/lib/session';
import { redirect } from 'next/navigation';
import AdminNav from '../dashboard/components/AdminNav';


export default async function ItemsPage() {
    const user = await getSessionAdmin();
    if (!user) redirect('/admin/login');

  const items = await getItemsWithCategories();

  return (
    <div className="p-4">
        <AdminNav />
      <AdminHeadingLink title="Items" href="/admin/items/add" linkText="Add Item" />

      <table className="w-full border mt-4 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Category</th>
            <th className="p-2">Subcategory</th>
            <th className="p-2">Images</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{item.itemTitle}</td>
              <td className="p-2">{item.itemDescription}</td>
              <td className="p-2">{item.categoryName}</td>
              <td className="p-2">{item.subcategoryName}</td>
              <td className="p-2">
                {item.images && item.images.length > 0 ? (
                  <Image
                    src={`/uploads/thumbnails/${item.images[0].thumb}`}
                    alt={item.itemTitle}
                    width={64}
                    height={64}
                    className="object-cover rounded"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="p-2 space-x-2">
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
    </div>
  );
}
