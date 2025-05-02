

import { redirect } from "next/navigation";
import { getSessionAdmin } from "@/lib/session";
import LoginForm from "./components/AdminLoginForm";

export default async function LoginPage() {
  const admin = await getSessionAdmin();
  
  
  // If admin is logged in, redirect to dashboard
  if (admin) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
      <LoginForm />
    </div>
  );
}
