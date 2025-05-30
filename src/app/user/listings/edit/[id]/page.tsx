import { redirect, notFound } from 'next/navigation';
import { EditItemForm } from './components/EditItemForm';
import { session } from '@/app/actions/auth';
import { getItemById } from '@/app/item/[id]/actions';
import { getAllCategories, getAllSubCategories } from '@/app/user/listings/add/actions';
import { Header } from '@/app/_components/Header';
import { Image as ImageType, Video as VideoType } from '@/models/item';
import { getPresignedDownloadUrl } from '@/lib/s3';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditItemPage({ params }: Props) {
  const user = await session();
  if (!user) redirect('/login');

  const { id } = await params;

  const item = await getItemById(id);
  if (!item) return notFound();

  const categories = await getAllCategories();
  const subcategories = await getAllSubCategories();

  // Add presigned URLs for images
  item.images = await Promise.all(
    (item.images || []).map(async (img: ImageType) => ({
      ...img,
      presignedUrl: await getPresignedDownloadUrl(img.thumb),
      mainUrl: await getPresignedDownloadUrl(img.url),
    }))
  );

  // Add presigned URLs for videos
  item.videos = await Promise.all(
    (item.videos || []).map(async (vid: VideoType) => ({
      ...vid,
      presignedUrl: await getPresignedDownloadUrl(vid.thumb),
      mainUrl: await getPresignedDownloadUrl(vid.url),
    }))
  );

  return (
    <>
      <Header />
      <div className="space-y-4 m-6">
        <h2 className="text-xl font-semibold">Edit Listing</h2>
        <EditItemForm
          item={item}
          categories={categories}
          subcategories={subcategories}
        />
      </div>
    </>
  );
}
