'use server';

import { connectDB } from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

type AddUserInput = {
  username: string;
  email: string;
  password: string;
};

export async function addUser({ username, email, password }: AddUserInput) {
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return { error: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return { success: true };
}
