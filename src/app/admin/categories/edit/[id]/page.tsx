// src/app/.admin/categories/edit/[id]/page.tsx
import React from "react";
import { getSessionAdmin } from "../../../../../lib/session";
import { redirect } from "next/navigation";
import EditCategoryForm from "../[id]/components/EditCategoryForm";
import { getCategoryById } from "./actions";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSessionAdmin();
  if (!session) redirect("/admin/login");

  const {id} = await params

  const category = await getCategoryById(id);
  if (!category) {
    redirect("/admin/categories");
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <EditCategoryForm category={category} />
    </div>
  );
}
