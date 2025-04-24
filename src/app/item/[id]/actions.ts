'use server';

import { connectDB } from '@/lib/mongodb';
import  Item  from '@/models/item';
import  Category  from '@/models/category';
import { Subcategory } from '@/models/subcategory';
import mongoose from 'mongoose';

export async function getItemById(id: string) {
  await connectDB();
  //return await Item.findById(id).lean();
  const result = await Item.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
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
        subCategoryKey: '$subcat.subcategoryName',
        categoryName: '$cat.categoryName',
        categoryKey: '$cat.categoryKey',
      },
    },

  ])

  return result?result[0]:null
}


export async function getAllCategories() {
  await connectDB();
  return await Category.find().lean();
}

export async function getAllSubcategories() {
  await connectDB();
  return await Subcategory.find().lean();
}
