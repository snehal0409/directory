import { redirect } from 'next/navigation';
import Link from 'next/link';
import { session } from '@/app/actions/auth';
import { getItemsWithCategories } from './actions';
import DeleteButton from './components/DeleteButton';
import { Image as ImageType, Video as VideoType } from '@/models/item';
import Image from 'next/image';

interface Item {
  _id: string;
  itemTitle: string;
  categoryName: string;
  subcategoryName: string;
  itemDescription: string;
  images: ImageType[];
  videos: VideoType[];
}

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
                <th className="px-4 py-3 border">Image</th>
                <th className="px-4 py-3 border">Video</th>
                <th className="px-4 py-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(
                ({
                  _id,
                  itemTitle,
                  categoryName,
                  subcategoryName,
                  itemDescription,
                  images,
                  videos,
                }: Item) => (
                  <tr key={_id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 border font-medium text-gray-900">
                      {itemTitle}
                    </td>
                    <td className="px-4 py-3 border text-gray-700">
                      {categoryName}
                    </td>
                    <td className="px-4 py-3 border text-gray-700">
                      {subcategoryName}
                    </td>
                    <td className="px-4 py-3 border text-gray-600">
                      {itemDescription}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {images?.length > 0 && images[0]?.thumb ? (
                        <Image
                          src={`/uploads/thumbnails/${images[0].thumb}`}
                          alt="Listing"
                          width={64}
                          height={64}
                          className="object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-500">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      {videos?.length > 0 && videos[0]?.url ? (
                        <video
                          width={100}
                          height={64}
                          controls
                          className="rounded"
                        >
                          <source
                            src={`/uploads/videos/${videos[0].url}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <span className="text-gray-500">No video</span>
                      )}
                    </td>
                    <td className="px-4 py-3 border text-center">
                      <div className="flex justify-center gap-4">
                        <Link
                          href={`/user/listings/edit/${_id}`}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </Link>
                        <DeleteButton itemId={_id.toString()} />
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
