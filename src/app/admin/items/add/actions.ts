'use server';

      
import dbConnect from '@/lib/mongodb';

import { Subcategory, ISubcategory } from '@/models/subcategory';
import Category, { ICategory } from '@/models/category';



export async function getAllCategories() {
  await dbConnect();
  return Category.find({}).then((categories) =>
    categories.map((category: ICategory) => ({
      categoryKey: category.categoryKey,
      categoryName: category.categoryName,
    })),
  );
}

export async function getAllSubCategories() {
  await dbConnect();
  return Subcategory.find({}).then((subcategories) =>
    subcategories.map((subcategory: ISubcategory) => ({
      subcategoryKey: subcategory.subcategoryKey,
      subcategoryName: subcategory.subcategoryName,
      subcategoryParent: subcategory.subcategoryParent,
    })),
  );
}
