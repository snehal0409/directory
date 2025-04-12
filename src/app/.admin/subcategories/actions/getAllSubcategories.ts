// src/app/.admin/subcategories/components/actions/getAllSubcategories.ts
'use server';
import { connectDB } from './../../../../lib/mongodb';
import { Subcategory } from './../../../../models/subcategory';

export async function getAllSubcategories() {
  await connectDB();
  return await Subcategory.find().lean();
}
