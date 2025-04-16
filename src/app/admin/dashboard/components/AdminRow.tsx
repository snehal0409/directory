"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteAdminAction } from "../actions/deleteAdmin";
import { AdminType } from "@/types";

type AdminRowProps = {
  admin: AdminType;
  currentAdminId: string;
};

export default function AdminRow({ admin, currentAdminId }: AdminRowProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Loading state for delete operation

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete "${admin.username}"?`);
    if (!confirmed) return;

    setLoading(true); // Start loading
    const result = await deleteAdminAction(admin._id); // Call server-side action
    setLoading(false); // End loading

    if (result.success) {
      router.refresh();
    } else {
      alert(result?.error || "Failed to delete admin");
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{admin.username}</td>
      <td className="border px-4 py-2">
        {admin.createdAt ? new Date(admin.createdAt).toLocaleString() : "Unknown"}
      </td>
      <td className="border px-4 py-2 space-x-3">
        <Link href={`/admin/edit/${admin._id}`}>
          <button className="text-blue-600 hover:underline focus:outline-none">
            Edit
          </button>
        </Link>
        {admin._id !== currentAdminId && (
          <button
            onClick={handleDelete}
            disabled={loading} // Disable button while loading
            className={`text-red-600 hover:underline focus:outline-none ${loading ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        )}
      </td>
    </tr>
  );
}
