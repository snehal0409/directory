import { getSessionAdmin } from '../../../../../lib/session';
import { redirect } from 'next/navigation';
import EditSubcategoryForm from './components/EditSubcategoryForm';
import { Subcategory } from './../../../../../models/subcategory';
import { connectDB } from './../../../../../lib/mongodb';
import React from 'react';

export default async function EditSubcategoryPage({ params }: { params: { id: string } }) {
  const admin = await getSessionAdmin();
  if (!admin) redirect('/.admin/login');

  await connectDB();
  const subcategory = await Subcategory.findById(params.id).lean();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Subcategory</h1>
      <EditSubcategoryForm subcategory={subcategory} />
    </div>
  );
}
