'use server'

import Admin from "@/models/admin";
import { connectDB } from "@/lib/mongodb";
import { AdminType } from "@/types";

export async function getAllAdmins(): Promise<AdminType[]> {
  await connectDB();
  const admins = await Admin.find({}).lean();
  return admins.map((admin: any) => ({
    _id: admin._id.toString(),
      username: admin.username,
      password: admin.password, // Add this explicitly
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    }));
  }
