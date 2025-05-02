import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/category';
import {Subcategory} from '@/models/subcategory';
import AddItemForm from './components/AddItemForm';

import { session } from '@/app/actions/auth';

export default async function AddItemPage() {
  const user = await session();
   
      if (!user) {
         
         redirect("/user/listings"); 
      }
  
     
    
  await dbConnect();

  const categories = await Category.find().lean();
  const subcategories = await Subcategory.find().lean();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Listing</h2>
      <AddItemForm
        categories={categories.map(c => ({
          categoryKey: c.categoryKey,
          categoryName: c.categoryName,
        }))}
        subcategories={subcategories.map(s => ({
          subcategoryKey: s.subcategoryKey,
          subcategoryName: s.subcategoryName,
          subcategoryParent: s.subcategoryParent,
        }))}
      />
    </div>
  );
}
