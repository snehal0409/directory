import { Schema, model, Document, models } from 'mongoose';
import { ICategory } from './category'; // Correctly import the ICategory interface

interface ISubcategory extends Document {
  subcategoryKey: string;
  subcategoryName: string;
  subcategoryParent: string; // Reference to the Category model
}

const SubcategorySchema = new Schema<ISubcategory>({
  subcategoryKey: { type: String, required: true, unique: true },
  subcategoryName: { type: String, required: true },
  subcategoryParent: { type: String, required: true }, // Reference to Category
});

// Check if the model is already defined and use it, otherwise create a new one
const Subcategory = models.Subcategory || model<ISubcategory>('Subcategory', SubcategorySchema);

export default Subcategory;
