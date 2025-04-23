// src/app/admin/subcategories/actions/getSubcategoriesByCategoryKey.ts
import { connectDB } from "@/lib/mongodb";
import { Subcategory} from "@/models/subcategory";
import type { SubcategoryType } from "@/types";

export async function getSubcategoriesByCategoryKey(categoryKey: string): Promise<SubcategoryType[]> {
  await connectDB();

  const rawSubcategories = await Subcategory.find({ subcategoryParent: categoryKey })
    .sort({ created_time: -1 });

  const subcategories: SubcategoryType[] = rawSubcategories.map((sub) => ({
    _id: sub._id.toString(),
    subcategoryKey: sub.subcategoryKey,
    subcategoryName: sub.subcategoryName,
    subcategoryDescription: sub.subcategoryDescription,
    subcategoryParent: sub.subcategoryParent,
  }));

  return subcategories;
}
