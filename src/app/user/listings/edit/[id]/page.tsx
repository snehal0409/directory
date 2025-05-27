// src/app/user/listings/edit/[id]/page.tsx



import { redirect } from 'next/navigation';
import {EditItemForm} from './components/EditItemForm';
import { session } from '@/app/actions/auth';
import { notFound } from 'next/navigation';
import { getItemById } from '@/app/item/[id]/actions';
import { getAllCategories, getAllSubCategories } from '@/app/user/listings/add/actions';
import { Header } from '@/app/_components/Header';

type Props = {
  params: Promise< { id: string }>;
};

export default async function EditItemPage({ params }: Props) {
  const user = await session();
  if (!user) redirect('/login');

  const { id } = await params;

  const item = await getItemById(id);
    if (!item) return notFound();

  const categories = await getAllCategories();  
  
  const subcategories = await getAllSubCategories();  

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
