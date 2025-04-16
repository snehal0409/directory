import type { Metadata } from "next";
import "@/app/globals.css"; // ✅ fixed path
import React from "react";

export const metadata: Metadata = {
  title: "Admin Panel",
};

// GOOD: in src/app/.admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }