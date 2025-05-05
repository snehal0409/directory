import { redirect } from 'next/navigation';
import { getAllCategories, getAllSubCategories } from '../add/actions';
import AddItemForm from './components/AddItemForm';

import { session } from '@/app/actions/auth';

export default async function AddItemPage() {
  const user = await session();
   
      if (!user) {
         
         redirect("/user/listings"); 
      }
  
  const categories = await getAllCategories();
  const subcategories = await getAllSubCategories();


  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Listing</h2>
      <AddItemForm
        categories={categories}
        subcategories={subcategories}
      />
    </div>
  );
}


