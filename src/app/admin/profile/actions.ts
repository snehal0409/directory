"use server";

import { connectDB } from "./../../../lib/mongodb";
import Admin from "../../../models/admin";
import bcrypt from "bcryptjs";

export async function getAdminById(id: string) {
  await connectDB();
  const admin = await Admin.findById(id, { password: 0 }).lean() as { _id: string; username: string } | null;
  if (!admin) return null;
  return {
    _id: admin._id.toString(),
    username: admin.username,
  };
}

export async function updateAdmin(id: string, data: { username: string; password?: string }) {
  await connectDB();

  const update: any = { username: data.username };
  if (data.password && data.password.trim() !== "") {
    update.password = await bcrypt.hash(data.password, 10);
  }

  await Admin.findByIdAndUpdate(id, update);
  return { success: true };
}
