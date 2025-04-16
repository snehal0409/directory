import { connectDB } from '../../../../lib/mongodb';
import { Subcategory } from '../../../../models/subcategory';
import { Types } from 'mongoose';

export async function getSubcategoryById(id: string) {
  try {
    await connectDB();

    // Aggregation pipeline to join Subcategory and Category collections
    const subcategory = await Subcategory.aggregate([
      { $match: { _id: new Types.ObjectId(id) } }, // Match subcategory by id
      {
        $lookup: {
          from: 'categories', // Join with categories collection
          localField: 'subcategoryParent', // Field in Subcategory
          foreignField: '_id', // Field in Category
          as: 'parentCategory', // Alias for the matched documents
        },
      },
      {
        $unwind: {
          path: '$parentCategory', // Unwind the parentCategory array (single item)
          preserveNullAndEmptyArrays: true, // Allow null if no category is found
        },
      },
      {
        $project: {
          subcategoryKey: 1,
          subcategoryName: 1,
          subcategoryParent: 1,
          'parentCategory.categoryName': 1, // Extract category name from the joined category
        },
      },
    ]);

    return subcategory[0]; // Return the first result (subcategory)
  } catch (error) {
    console.error('Failed to get subcategory by ID:', error);
    throw new Error('Error fetching subcategory');
  }
}
