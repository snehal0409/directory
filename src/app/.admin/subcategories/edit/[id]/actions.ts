'use server';
import { connectDB } from '../../../../../lib/mongodb';
import { Subcategory } from '../../../../../models/subcategory';
import { SubcategoryType } from '../../../../../types';

export async function updateSubcategory(id: string, data: SubcategoryType) {
  await connectDB();
  await Subcategory.findByIdAndUpdate(id, data);
}
