
import { redirect } from 'next/navigation';
import {EditItemForm} from './components/EditItemForm';
import { getSessionAdmin } from '@/lib/session';
import { getItemById } from '@/app/item/[id]/actions';
import { notFound } from 'next/navigation';
import { getAllCategories, getAllSubCategories } from '../../add/actions';
import { Image as ImageType, Video as VideoType } from '@/models/item';
import { getPresignedDownloadUrl } from '@/lib/s3';


type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditItemPage({ params }: Props) {
  const user = await getSessionAdmin();
  if (!user) redirect('/admin/login');

  const { id } = await params;
const item = await getItemById(id);
    if (!item) return notFound();

  const categories = await getAllCategories();  
  
  const subcategories = await getAllSubCategories();  


      item.images = await Promise.all(
        (item.images || []).map(async (img: ImageType) => ({
          ...img,
          presignedUrl: await getPresignedDownloadUrl(img.thumb),
          mainUrl: await getPresignedDownloadUrl(img.url),
        }))
      );
      item.videos = await Promise.all(
        (item.videos || []).map(async (vid: VideoType) => ({
          ...vid,
          presignedUrl: await getPresignedDownloadUrl(vid.thumb),
          mainUrl: await getPresignedDownloadUrl(vid.url),
        }))
      );


  return (
    <EditItemForm
      item={item}
      categories={categories}
      subcategories={subcategories}
    />
  );
}
