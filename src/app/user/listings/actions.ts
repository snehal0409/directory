'use server';

import { connectDB } from '@/lib/mongodb';
import Item from '@/models/item';
import { revalidatePath } from 'next/cache';
import { getSessionUser } from '@/lib/session';
import { redirect } from 'next/navigation';

// Add a new item
export async function addItem(formData: FormData) {
  const user = await getSessionUser();
  if (!user) redirect('/user/listings');

  const subcategoryKey = formData.get('subcategoryKey') as string;
  const itemTitle = formData.get('itemTitle') as string;
  const itemDescription = formData.get('itemDescription') as string;

  await connectDB();

  // Handle case where item data is missing
  if (!subcategoryKey || !itemTitle || !itemDescription) {
    throw new Error('All fields are required.');
  }

  await Item.create({
    subcategoryKey,
    itemTitle,
    itemDescription,
    userId: user._id,
  });

  redirect('/user/listings');
}

// Get all items for the current user
export async function getUserItems() {
  await connectDB();
  const user = await getSessionUser();
  if (!user) return [];

  const items = await Item.find({ userId: user._id })
    .populate('userId', 'username')
    .sort({ createdAt: -1 });

  return JSON.parse(JSON.stringify(items));
}

// Delete an item
export async function deleteItem(id: string) {
  await connectDB();
  await Item.findByIdAndDelete(id);
  revalidatePath("/user/listings");
}

// Get a single item by ID
export async function getItemById(id: string) {
  await connectDB();
  const item = await Item.findById(id);
  return item ? JSON.parse(JSON.stringify(item)) : null;
}

// Get items for a user with category and subcategory populated
export async function getItemsWithCategories(userId: string) {
  await connectDB();

  const items = await Item.aggregate([
    { $match: { userId } },
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

// Get all items for admin dashboard (with creator details)
export async function getAllItems() {
  await connectDB();

  const items = await Item.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: 'userId',
        as: 'createdBy',
      },
    },
    { $unwind: { path: '$createdBy', preserveNullAndEmptyArrays: true } },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        itemTitle: 1,
        itemDescription: 1,
        images: 1,
        videos: 1,
        createdAt: 1,
        createdBy: {
          _id: '$createdBy._id',
          username: '$createdBy.username',
        },
      },
    },
  ]);

  return JSON.parse(JSON.stringify(items));
}

// Update an item
export async function updateItem(
  id: string,
  title: string,
  description: string,
  subcategoryKey: string
) {
  const user = await getSessionUser();
  if (!user) redirect('/user/listings');

  await connectDB();

  // Ensure user can only update their own items
  await Item.updateOne(
    { _id: id, userId: user._id },
    {
      $set: {
        itemTitle: title,
        itemDescription: description,
        subcategoryKey,
        updatedAt: new Date(),
      },
    }
  );
}

// Get items by category key
export async function getItemsByCategoryKey(categoryKey: string) {
  await connectDB();

  return Item.aggregate([
    {
      $match: {
        categoryKey: categoryKey,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);
}
