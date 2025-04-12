import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import Admin from '@/models/admin';
import { connectDB } from '@/lib/mongodb';

export async function getSessionAdmin() {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const admin = await Admin.findById(decoded.id).lean();
    return admin;
  } catch (err) {
    return null;
  }
}
export function createAdminToken(adminId: string) {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  return token;
}
const ADMIN_COOKIE_NAME = 'admin_token';

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}