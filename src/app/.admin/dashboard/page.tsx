// src/app/.admin/dashboard/page.tsx
import { getSessionAdmin } from '../../../lib/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from './components/logout';
import React from 'react';
import AdminNav from '../dashboard/components/AdminNav';

// inside your component return:
<>
  <AdminNav />
  {/* rest of the content */}
</>


export default async function AdminDashboardPage() {
  const session = await getSessionAdmin();
  if (!session) redirect('/.admin/login');

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <LogoutButton />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Link
          href="/.admin/dashboard"
          className="block bg-white p-4 rounded-xl shadow hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">Dashboard Home</h2>
          <p className="text-sm text-gray-500">Overview of admin features</p>
        </Link>
        <Link
          href="/.admin/admins"
          className="block bg-white p-4 rounded-xl shadow hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">Manage Admins</h2>
          <p className="text-sm text-gray-500">View, edit, and delete admin accounts</p>
        </Link>
        <Link
          href="/.admin/categories"
          className="block bg-white p-4 rounded-xl shadow hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">Manage Categories</h2>
          <p className="text-sm text-gray-500">Add, edit, and delete categories</p>
        </Link>
        <Link
          href="/.admin/subcategories"
          className="block bg-white p-4 rounded-xl shadow hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">Manage Subcategories</h2>
          <p className="text-sm text-gray-500">Organize subcategories by category</p>
        </Link>
        <Link
          href="/.admin/profile"
          className="block bg-white p-4 rounded-xl shadow hover:bg-gray-50"
        >
          <h2 className="text-xl font-semibold">My Profile</h2>
          <p className="text-sm text-gray-500">Edit your admin account</p>
        </Link>
      </div>
    </main>
  );
}
