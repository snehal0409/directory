"use server";

import { connectDB } from "@/lib/mongodb";
import Item from "@/models/item";
import { ItemType } from "@/types";

export async function getItemsForSubcategory(subCategoryKey: string): Promise<ItemType[]> {
  await connectDB();

  const items = await Item.aggregate([
    {
      $match: {
        subcategoryKey: subCategoryKey,
      },
    },
    {
      $lookup: {
        from: 'users',           // join with users collection
        localField: 'userId',     // Item.userId
        foreignField: 'userId',   // User.userId
        as: 'createdBy',
      },
    },
    {
      $unwind: {
        path: '$createdBy',
        preserveNullAndEmptyArrays: true,  // In case user was deleted
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        itemTitle: 1,
        itemDescription: 1,
        createdAt: 1,
        images: 1,
        createdBy: {
          _id: '$createdBy._id',
          username: '$createdBy.username',
        },
      },
    },
  ]);

  return JSON.parse(JSON.stringify(items)) as ItemType[];
}
