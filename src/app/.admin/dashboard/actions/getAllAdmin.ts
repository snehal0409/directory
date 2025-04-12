"use server";

import { connectDB } from "././../../../../lib/mongodb";
import Admin from "./../../../../models/admin";

export async function getAllAdmins() {
    await connectDB();
  
    const admins = await Admin.find().lean() as unknown as Array<{ _id: unknown, username: string, password: string, createdAt: Date, updatedAt: Date }>;
  
    return admins.map(admin => ({
      _id: String(admin._id),
      username: admin.username,
      password: admin.password, // Add this explicitly
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    }));
  }
