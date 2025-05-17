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

  const user = await User.findById(id).lean<UserType>();

  if (!user) return null;
 
 const userWithId: UserType = {
    _id: user._id.toString(),
    username: user.username,
    userId: user.userId,
    email: user.email,
    age: user.age,
    gender: user.gender,
    location: user.location,
    facebook: user.facebook,
    twitter: user.twitter,
    instagram: user.instagram,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return userWithId;
};
