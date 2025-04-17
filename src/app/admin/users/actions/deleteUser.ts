'use server';

import User from '@/models/user';
import { connectDB } from '@/lib/mongodb';

export const deleteUser = async (id: string) => {
  await connectDB();
  await User.findByIdAndDelete(id);
};
