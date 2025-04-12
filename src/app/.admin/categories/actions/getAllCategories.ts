// src/app/.admin/categories/actions/getAllCategories.ts
"use server";

import { connectDB } from "../../../../lib/mongodb";
import Category from "../../../../models/category";

export async function getAllCategories() {
  await connectDB();

  const categories = await Category.find().lean<Array<{ _id: unknown; categoryKey: string; categoryName: string }>>();
  return categories.map((cat: { _id: unknown; categoryKey: string; categoryName: string }) => ({
    _id: String(cat._id),
    categoryKey: cat.categoryKey,
    categoryName: cat.categoryName,
  }));
}
