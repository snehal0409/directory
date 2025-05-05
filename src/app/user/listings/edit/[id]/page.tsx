// src/app/user/listings/edit/[id]/page.tsx

import dbConnect from '@/lib/mongodb';

import { redirect } from 'next/navigation';
import {EditItemForm} from './components/EditItemForm';
import { session } from '@/app/actions/auth';
import { notFound } from 'next/navigation';
import { getItemById } from '@/app/item/[id]/actions';
import { getAllCategories, getAllSubCategories } from '@/app/user/listings/add/actions';

type Props = {
  params: Promise< { id: string }>;
};

export default async function EditItemPage({ params }: Props) {
  const user = await session();
  if (!user) redirect('/login');

  await dbConnect();
  const { id } = await params;

  const item = await getItemById(id);
    if (!item) return notFound();

  const categories = await getAllCategories();  
  
  const subcategories = await getAllSubCategories();  

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Edit Listing</h2>
      <EditItemForm
         item={item}
        categories={categories}
        subcategories={subcategories}
      />
    </div>
  );
}
