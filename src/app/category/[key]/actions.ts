"use server";

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

  // Fetch subcategories
  const subcategories = await Subcategory.find({ subcategoryParent: categoryKey }).lean();

  const typedSubcategories = subcategories.map(subcategory => ({
    ...subcategory,
    subcategoryKey: subcategory.subcategoryKey,
    subcategoryName: subcategory.subcategoryName,
    subcategoryParent: subcategory.subcategoryParent,
    subcategoryDescription: subcategory.subcategoryDescription || "",
  })) as SubcategoryType[];

  const subcategoryKeys = typedSubcategories.map((s) => s.subcategoryKey);

  // Get listings with user (createdBy.username)
  const listings = await Item.aggregate([
    {
      $match: {
        subcategoryKey: { $in: subcategoryKeys },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: 'userId',
        as: 'createdBy',
      },
    },
    {
      $unwind: {
        path: '$createdBy',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: {
        createdAt: -1, // fixed typo: was "created_time"
      },
    },
    {
      $project: {
        itemTitle: 1,
        itemDescription: 1,
        createdAt: 1,
        subcategoryKey: 1,
        createdBy: {
          _id: '$createdBy._id',
          username: '$createdBy.username',
        },
      },
    },
  ]) as ItemType[];

  return { category, subcategories: typedSubcategories, listings };
}
