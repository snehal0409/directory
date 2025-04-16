// src/app/.admin/categories/components/CategoryTable.tsx
"use client";

import React from "react";
import { CategoryType } from "../../../../types";
import CategoryRow from "./CategoryRow";

export default function CategoryTable({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <table className="min-w-full border border-black">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Category Key</th>
          <th className="border px-4 py-2">Category Name</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <CategoryRow key={category._id} category={category} />
        ))}
      </tbody>
    </table>
  );
}
