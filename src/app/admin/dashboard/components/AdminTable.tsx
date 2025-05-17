

import React from "react";
import AdminRow from "./AdminRow";
import { AdminType } from "./../../../../types";

export default function AdminTable({
  admins,
  currentAdminId,
}: {
  admins: AdminType[];
  currentAdminId: string;
}) {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th className="border px-4 py-2 bg-gray-100 text-left">Username</th>
          <th className="border px-4 py-2 bg-gray-100 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {admins.map((admin) => (
          <AdminRow
            key={admin._id}
            admin={admin}
            currentAdminId={currentAdminId}
          />
        ))}
      </tbody>
    </table>
  );
}
