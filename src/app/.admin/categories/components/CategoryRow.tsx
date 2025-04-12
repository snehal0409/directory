"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { CategoryType } from "../../../../types";
import { deleteCategory } from "../actions/deleteCategory";

export default function CategoryRow({ category }: { category: CategoryType }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete "${category.categoryName}"?`);
    if (!confirmed) return;

    const result = await deleteCategory(category._id);
    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Failed to delete category");
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{category.categoryKey}</td>
      <td className="border px-4 py-2">{category.categoryName}</td>
      <td className="border px-4 py-2 space-x-2">
        <Link href={`/.admin/categories/edit/${category._id}`}>
          <button className="text-blue-600">Edit</button>
        </Link>
        <button className="text-red-600" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}
