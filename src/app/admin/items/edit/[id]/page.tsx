
import { redirect } from 'next/navigation';
import {EditItemForm} from './components/EditItemForm';
import { getSessionAdmin } from '@/lib/session';
import { getItemById } from '@/app/item/[id]/actions';
import { notFound } from 'next/navigation';
import { getAllCategories, getAllSubCategories } from '../../add/actions';

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
  return (
    <EditItemForm
      item={item}
      categories={categories}
      subcategories={subcategories}
    />
  );
}
