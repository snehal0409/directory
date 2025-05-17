// src/app/admin/dashboard/page.tsx
import { getSessionAdmin } from "./../../../lib/session";
import { redirect } from "next/navigation";
import { getAllAdmins } from "./../dashboard/actions/getAllAdmin";
import AdminTable from "./../dashboard/components/AdminTable";
import LogoutButton from "./../dashboard/components/logout";
import React from "react";
import AdminNav from '../dashboard/components/AdminNav';


export default async function AdminDashboardPage() {
 const admin = await getSessionAdmin();


  if (!admin) redirect("/admin/login");


  const admins = (await getAllAdmins()).map((admin) => ({
    _id: admin._id.toString(),
    username: admin.username,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
    // Do not include password here
  }));

  return (
   <div className="p-6">
  <AdminNav /> {/* Added AdminNav component */}

  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-semibold">Manage Admins</h2>
    <div className="flex gap-2">
      <a
        href="/admin/add"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Add Admin
      </a>
      <LogoutButton />
    </div>
  </div>
  <AdminTable admins={admins} currentAdminId={admin?._id || ""} />
</div>

  );
}