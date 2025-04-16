'use server';

import { connectDB } from '../../../../lib/mongodb';
import { Subcategory } from '../../../../models/subcategory';

export async function updateSubcategory(
  id: string,
  data: {
    subcategoryKey: string;
    subcategoryName: string;
    subcategoryParent: string;
  }
) {
  try {
    await connectDB();
    await Subcategory.findByIdAndUpdate(id, data);
  } catch (error) {
    console.error('Failed to update subcategory:', error);
    throw new Error('Error updating subcategory');
  }
}
