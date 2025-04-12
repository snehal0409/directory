import { getSessionAdmin } from './../../../../lib/session';
import { redirect } from 'next/navigation';
import AddSubcategoryForm from './components/AddSubcategoryForm';
import React from 'react';

export default async function AddSubcategoryPage() {
  const admin = await getSessionAdmin();
  if (!admin) redirect('/.admin/login');

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Add Subcategory</h1>
      <AddSubcategoryForm />
    </div>
  );
}
