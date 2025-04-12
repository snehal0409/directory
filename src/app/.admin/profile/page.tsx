import AdminProfileForm from "./components/AdminProfileForm";
import { getSessionAdmin } from "./../../../lib/session";
import { getAdminById } from "../add/actions";
import React from "react";
import { AdminType } from "../../../types";

export default async function AdminProfilePage() {
  const session = await getSessionAdmin();
  if (!session) return null;

  const admin = await getAdminById(session.id) as unknown as AdminType;
  if (!admin) return <div className="p-4 text-red-600">Admin not found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AdminProfileForm admin={admin} />
    </div>
  );
}
