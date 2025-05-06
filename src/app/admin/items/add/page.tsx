// src/app/admin/items/add/page.tsx
import { redirect } from 'next/navigation';
import { getAllCategories, getAllSubCategories } from '../add/actions';
import { getSessionAdmin } from '@/lib/session';
import AddItemForm from './components/AddItemForm';

export default async function AddItemPage() {
  const admin = await getSessionAdmin();
  if (!admin) redirect('/admin/login');


  const categories = await getAllCategories();
  const subcategories = await getAllSubCategories();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Item</h2>
      <AddItemForm
         categories={categories}
         subcategories={subcategories}
       />
     </div>
   );
 }