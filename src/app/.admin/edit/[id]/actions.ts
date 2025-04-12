// src/app/.admin/edit/[id]/components/actions.ts
"use server";

import { connectDB } from "./../../../../lib/mongodb";
import Admin from "./../../../../models/admin";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateAdminAction(id: string, formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!name || !email) throw new Error("Missing fields");

  await connectDB();

  const updateData: any = { name, email };
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  await Admin.findByIdAndUpdate(id, updateData);
  revalidatePath("/.admin/dashboard");
  redirect("/.admin/dashboard");
}
// Export the updateAdmin function
export async function updateAdmin({ id, username, password }: { id: string; username: string; password?: string }) {
  try {
    const response = await fetch(`/api/admins/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to update admin");
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
// Existing code in actions.ts

export async function getAdminById(id: string) {
  // Replace this with the actual implementation
  return {
    _id: id,
    username: "admin",
    password: "password123",
    createdAt: new Date().toISOString(),
  };
}