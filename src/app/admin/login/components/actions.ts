"use server";

import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import Admin from "./../../../../models/admin";
import { connectDB } from "./../../../../lib/mongodb";
import { createAdminToken } from "./../../../../lib/session";

export async function loginAdmin(data: { username: string; password: string }) {
  const { username, password } = data;
  await connectDB();

  const admin = await Admin.findOne({ username });
  if (!admin) return { error: "Invalid credentials." };

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return { error: "Invalid credentials." };

  const token = createAdminToken(admin._id.toString());
  (await cookies()).set("admin_token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true };
}
