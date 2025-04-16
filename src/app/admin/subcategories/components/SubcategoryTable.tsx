'use client';

import React, { useTransition } from 'react';
import SubcategoryRow from './SubcategoryRow';

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
    <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3 text-left border-b">Subcategory Key</th>
            <th className="px-6 py-3 text-left border-b">Subcategory Name</th>
            <th className="px-6 py-3 text-left border-b">Parent Category</th>
            <th className="px-6 py-3 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {subcategories.map((subcategory) => (
            <SubcategoryRow key={subcategory._id} subcategory={subcategory} refresh={refresh} />
          ))}
        </tbody>
      </table>

      {isPending && <p className="text-sm text-gray-500 mt-2">Refreshing...</p>}
    </div>
  );
}
