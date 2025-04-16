'use server';

import { connectDB } from '../../../../lib/mongodb';
import Admin from '../../.../../../../models/admin';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

export async function getAdminById(id: string) {
  await connectDB();
  try {
    const admin = await Admin.findById(id).lean();
    return admin ? JSON.parse(JSON.stringify(admin)) : null;
  } catch (err) {
    console.error('Error fetching admin:', err);
    return null;
  }
}

export async function updateAdminAction({
  id,
  username,
  password,
}: {
  id: string;
  username: string;
  password?: string;
}) {
  await connectDB();

  try {
    const updateData: { username: string; password?: string } = { username };

    if (password && password.trim() !== '') {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    await Admin.updateOne({ _id: new ObjectId(id) }, { $set: updateData });
    return { success: true };
  } catch (err) {
    console.error('Failed to update admin:', err);
    return { success: false, error: 'Failed to update admin' };
  }
}
