import React from "react";
import EditAdminForm from "./components/EditAdminForm";
import { getAdminById } from "./actions";
import { AdminType } from "../../../../types";
import { redirect } from "next/navigation";
import { getSessionAdmin } from "@/lib/session"; // Adjust the path as per your project

export default async function EditAdminPage({ params }: { params: { id: string } }) {
 
  const sessionAdmin = await getSessionAdmin();
  if (!sessionAdmin) {
    
    redirect("/admin/login");
  }

  const { id } = params;
  const admin: AdminType | null = await getAdminById(id);

  if (!admin) {
    return <div className="p-4 text-red-600">Admin not found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <EditAdminForm admin={admin} />
    </div>
  );
}
