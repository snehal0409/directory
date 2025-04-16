import { connectDB } from '../../../../lib/mongodb';
import Category from '../../../../models/category';

export const getAllCategories = async () => {
  await connectDB();

  const categories = await Category.aggregate([
    {
      $project: {
        _id: 1,
        categoryKey: 1,
        categoryName: {
          $concat: [
            { $toUpper: { $substrCP: ["$categoryName", 0, 1] } },
            { $substrCP: ["$categoryName", 1, { $strLenCP: "$categoryName" }] }
          ]
        }
      }
    }
  ]);

  return categories;
};
