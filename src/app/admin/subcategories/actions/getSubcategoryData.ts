// src/app/subcategory/actions/getSubcategoryData.ts
import { connectDB } from "@/lib/mongodb";
import { Subcategory} from "@/models/subcategory";
import Listing from "@/models/item";
import type { SubcategoryType, ItemType } from "@/types";

export async function getSubcategoryData(subcategoryKey: string): Promise<{ subcategory: SubcategoryType, listings: ItemType[] }> {
  await connectDB();

  // Fetch subcategory info
  const subcategory = await Subcategory.findOne({ subcategoryKey });

  // Fetch listings for this subcategory
  const listings = await Listing.find({ subcategoryParent: subcategoryKey }).sort({ created_time: -1 });

  return { subcategory, listings };
}
