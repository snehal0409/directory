
"use client"

import React from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    // Your logout logic here, such as clearing cookies or session
    // For example, you could remove cookies or make a logout request to an API if needed.
    console.log("Admin logged out");
    // Redirecting to login page after logout
    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
