"use client";

import React, { useState } from "react";
import { addCategory } from "../../actions/addCategory";
import { useRouter } from "next/navigation";

export default function AddCategoryForm() {
  const router = useRouter();
  const [categoryKey, setCategoryKey] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryKey", categoryKey);
    formData.append("categoryName", categoryName);
    const result = await addCategory(formData);
    if (result.success) {
      router.push("/admin/categories");
    } else {
      alert(result.error || "Failed to add category");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Category Key
        <input
          type="text"
          name="categoryKey"
          value={categoryKey}
          onChange={(e) => setCategoryKey(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="Enter category key"
          required
        />
        </label>
      </div>
      <div>
        <label className="block">Category Name
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full border p-2 rounded"
          title="Category Name"
          placeholder="Enter category name"
          required
        />
        </label>
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Add Category
      </button>
      <div className="my-4 border-t"></div>
      <p className="text-sm text-gray-500 mb-2">Or</p>
      <a
      href="/admin/categories"
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      Cancel
    </a>
    </form>
  );
}
