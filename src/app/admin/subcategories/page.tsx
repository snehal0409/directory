import React from 'react';
import Link from 'next/link';
import SubcategoryTable from './components/SubcategoryTable';
import { getAllSubcategories } from './actions/getAllSubcategories';

export default async function SubcategoryPage() {
  const rawSubcategories = await getAllSubcategories();

  // Convert MongoDB documents to plain JS objects
  const subcategories = rawSubcategories.map((subcat: any) =>
    JSON.parse(JSON.stringify(subcat))
  );

  return (
    <div className="p-6 space-y-6">
      {/* NAVIGATION */}
      <nav className="flex space-x-6 border-b border-gray-300 pb-4 mb-4">
        <Link href="/admin/dashboard" className="text-black-600 hover:underline">Dashboard</Link>
        <Link href="/admin/categories" className="text-black-600 hover:underline">Categories</Link>
        <Link href="/admin/subcategories" className="text-black-800 font-semibold underline">Subcategories</Link>
        <Link href="/admin/profile" className="text-black-600 hover:underline">Profile</Link>
      </nav>

      {/* TITLE AND BUTTON */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Subcategories</h1>
        <Link href="/admin/subcategories/add">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            + Create New Subcategory
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="mt-6">
        <SubcategoryTable subcategories={subcategories} />
      </div>
    </div>
  );
}
