import { getSessionAdmin } from './../../../lib/session';
import { redirect } from 'next/navigation';
import AddAdminForm from './components/AddAdminForm';
import React from 'react';

export default async function AddAdminPage() {
  const sessionAdmin = await getSessionAdmin();
  if (!sessionAdmin) redirect('/.admin/login');

  return (
    <div className="max-w-md mx-auto mt-10">
      <AddAdminForm />
    </div>
  );
}
