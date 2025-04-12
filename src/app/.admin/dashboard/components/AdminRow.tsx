"use client";

import { AdminType } from "./../../../../types/index";
import Link from "next/link";
import { deleteAdmin } from "./../../dashboard/actions/deleteAdmin";
import { useRouter } from "next/navigation";
import React from "react";

export default function AdminRow({
  admin,
  currentAdminId,
}: {
  admin: AdminType;
  currentAdminId: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete "${admin.username}"?`);
    if (!confirmed) return;

    const result = await deleteAdmin(admin._id);

    if (result.success) {
      router.refresh(); // Reload admin list
    } else {
      alert(result?.error || "Failed to delete admin");
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{admin.username}</td>

      <td className="border px-4 py-2">
        {/* ✅ Safely handle optional createdAt */}
        {admin.createdAt
          ? new Date(admin.createdAt).toLocaleString()
          : "Unknown"}
      </td>

      <td className="border px-4 py-2 space-x-2">
        <Link href={`/.admin/edit/${admin._id}`}>
          <button className="text-blue-600">Edit</button>
        </Link>
        {admin._id !== currentAdminId && (
          <button className="text-red-600" onClick={handleDelete}>
            Delete
          </button>
        )}
      </td>
    </tr>
  );
}