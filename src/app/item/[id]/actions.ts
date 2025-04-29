"use server";

import { connectDB } from '@/lib/mongodb';
import Item from '@/models/item';
import Category from '@/models/category';
import { Subcategory } from '@/models/subcategory';
import mongoose from 'mongoose';

export async function getItemById(id: string) {
  await connectDB();

  const result = await Item.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
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
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: 'userId',
        as: 'createdBy',
      },
    },
    {
      $unwind: {
        path: '$createdBy',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        itemTitle: 1,
        itemDescription: 1,
        createdAt: 1,
        images: 1,
        subcategoryName: '$subcat.subcategoryName',
        subcategoryKey: '$subcat.subcategoryKey', // fixed: typo in your code
        categoryName: '$cat.categoryName',
        categoryKey: '$cat.categoryKey',
        createdBy: {
          _id: '$createdBy._id',
          username: '$createdBy.username',
        },
      },
    },
  ]);

  return result ? result[0] : null;
}
