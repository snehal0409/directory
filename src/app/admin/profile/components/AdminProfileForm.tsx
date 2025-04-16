"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateAdmin } from "../actions";
import { AdminType } from "./../../../../types/index";
import React from "react";

export default function AdminProfileForm({ admin }: { admin: AdminType }) {
  const [username, setUsername] = useState(admin.username);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await updateAdmin(admin._id, { username, password });
    if (!result?.success) {
      setError("An error occurred while updating the profile.");
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <h2 className="text-xl font-bold">Edit Profile</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        placeholder="New Password (optional)"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Save Profile
      </button>
    </form>
  );
}
