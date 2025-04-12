'use client';
import Link from 'next/link';
import SubcategoryRow from './SubcategoryRow';
import { SubcategoryType } from './../../../../types';
import React from 'react';

export default function SubcategoryTable({ subcategories }: { subcategories: SubcategoryType[] }) {
  return (
    <div>
      <Link href="/.admin/subcategories/add" className="btn-primary mb-4 inline-block">Add Subcategory</Link>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Key</th>
            <th>Name</th>
            <th>Parent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map(sub => (
            <SubcategoryRow key={sub._id} subcategory={sub} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
