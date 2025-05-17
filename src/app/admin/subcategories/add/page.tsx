import AddSubcategoryForm from '../components/AddSubcategoryForm';
import { getAllCategories } from '../../categories/actions/getAllCategories';
import React from 'react';
import { getSessionAdmin } from '@/lib/session';  // Adjust path as needed
import { redirect } from 'next/navigation';

export default async function AddSubcategoryPage() {
  const sessionAdmin = await getSessionAdmin();
  if (!sessionAdmin) {
    redirect('/admin/login');
  }

  const categories = await getAllCategories();

  const updatedCategories = categories.map((category) => ({
    ...category,
    categoryName: category.categoryName.charAt(0).toUpperCase() + category.categoryName.slice(1), // Capitalize first letter
  }));

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Add New Subcategory</h1>
      <AddSubcategoryForm categories={updatedCategories} />
    </div>
  );
}
