"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryType } from "../../../../../../types";
import { updateCategory } from "../../../actions/updateCategory";

export default function EditCategoryForm({ category }: { category: CategoryType }) {
  const [categoryKey, setCategoryKey] = useState(category.categoryKey);
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryKey", categoryKey);
    formData.append("categoryName", categoryName);
    const result = await updateCategory(category._id, formData);
    if (result.success) {
      router.push("/.admin/categories");
    } else {
      alert(result.error || "Failed to update category");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Category Key</label>
        <input
          type="text"
          value={categoryKey}
          onChange={(e) => setCategoryKey(e.target.value)}
          className="w-full border p-2 rounded"
          required
          title="Enter the category key"
          placeholder="Category Key"
        />
      </div>
      <div>
        <label className="block">Category Name</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border p-2 rounded"
          required
          title="Enter the category name"
          placeholder="Category Name"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Category
      </button>
      <div className="my-4 border-t"></div>
      <a
    href="/.admin/categories"
    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
  >
    Cancel
  </a>
    </form>
  );
}
