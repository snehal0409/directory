'use server';
import { connectDB } from '../../../../lib/mongodb';
import { Subcategory } from '../../../../models/subcategory';

export async function deleteSubcategory(id: string) {
  try {
    await connectDB();
    await Subcategory.findByIdAndDelete(id); // Deletes the subcategory from MongoDB
  } catch (error) {
    console.error('Failed to delete subcategory:', error);
    throw new Error('Error deleting subcategory');
  }
}
