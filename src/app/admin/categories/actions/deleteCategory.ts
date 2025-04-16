// src/app/.admin/categories/actions/deleteCategory.ts
"use server";

import { connectDB } from "../../../../lib/mongodb";
import Category from "../../../../models/category";
import { ObjectId } from "mongodb";

export async function deleteCategory(id: string) {
  try {
    await connectDB();
    await Category.deleteOne({ _id: new ObjectId(id) });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete category" + error };
  }
}
