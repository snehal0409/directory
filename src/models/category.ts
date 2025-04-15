import { Document, Schema, model, models } from 'mongoose';

export interface ICategory extends Document {
  categoryKey: string;
  categoryName: string;
}

// Define the Category schema
const CategorySchema = new Schema<ICategory>({
  categoryKey: { type: String, required: true, unique: true },
  categoryName: { type: String, required: true },
});

// Use the existing model if already defined, or define a new one
const Category = models.Category || model<ICategory>('Category', CategorySchema);

export default Category;
