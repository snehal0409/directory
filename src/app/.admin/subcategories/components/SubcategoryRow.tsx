'use client';
import Link from 'next/link';
import { SubcategoryType } from '../../../../types';
import { deleteSubcategory } from './../actions/deleteSubcategory';
import React from 'react';

export default function SubcategoryRow({ subcategory }: { subcategory: SubcategoryType }) {
  const handleDelete = async () => {
    await deleteSubcategory(subcategory._id!);
    window.location.reload();
  };

  return (
    <tr>
      <td>{subcategory.subcategoryKey}</td>

      <td>{subcategory.subcategoryName}</td>
      
      <td>{subcategory.subcategoryParent}</td>
      <td>
        <Link href={`/.admin/subcategories/edit/${subcategory._id}`} className="btn-small">Edit</Link>
        <button onClick={handleDelete} className="btn-small btn-danger">Delete</button>
      </td>
    </tr>
  );
}
