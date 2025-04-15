import React from "react";
import SubcategoryForm from "../../components/SubcategoryForm";
import { getSubcategoryById, getAllCategories } from "../../actions";
import { Types } from "mongoose";

interface ISubcategory {
  _id: Types.ObjectId;
  subcategoryKey: string;
  subcategoryName: string;
  subcategoryParent: Types.ObjectId;
}

interface EditSubcategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditSubcategoryPage({ params }: EditSubcategoryPageProps) {
  const subcategory: ISubcategory | null = await getSubcategoryById(params.id);
  const categories = await getAllCategories(); // ✅ Fetch categories here

  if (!subcategory) {
    return <div className="p-4 text-red-600">Subcategory not found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Subcategory</h1>
      <SubcategoryForm
        initialData={{
          _id: subcategory._id.toString(),
          subcategoryKey: subcategory.subcategoryKey,
          subcategoryName: subcategory.subcategoryName,
          subcategoryParent: subcategory.subcategoryParent.toString(),
        }}
        categories={categories} // ✅ Pass categories to the form
      />
    </div>
  );
}
