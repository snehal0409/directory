import { connectDB } from '../../../../lib/mongodb';
import { Subcategory } from '../../../../models/subcategory';

export const getAllSubcategories = async () => {
  await connectDB();
  return await Subcategory.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'subcategoryParent',
        foreignField: 'categoryKey',
        as: 'parentCategory',
      },
    },
    { $unwind: '$parentCategory' },
    {
      $project: {
        _id: 1,
        subcategoryKey: 1,
        subcategoryName: 1,
        subcategoryParent: 1,
        parentCategoryName: '$parentCategory.categoryName',
      },
    },
  ]);
};
