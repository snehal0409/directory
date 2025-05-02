'use server';

import User from '@/models/user';
import { connectDB } from '@/lib/mongodb';
import { UserType } from '@/types';

type FormData = {
  username: string;
};

export const updateUser = async (id: string, formData: FormData) => {
  await connectDB();
  return User.findByIdAndUpdate(id, {
    username: formData.username,
  });
};

export const getUserById = async (id: string): Promise<UserType | null> => {
  await connectDB();

  // Use lean and cast the result to UserType
  const user = await User.findById(id).lean<UserType>();

  if (!user) return null;

  // Safely convert createdAt to Date and handle as a string or Date
  const createdAtDate = new Date(user.createdAt);
  const userWithId: UserType = {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return userWithId;
};
