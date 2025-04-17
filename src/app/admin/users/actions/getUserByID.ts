'use server';

import User from '@/models/user';
import { connectDB } from '@/lib/mongodb';
import { UserType } from '@/types';

export const getUserById = async (id: string): Promise<UserType | null> => {
  await connectDB();

  // Use lean and cast the result to UserType
  const user = await User.findById(id).lean<UserType>();

  if (!user) return null;

  // Handle createdAt field and check if it's a valid Date object
  const createdAt = user.createdAt && !isNaN(new Date(user.createdAt).getTime()) 
    ? new Date(user.createdAt).toISOString() 
    : new Date().toISOString();  // Fallback if createdAt is invalid or undefined

  const userWithId: UserType = {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    createdAt,  // Ensure it's a valid ISO string
  };

  return userWithId;
};
