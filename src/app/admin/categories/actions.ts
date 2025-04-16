// src/app/.admin/categories/components/actions.ts
"use server";

import { connectDB } from "../../../lib/mongodb";
import Category from "../../../models/category";

export async function deleteCategory(id: string) {
  try {
    await connectDB();
    await Category.findByIdAndDelete(id);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete category" };
  }
}
