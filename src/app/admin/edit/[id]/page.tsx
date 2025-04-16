import React from "react";
import EditAdminForm from "./components/EditAdminForm";
import { getAdminById } from "./actions";
import { AdminType } from "../../../../types";

export default async function EditAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params
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
