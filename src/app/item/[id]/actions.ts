"use server";

import { connectDB } from '@/lib/mongodb';
import Item from '@/models/item';
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
        subcategoryKey: '$subcat.subcategoryKey',
        categoryName: '$cat.categoryName',
        categoryKey: '$cat.categoryKey',
        createdBy: {
          _id: '$createdBy._id',
          username: '$createdBy.username',
        },
      },
    },
  ]);

  const item = result?.[0];
  if (!item) return null;

  return {
    ...item,
    _id: id,
    createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
    categoryKey: item.categoryKey?.toString?.() ?? item.categoryKey,
    subcategoryKey: item.subcategoryKey?.toString?.() ?? item.subcategoryKey,
    createdBy: {
      _id: item.createdBy?._id?.toString?.() ?? '',
      username: item.createdBy?.username ?? 'Unknown',
    },
    images: Array.isArray(item.images)
      ? item.images.map((image: { url: string, thumb: string }) => ({ url: image.url, thumb: image.thumb }))
      : [],
  };
}
