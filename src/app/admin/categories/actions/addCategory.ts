// src/app/.admin/categories/actions/addCategory.ts
"use server";

import Category from "../../../../models/category";
import { connectDB } from "../../../../lib/mongodb";
import { revalidatePath } from "next/cache";

export async function addCategory(formData: FormData) {
  const categoryKey = formData.get("categoryKey")?.toString().trim();
  const categoryName = formData.get("categoryName")?.toString().trim();

  if (!categoryKey || !categoryName) return { success: false, error: "All fields are required." };

  await connectDB();

  const exists = await Category.findOne({ categoryKey });
  if (exists) return { success: false, error: "Category key already exists." };

  await Category.create({ categoryKey, categoryName });
  revalidatePath("/admin/categories");
  return { success: true };
}
