// src/lib/session.ts

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Admin from '@/models/admin'; 
import { connectDB } from '@/lib/mongodb';
import User from '@/models/user'; // Ensure you're importing the User model correctly

// Function to get the session for the logged-in admin
export async function getSessionAdmin() {
  await connectDB();

  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const admin = await Admin.findById(decoded.id);
    return admin;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Function to create a JWT token for the admin
export function createAdminToken(adminId: string) {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  return token;
}

const ADMIN_COOKIE_NAME = 'admin_token';

// Function to log out the admin by deleting the token
export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

// Function to get the session for the logged-in user
export async function getSessionUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    await connectDB();

    // Ensure you are referencing the correct User model
    const user = await User.findById(decoded.id).lean() as {
      userId: any;
      id: any;
      _id: string;
      name: string;
      email: string;
    } | null;

    return user;
  } catch  {
    return null;
  }
}
