import mongoose, { Schema, models } from 'mongoose';

import { Document } from 'mongoose';

export interface ISubcategory extends Document {
  subcategoryKey: string;
  subcategoryName: string;
  subcategoryParent: string;
}

const subcategorySchema = new Schema<ISubcategory>({
  subcategoryKey: { type: String, required: true, unique: true },
  subcategoryName: { type: String, required: true },
  subcategoryParent: { type: String, required: true },
});

export const Subcategory = models.Subcategory || mongoose.model<ISubcategory>('Subcategory', subcategorySchema);
