'use server';
import { connectDB } from '../../../../lib/mongodb';
import { Subcategory } from '../../../../models/subcategory';

export const addSubcategory = async (formData: {
  subcategoryKey: string;
  subcategoryName: string;
  subcategoryParent: string;
}) => {
  await connectDB();
  const newSubcategory = new Subcategory(formData);
  await newSubcategory.save();
};

