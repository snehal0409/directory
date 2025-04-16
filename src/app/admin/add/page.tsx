"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addAdminAction } from "../../admin/dashboard/actions/addAdmin"; // Server action

const AddAdmin = () => {
  const router = useRouter();
  const [adminData, setAdminData] = useState({ username: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAdminAction(adminData);
    router.push("/admin/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Add Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={adminData.username}
          onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
          placeholder="Username"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={adminData.password}
          onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
          placeholder="Password"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-between gap-4">
          <button
            type="submit"
            onClick={() => router.push("/admin/admins")}
            className="flex-1 rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
          >
            Add Admin
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/admins")}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdmin;
