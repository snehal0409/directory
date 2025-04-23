import { ItemType } from "@/types";
import Item from "@/models/item";

export const getItemsForSubcategory = async (subCategoryKey: string): Promise<ItemType[]> => {
  const items = await Item.aggregate([
    { $match: { subcategoryKey: subCategoryKey } },
    {
      $project: {
        _id: 1,
        itemTitle: 1,
        itemDescription: 1,
        subcategoryKey: 1,
        categoryKey: 1,
        created_time: 1,
      },
    },
    { $sort: { created_time: -1 } },
  ]) as ItemType[];

  return items;
};
