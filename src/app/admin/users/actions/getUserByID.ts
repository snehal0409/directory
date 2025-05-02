'use server';

import User from '@/models/user';
import { connectDB } from '@/lib/mongodb';
import { UserType } from '@/types';

export const getUserById = async (id: string): Promise<UserType | null> => {
  await connectDB();

  // Use lean and cast the result to UserType
  const user = await User.findById(id).lean<UserType>();

  if (!user) return null;


  const userWithId: UserType = {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    createdAt: user.createdAt, 
    updatedAt: user.updatedAt, 
  };
  return userWithId;
};
