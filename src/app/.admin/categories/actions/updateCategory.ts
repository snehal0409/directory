// src/app/.admin/categories/actions/updateCategory.ts
"use server";

import Category from "../../../../models/category";
import { connectDB } from "../../../../lib/mongodb";
import { revalidatePath } from "next/cache";

export async function updateCategory(id: string, formData: FormData) {
  const categoryKey = formData.get("categoryKey")?.toString().trim();
  const categoryName = formData.get("categoryName")?.toString().trim();

  if (!categoryKey || !categoryName) return { success: false, error: "All fields are required." };

  await connectDB();

  const existing = await Category.findOne({ categoryKey, _id: { $ne: id } });
  if (existing) return { success: false, error: "Category key already in use." };

  await Category.findByIdAndUpdate(id, { categoryKey, categoryName });
  revalidatePath("/.admin/categories");
  return { success: true };
}
