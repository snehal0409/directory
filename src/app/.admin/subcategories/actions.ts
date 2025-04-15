'use server'
import { Document, Types } from "mongoose";
import Subcategory from "../../../models/subcategory";
import Category from "../../../models/category";
import mongoose from "mongoose";
import { connectDB } from "../../../lib/mongodb";
import { redirect } from "next/navigation";

// Define the interface for category
interface CategoryType {
  _id: Types.ObjectId;
  categoryName: string;
}

// Define the interface for subcategory aggregation result
interface SubcategoryAggregationResult {
  subcategoryKey: string;
  subcategoryName: string;
  categoryName: string;
  subcategoryParent: string;
  category: CategoryType; // Added CategoryType to category
}

// Get all subcategories and join with categories
export const getAllSubcategories = async () => {
  await connectDB(); // Ensure DB is connected before querying
  try {
    const subcategories: SubcategoryAggregationResult[] = await Subcategory.aggregate([
      {
        $lookup: {
          from: "categories", // Category collection name
          localField: "subcategoryParent",
          foreignField: "_id",
          as: "category", // Will contain the category data
        },
      },
      {
        $unwind: "$category", // Flatten the array, as $lookup creates an array
      },
      {
        $project: {
          subcategoryKey: 1,
          subcategoryName: 1,
          categoryName: "$category.categoryName", // Include category name in the result
          subcategoryParent: 1, // Pass subcategoryParent as is
        },
      },
    ]);

    // Ensure categories are returned as plain objects
    return subcategories.map((subcategory) => ({
      subcategoryKey: subcategory.subcategoryKey,
      subcategoryName: subcategory.subcategoryName,
      categoryName: subcategory.categoryName,
      subcategoryParent: subcategory.subcategoryParent.toString(), // Convert ObjectId to string
    }));
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return []; // Return an empty array in case of an error
  }
};

// Create or update subcategory
export const createOrUpdateSubcategory = async (data: {
  id?: string;
  subcategoryKey: string;
  subcategoryName: string;
  subcategoryParent: string; // category _id
}) => {
  await connectDB(); // Ensure DB is connected before performing operations

  try {
    if (data.id) {
      // Update existing subcategory
      const updatedSubcategory = await Subcategory.findByIdAndUpdate(
        data.id,
        {
          subcategoryKey: data.subcategoryKey,
          subcategoryName: data.subcategoryName,
          subcategoryParent: data.subcategoryParent,
        },
        { new: true } // Return the updated document
      );
      return updatedSubcategory;
    } else {
      // Create new subcategory
      const newSubcategory = await Subcategory.create({
        subcategoryKey: data.subcategoryKey,
        subcategoryName: data.subcategoryName,
        subcategoryParent: data.subcategoryParent,
      });
      return newSubcategory;
    }
  } catch (error) {
    console.error("Error creating or updating subcategory:", error);
    throw new Error("Error creating or updating subcategory");
  }
};

// Get subcategory by ID
export const getSubcategoryById = async (id: string) => {
  await connectDB(); // Ensure DB is connected before performing operations
  try {
    const subcategory = await Subcategory.findById(id);
    if (!subcategory) {
      console.error(`Subcategory with id ${id} not found`);
      return null; // Return null if not found
    }
    return subcategory;
  } catch (error) {
    console.error("Error fetching subcategory by ID:", error);
    return null; // Return null in case of an error
  }
};

// Delete subcategory
export const deleteSubcategory = async (id: string) => {
  await connectDB(); // Ensure DB is connected before performing operations
  try {
    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);
    if (!deletedSubcategory) {
      console.error(`Subcategory with id ${id} not found for deletion`);
      throw new Error("Subcategory not found");
    }
    return deletedSubcategory;
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    throw new Error("Error deleting subcategory");
  }
};

// Fetch all categories
export async function getAllCategories() {
    await connectDB();
  
    const categories = await Category.find().lean<Array<{ _id: unknown; categoryKey: string; categoryName: string }>>();
    return categories.map((cat: { _id: unknown; categoryKey: string; categoryName: string }) => ({
      _id: String(cat._id),
      categoryKey: cat.categoryKey,
      categoryName: cat.categoryName,
    }));
  }

// Delete subcategory action with redirection
export const deleteSubcategoryAction = async (id: string) => {
  await connectDB(); // Ensure DB is connected before performing operations
  try {
    const deletedSubcategory = await Subcategory.findByIdAndDelete(id);
    if (!deletedSubcategory) {
      console.error(`Subcategory with id ${id} not found for deletion`);
      throw new Error("Subcategory not found for deletion");
    }
    // Redirect after successful deletion (assuming you're using Next.js App Router)
    redirect("/.admin/subcategories");
  } catch (error) {
    console.error("Error during subcategory deletion:", error);
    throw new Error("Error during subcategory deletion");
  }
};
export async function addSubcategory(formData: FormData) {
    const subcategoryKey = formData.get('subcategoryKey') as string;
    const subcategoryName = formData.get('subcategoryName') as string;
    const subcategoryParent = formData.get('subcategoryParent') as string;
  
    await connectDB();
  
    await Subcategory.create({
      subcategoryKey,
      subcategoryName,
      subcategoryParent,
    });
  
    redirect('/.admin/subcategories');
  }
  