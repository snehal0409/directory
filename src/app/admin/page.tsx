import React from "react";
import AdminLoginForm from "./login/components/AdminLoginForm";

export default function AdminLoginPage() {
  //check session and redirect to dashboard
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AdminLoginForm />
    </div>
  );
}