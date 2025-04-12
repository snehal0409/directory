// src/app/.admin/subcategories/page.tsx
import { getSessionAdmin } from '../../../lib/session';
import { redirect } from 'next/navigation';
import SubcategoryTable from './components/SubcategoryTable';
import { getAllSubcategories } from './actions/getAllSubcategories';
import React from 'react';
import Link from 'next/link';

export default async function SubcategoriesPage() {
  const admin = await getSessionAdmin();
  if (!admin) redirect('/.admin/login');

  const subcategories = await getAllSubcategories();

  return (
    <div className="space-y-4">
         <nav className="flex gap-4 mb-6 border-b pb-3 text-sm font-medium">
        <Link href="/.admin/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
        <Link href="/.admin/admins" className="text-blue-600 hover:underline">Admins</Link>
        <Link href="/.admin/categories" className="text-blue-600 hover:underline">Categories</Link>
        <Link href="/.admin/subcategories" className="text-blue-600 hover:underline">Subcategories</Link>
        <Link href="/.admin/profile" className="text-blue-600 hover:underline">Profile</Link>
        <Link href="/.admin/login?logout=true" className="text-red-600 hover:underline ml-auto">Logout</Link>
      </nav>
        
      <h1 className="text-xl font-bold">Manage Subcategories</h1>
      <SubcategoryTable subcategories={subcategories} />
    </div>
  );
}
