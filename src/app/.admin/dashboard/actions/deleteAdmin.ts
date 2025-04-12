// src/app/.admin/dashboard/components/actions/deleteAdmin.ts
"use server";

import { connectDB } from "./../../../../lib/mongodb";
import Admin from "./../../../../models/admin";
import { getSessionAdmin } from "./../../../../lib/session";
import { revalidatePath } from "next/cache";


export async function deleteAdminAction(id: string) {
  await connectDB();
  const sessionAdmin = await getSessionAdmin();
  if (!sessionAdmin) throw new Error("Unauthorized");

  if (sessionAdmin._id.toString() === id) {
    throw new Error("You cannot delete yourself.");
  }

  await Admin.findByIdAndDelete(id);
  revalidatePath("/.admin/dashboard");
}
// Example implementation of deleteAdmin function
export async function deleteAdmin(adminId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`/api/admins/${adminId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete admin");
      }
  
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }