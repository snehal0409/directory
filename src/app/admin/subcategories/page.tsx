import React from 'react';
import Link from 'next/link';
import SubcategoryTable from './components/SubcategoryTable';
import { getAllSubcategories } from './actions/getAllSubcategories';
import AdminNav from '../dashboard/components/AdminNav';
import LogoutButton from '../dashboard/components/logout';
import { getSessionAdmin } from '@/lib/session'; // Adjust path as needed
import { redirect } from 'next/navigation';

export default async function SubcategoryPage() {
  // Check if admin logged in
  const sessionAdmin = await getSessionAdmin();
  if (!sessionAdmin) {
    redirect('/admin/login');
  }

  const rawSubcategories = await getAllSubcategories();

  // Convert MongoDB docs to plain JS objects
  const subcategories = rawSubcategories.map((subcat: any) =>
    JSON.parse(JSON.stringify(subcat))
  );

  return (
    <div className="p-6 space-y-6">
      {/* NAVIGATION */}
      <AdminNav />

      {/* TITLE AND BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/subcategories/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Subcategory
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-6">
        <SubcategoryTable subcategories={subcategories} />
      </div>
    </div>
  );
}
