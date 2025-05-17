"use client";

import React from "react";
import Link from "next/link";
import { deleteSubcategory } from "../actions/deleteSubcategory";

interface SubcategoryRowProps {
  subcategory: {
    _id: string;
    subcategoryKey: string;
    subcategoryName: string;
    parentCategoryName: string;
  };
  refresh: () => void;
}

export default function SubcategoryRow({ subcategory, refresh }: SubcategoryRowProps) {
  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete "${subcategory.subcategoryName}"?`);
    if (!confirmed) return;

    await deleteSubcategory(subcategory._id);

    refresh();
  };

  return (
    <tr>
      <td className="border px-4 py-2">{subcategory.subcategoryKey}</td>
      <td className="border px-4 py-2">{subcategory.subcategoryName}</td>
      <td className="border px-4 py-2">{subcategory.parentCategoryName}</td>
      <td className="border px-4 py-2 space-x-2">
        <Link href={`/admin/subcategories/edit/${subcategory._id}`}>
          <button className="text-blue-600 hover:underline">Edit</button>
        </Link>
        <button onClick={handleDelete} className="text-red-600 hover:underline">
          Delete
        </button>
      </td>
    </tr>
  );
}
