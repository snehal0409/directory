import { connectDB } from "@/lib/mongodb";
import {Subcategory} from "@/models/subcategory";
import { SubcategoryType } from "@/types";

export async function getSubcategoriesByCategoryKey(categoryKey: string): Promise<SubcategoryType[]> {
  await connectDB();

  const subcategories = await Subcategory.find({ subcategoryParent: categoryKey }).lean();

  // Explicitly return _id as string
  return subcategories.map((sub: any) => ({
    _id: sub._id.toString(),
    subcategoryKey: sub.subcategoryKey,
    subcategoryName: sub.subcategoryName,
    subcategoryParent: sub.subcategoryParent,
  }));
}
