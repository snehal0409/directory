// src/app/.admin/categories/add/page.tsx
import React from "react";
import AddCategoryForm from "./components/AddCategoryForm";
import { getSessionAdmin } from "../../../../lib/session";
import { redirect } from "next/navigation";

export default async function AddCategoryPage() {
  const session = await getSessionAdmin();
  if (!session) redirect("/.admin/login");

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
      <AddCategoryForm />
    </div>
  );
}
