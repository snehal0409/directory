import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css"; // ✅ fixed path
import React from "react";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

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