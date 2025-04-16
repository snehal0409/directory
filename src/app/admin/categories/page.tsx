import { getSessionAdmin } from "./../../../lib/session";
import { redirect } from "next/navigation";
import { getAllCategories } from "./actions/getAllCategories";
import CategoryTable from "./components/CategoryTable";
import Link from "next/link";
import LogoutButton from "../dashboard/components/logout";
import React from "react";
import AdminNav from '../dashboard/components/AdminNav';

export default async function CategoryPage() {
  const session = await getSessionAdmin();
  if (!session) redirect("/admin/login");

  const categories = await getAllCategories();

  return (
    <div className="p-6">
      <AdminNav /> {/* Added AdminNav component */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <div className="space-x-2">
          <Link
            href="/admin/categories/add"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Category
          </Link>
          <LogoutButton />
        </div>
      </div>
      <CategoryTable categories={categories} />
    </div>
  );
}
