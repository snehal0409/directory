import Link from "next/link";
import React from "react";
import LogoutButton from "./components/logout";
import { redirect } from "next/navigation";
import { getSessionAdmin } from "@/lib/session";

export default async function AdminDashboardPage() {
  // Check if the admin is logged in
  const admin = await getSessionAdmin();

  // If no admin session exists, redirect to login page
  if (!admin) redirect("/admin/login");

  return (
     <><header className="flex justify-end gap-4 p-4 sm:p-6">
      {admin ? (
        <>
          <Link
            href="/"
            className="inline-block px-5 py-2 rounded-full backdrop-blur-sm bg-blue-300 text-black font-bold shadow-md hover:bg-blue-400 hover:scale-105 transition duration-300"
          >
            Home
          </Link>
            <LogoutButton />
        </>
        
      ) : null}
    </header>
    <main className="p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          
        </div>

        {/* Dashboard Navigation */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <Link
            href="/admin/dashboard"
            className="block bg-white p-4 rounded-xl shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">Dashboard Home</h2>
            <p className="text-sm text-gray-500">Overview of admin features</p>
          </Link>

          {/* Manage Admins Link */}
          <Link
            href="/admin/admins"
            className="block bg-white p-4 rounded-xl shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">Manage Admins</h2>
            <p className="text-sm text-gray-500">View, edit, and delete admin accounts</p>
          </Link>

          {/* Manage Categories Link */}
          <Link
            href="/admin/categories"
            className="block bg-white p-4 rounded-xl shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">Manage Categories</h2>
            <p className="text-sm text-gray-500">Add, edit, and delete categories</p>
          </Link>

          {/* Manage Subcategories Link */}
          <Link
            href="/admin/subcategories"
            className="block bg-white p-4 rounded-xl shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">Manage Subcategories</h2>
            <p className="text-sm text-gray-500">Organize subcategories by category</p>
          </Link>

         
          {/* Admin Items Link */}
          <Link
            href="/admin/items"
            className="block bg-white p-4 rounded-xl shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">Manage Items</h2>
            <p className="text-sm text-gray-500">Edit your admin account</p>
          </Link>
          {/* Manage Users Link */}
          <Link
            href="/admin/users"
            className="block bg-white p-4 rounded-xl shadow hover:bg-gray-50"
          >
            <h2 className="text-xl font-semibold">Manage Users</h2>
            <p className="text-sm text-gray-500">View, edit, and delete user accounts</p>
          </Link>
        </div>
      </main></>
  );
}
