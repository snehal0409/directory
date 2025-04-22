// src/app/admin/subcategories/actions/getSubcategoriesByCategoryKey.ts
import { connectDB } from "@/lib/mongodb";
import{ Subcategory} from "@/models/subcategory";

export async function getSubcategoriesByCategoryKey(categoryKey: string) {
  await connectDB();
  return Subcategory.find({ subcategoryParent: categoryKey }).sort({ subcategoryName: 1 }).lean();
}
