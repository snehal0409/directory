// src/app/.admin/edit/[id]/components/EditAdminForm.tsx
"use client";

import { AdminType } from "./../../../../../types";
import { updateAdmin } from "./../actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

export default function EditAdminForm({ admin }: { admin: AdminType }) {
  const [username, setUsername] = useState(admin.username);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateAdmin({
      id: admin._id,
      username,
      password: password || undefined, // allow unchanged password
    });

    if (result.success) {
      router.push("/.admin/dashboard");
    } else {
      alert(result.error || "Failed to update admin");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold mb-4">Edit Admin</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full border px-4 py-2 rounded"
      />
      <input
        type="password"
        placeholder="New Password (leave empty to keep current)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-4 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Admin
      </button>

      <a
      href="/.admin/admins"
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      Cancel
    </a>
      
      
    </form>
  );
}
