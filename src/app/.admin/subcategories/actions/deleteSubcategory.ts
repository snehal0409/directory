'use server';
import { connectDB } from './../../../../lib/mongodb';
import { Subcategory } from '../../../../models/subcategory';

export async function deleteSubcategory(id: string) {
  await connectDB();
  await Subcategory.findByIdAndDelete(id);
}
