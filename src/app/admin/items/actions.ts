'use server';

import Item from '@/models/item';
import { connectDB } from '@/lib/mongodb';
import { redirect } from 'next/navigation';

export async function deleteItem(formData: FormData) {
  const id = formData.get('id') as string;
  await connectDB();
  await Item.findByIdAndDelete(id);
  redirect('/admin/items');
}

export async function getItemsWithCategories () {
  await connectDB();

  const items = await Item.aggregate([
   
    {
      $lookup: {
        from: 'subcategories',
        localField: 'subcategoryKey',
        foreignField: 'subcategoryKey',
        as: 'subcat',
      },
    },
    { $unwind: '$subcat' },
    {
      $lookup: {
        from: 'categories',
        localField: 'subcat.subcategoryParent',
        foreignField: 'categoryKey',
        as: 'cat',
      },
    },
    { $unwind: '$cat' },
    {
      $project: {
        itemTitle: 1,
        itemDescription: 1,
        subcategoryName: '$subcat.subcategoryName',
        categoryName: '$cat.categoryName',
        images: 1,
        videos: 1,
      },
    },
  ]);

  return items?.length ? items : [];
}
