import React from "react";
import SubcategoryForm from "../components/SubcategoryForm"; // Adjust path if needed
import { getAllCategories } from "../actions";
import connectDB from '../../../../lib/mongodb';


export default async function AddSubcategoryPage() {
    await connectDB();
  // Fetch categories server-side
  const categories = await getAllCategories();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Subcategory</h1>
      {/* Pass the plain categories to SubcategoryForm */}
      <SubcategoryForm categories={categories} />
    </div>
  );
}
