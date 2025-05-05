
import AdminHeadingLink from './components/AdminHeadingLink';
import Link from 'next/link';
import { deleteItem, getItemsWithCategories } from './actions';

export default async function ItemsPage() {
  const items = await getItemsWithCategories();

  return (
    <div className="p-4">
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
                {/* Check if item.images is an object or an array and render accordingly */}
                {item.images && item.images.length > 0 ? (
                  <img src={`/uploads/thumbnails/${item.images[0].thumb}`} alt={item.itemTitle} className="w-16 h-16" />
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
