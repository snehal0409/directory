"use server";

import { connectDB } from "@/lib/mongodb";
import Item from "@/models/item";
import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/session";
import { redirect } from "next/navigation";


export async function addItem(formData: FormData) {
  const user = await getSessionUser();
  if (!user) redirect('/user/listings');

  const subcategoryKey = formData.get('subcategoryKey') as string;
  const itemTitle = formData.get('itemTitle') as string;
  const itemDescription = formData.get('itemDescription') as string;

  await dbConnect();

  await Item.create({
    
    subcategoryKey,
    itemTitle,
    itemDescription,
  });

  redirect('/user/listings');
}

export async function getUserItems() {
  await connectDB();
  const user = await getSessionUser(); // ✅ you also forgot `await` here
  if (!user) return [];

  const items = await Item.find({ userId: user._id }).sort({ timeStamp: -1 });
  return JSON.parse(JSON.stringify(items));
}




  

export async function deleteItem(id: string) {
  await connectDB();
  await Item.findByIdAndDelete(id);
  revalidatePath("/user/listings");
}

export async function getItemById(id: string) {
  await connectDB();
  const item = await Item.findById(id);
  return item ? JSON.parse(JSON.stringify(item)) : null;
}
export async function getItemsWithCategories(userId: string){

await connectDB();

  // Aggregate listings with subcategory and category details
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
      },
    },
  ]);

  return items?.length ? items : []
}


export async function getAllItems() {
  await connectDB();
  const items = await Item.find({}).sort({createdAt: -1});

  return items;
}


function dbConnect() {
  throw new Error("Function not implemented.");
}

// src/app/(user)/dashboard/my-listings/components/actions.ts
export async function updateItem(
  id: string,
  title: string,
  description: string,
  subcategoryKey: string
) {
  const user = await getSessionUser();
  if (!user) redirect('/user/listings');

  await dbConnect();

  await Item.updateOne(
    { _id: id, userId: user.id },
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