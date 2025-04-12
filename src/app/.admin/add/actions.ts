"use server";

import bcrypt from "bcryptjs";
import { connectDB } from "./../../../lib/mongodb";
import Admin from "./../../../models/admin";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Handle adding the very first admin (only if none exists)
export async function addFirstAdmin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    await connectDB();

    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return { success: false, error: "An admin already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ username, password: hashedPassword });

    revalidatePath("/.admin/dashboard");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to add admin",
    };
  }
}
export async function addAdmin({ username, password }: { username: string; password: string }) {
  await connectDB();
  const existing = await Admin.findOne({ username });
  if (existing) throw new Error('Admin with this username already exists.');

  const hashed = await bcrypt.hash(password, 10);
  const newAdmin = new Admin({ username, password: hashed });
  await newAdmin.save();
}

// (Optional) used for form with name/email/password
export async function addAdminAction(formData: FormData) {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!name || !email || !password) {
    throw new Error("Missing required fields");
  }

  await connectDB();

  const existing = await Admin.findOne({ email });
  if (existing) {
    throw new Error("Admin with this email already exists");
  }

  const hashed = await bcrypt.hash(password, 10);
  await Admin.create({ name, email, password: hashed });

  revalidatePath("/.admin/dashboard");
  redirect("/.admin/dashboard");
}
// Ensure getAdminById is defined and exported
export async function getAdminById(id: string) {
  // Implementation of the function
  return { id, name: "Admin Name" }; // Example return value
}