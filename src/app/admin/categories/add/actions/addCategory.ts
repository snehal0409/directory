// src/app/.admin/categories/add/actions/addCategory.ts
"use server";

import { connectDB } from "../../../../../lib/mongodb";
import Category from "../../../../../models/category";

export async function addCategory({
  categoryKey,
  categoryName,
}: {
  categoryKey: string;
  categoryName: string;
}) {
  try {
    await connectDB();
    await Category.create({ categoryKey, categoryName });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create category" + error };
  }
}
