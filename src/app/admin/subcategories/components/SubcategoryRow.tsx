'use client';

import React from 'react';
import Link from 'next/link';
import { deleteSubcategory } from '../actions/deleteSubcategory';

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
    const confirmed = confirm('Are you sure you want to delete this subcategory?');
    if (confirmed) {
      await deleteSubcategory(subcategory._id);
      refresh();
    }
  };

  return (
    <tr className="border-b border-black-200 hover:bg-black-50">
      <td className="px-4 py-2">{subcategory.subcategoryKey}</td>
      <td className="px-4 py-2">{subcategory.subcategoryName}</td>
      <td className="px-4 py-2">{subcategory.parentCategoryName}</td>
      <td className="px-4 py-2 space-x-2">
        
        <Link href={`/admin/subcategories/edit/${subcategory._id}`}>
          <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-yellow-600 transition">
            Edit
          </button>
        </Link>
        <button
          onClick={handleDelete}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
