'use server';

import User from '@/models/user';
import { connectDB } from '@/lib/mongodb';

export const getAllUsers = async () => {
  await connectDB();
  const users = await User.find().lean();
  return JSON.parse(JSON.stringify(users));
};
