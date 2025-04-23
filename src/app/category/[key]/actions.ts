// src/app/category/[key]/components/actions.ts
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { Subcategory } from "@/models/subcategory";
import Item from "@/models/item";
import { CategoryType, SubcategoryType, ItemType } from "@/types";

export async function getCategoryData(categoryKey: string): Promise<{
  category: CategoryType | null;
  subcategories: SubcategoryType[];
  listings: ItemType[];
} | null> {
  await connectDB();

  const category = await Category.findOne({ categoryKey }).lean() as CategoryType | null;
  if (!category) return null;

  // Fetch subcategories and ensure proper casting
  const subcategories = await Subcategory.find({ subcategoryParent: categoryKey }).lean();

  // Explicitly cast subcategories to match the SubcategoryType[] definition
  const typedSubcategories = subcategories.map(subcategory => ({
    ...subcategory,
    subcategoryKey: subcategory.subcategoryKey,
    subcategoryName: subcategory.subcategoryName,
    subcategoryParent: subcategory.subcategoryParent,
    subcategoryDescription: subcategory.subcategoryDescription || "", // optional
  })) as SubcategoryType[];

  // Collect subcategory keys
  const subcategoryKeys = typedSubcategories.map((s) => s.subcategoryKey);

  // Get listings
  const listings = await Item.aggregate([
    {
      $match: {
        subcategoryKey: { $in: subcategoryKeys },
      },
    },
    { $sort: { created_time: -1 } },
  ]) as ItemType[];

  return { category, subcategories: typedSubcategories, listings };
}
