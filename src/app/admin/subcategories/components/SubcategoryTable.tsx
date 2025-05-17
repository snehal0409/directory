"use client";

import React, { useTransition } from "react";
import SubcategoryRow from "./SubcategoryRow";

interface Subcategory {
  _id: string;
  subcategoryKey: string;
  subcategoryName: string;
  parentCategoryName: string;
}

interface SubcategoryTableProps {
  subcategories: Subcategory[];
}

export default function SubcategoryTable({ subcategories }: SubcategoryTableProps) {
  const [isPending, startTransition] = useTransition();

  const refresh = () => {
    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Subcategory Key</th>
            <th className="border px-4 py-2 text-left">Subcategory Name</th>
            <th className="border px-4 py-2 text-left">Parent Category</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((subcategory) => (
            <SubcategoryRow key={subcategory._id} subcategory={subcategory} refresh={refresh} />
          ))}
        </tbody>
      </table>

      {isPending && (
        <p className="text-sm text-gray-500 mt-2 px-2">Refreshing...</p>
      )}
    </div>
  );
}
