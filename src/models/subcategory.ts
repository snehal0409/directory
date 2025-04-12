// src/models/subcategory.ts
import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
  subcategoryKey: { type: String, required: true, unique: true },
  subcategoryName: { type: String, required: true },
  subcategoryParent: { type: String, required: true }, // categoryKey of parent
});

export const Subcategory =
  mongoose.models.Subcategory || mongoose.model('Subcategory', SubcategorySchema);
