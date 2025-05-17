"use client";

import React, { useTransition } from "react";
import { UserType } from "@/types";
import UserRow from "./UserRow";

interface UserTableProps {
  users: UserType[];
}

export default function UserTable({ users }: UserTableProps) {
  const [isPending, startTransition] = useTransition();

  const refresh = () => {
    startTransition(() => {
      window.location.reload();
    });
  };

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Username</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={3} className="border px-4 py-2 text-center">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow key={user._id} user={user} refresh={refresh} />
            ))
          )}
        </tbody>
      </table>

      {isPending && (
        <p className="text-sm text-gray-500 mt-2 px-2">Refreshing...</p>
      )}
    </div>
  );
}
