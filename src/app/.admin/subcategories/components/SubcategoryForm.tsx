"use client";
import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrUpdateSubcategory } from "../actions";

interface Props {
  initialData?: {
    _id: string;
    subcategoryKey: string;
    subcategoryName: string;
    subcategoryParent: string;
  };
  categories: {
    _id: string;
    categoryName: string;
    categoryKey: string;
  }[];
}

export default function SubcategoryForm({ initialData, categories }: Props) {
  const router = useRouter();

  const [subcategoryKey, setSubcategoryKey] = useState(initialData?.subcategoryKey || "");
  const [subcategoryName, setSubcategoryName] = useState(initialData?.subcategoryName || "");
  const [subcategoryParent, setSubcategoryParent] = useState(initialData?.subcategoryParent || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Check if required fields are filled
    if (!subcategoryKey || !subcategoryName || !subcategoryParent) {
      alert("All fields are required.");
      return;
    }

    await createOrUpdateSubcategory({
      id: initialData?._id,
      subcategoryKey,
      subcategoryName,
      subcategoryParent,
    });

    router.push("/.admin/subcategories");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="subcategoryKey" className="block font-medium">
          Subcategory Key
        </label>
        <input
          id="subcategoryKey"
          type="text"
          value={subcategoryKey}
          onChange={(e) => setSubcategoryKey(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="subcategoryName" className="block font-medium">
          Subcategory Name
        </label>
        <input
          id="subcategoryName"
          type="text"
          value={subcategoryName}
          onChange={(e) => setSubcategoryName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label htmlFor="subcategoryParent" className="block font-medium">
          Parent Category
        </label>
        <select
          id="subcategoryParent"
          value={subcategoryParent}
          onChange={(e) => setSubcategoryParent(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.categoryKey}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {initialData ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/.admin/subcategories")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
