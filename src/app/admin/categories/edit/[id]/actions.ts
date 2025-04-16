// src/app/.admin/categories/edit/[id]/components/actions.ts
"use server";

import { FlattenMaps } from "mongoose";
import { connectDB } from "../../../../../lib/mongodb";
import Category from "../../../../../models/category";

export async function getCategoryById(id: string) {
  try {
    await connectDB();
    const category = await Category.findById(id).lean() as (FlattenMaps<any> & Required<{ _id: string }> & { __v: number }) | null;
    if (!category) return null;

    return {
      _id: category._id.toString(),
      categoryKey: category.categoryKey,
      categoryName: category.categoryName,
    };
  } catch {
    return null;
  }
}

export async function updateCategory(id: string, updateData: { categoryKey: string; categoryName: string }) {
  try {
    await connectDB();
    await Category.findByIdAndUpdate(id, updateData);
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update category" };
  }
}
