// src/app/.admin/dashboard/components/actions/deleteAdmin.ts
"use server";

import { connectDB } from "./../../../../lib/mongodb";
import Admin from "./../../../../models/admin";

// This action deletes an admin from the database by ID
export async function deleteAdminAction(adminId: string) {
  try {
    // Connect to the database
    await connectDB();

    // Ensure the admin exists before attempting to delete
    const admin = await Admin.findById(adminId);
    if (!admin) {
      throw new Error("Admin not found");
    }

    // Perform the delete operation
    await Admin.deleteOne({ _id: adminId });

    // Optionally, you can revalidate the page after deletion if using SSR or caching
    // revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error: unknown) {
    // Cast the error to an Error type to access .message
    if (error instanceof Error) {
      return { success: false, error: error.message };
    } else {
      // In case the error is not an instance of Error
      return { success: false, error: "An unknown error occurred" };
    }
  }
}
