import mongoose, { Schema, models } from 'mongoose';

const subcategorySchema = new Schema({
  subcategoryKey: { type: String, required: true, unique: true },
  subcategoryName: { type: String, required: true },
  subcategoryParent: { type: String, required: true },
});

export const Subcategory = models.Subcategory || mongoose.model('Subcategory', subcategorySchema);
