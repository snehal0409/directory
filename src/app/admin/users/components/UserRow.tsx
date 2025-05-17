"use client";

import React from "react";
import Link from "next/link";
import { deleteUser } from "../actions/deleteUser";
import { UserType } from "@/types";

interface UserRowProps {
  user: UserType;
  refresh: () => void;
}

export default function UserRow({ user, refresh }: UserRowProps) {
  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete "${user.username}"?`);
    if (!confirmed) return;

    await deleteUser(user._id);
    refresh();
  };

  return (
    <tr>
      <td className="border px-4 py-2">{user.username}</td>
      <td className="border px-4 py-2">{user.email}</td>
      <td className="border px-4 py-2 space-x-2">
        <Link href={`/admin/users/edit/${user._id}`}>
          <button className="text-blue-600 hover:underline">Edit</button>
        </Link>
        <button onClick={handleDelete} className="text-red-600 hover:underline">
          Delete
        </button>
      </td>
    </tr>
  );
}
