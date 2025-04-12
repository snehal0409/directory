'use server';
import { connectDB } from './../../../../lib/mongodb';
import { Subcategory } from './../../../../models/subcategory';
import { SubcategoryType } from '../../../../types';

export async function addSubcategory(data: SubcategoryType) {
  await connectDB();
  await Subcategory.create(data);
}
