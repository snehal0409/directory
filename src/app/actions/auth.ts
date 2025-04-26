'use server';

import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectDB } from '@/lib/mongodb';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import mongoose  from 'mongoose';

const SECRET = process.env.JWT_SECRET!;


export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
  return await bcrypt.hash(password, salt); // Hash the password
};


export async function register(formData: FormData) {
  await connectDB();
  const username = formData.get('username') as string;  
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const existing = await User.findOne({ username });
  if (existing) throw new Error('User already exists');

  const existing2 = await User.findOne({ email });
  if (existing2) throw new Error('Email already exists');

  const userId= new mongoose.Types.ObjectId().toString()

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ userId, username, email, password: hashedPassword });
  await user.save();
}

export async function login(formData: FormData) {
  await connectDB();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id.toString() }, SECRET, { expiresIn: '1h' });
  const cookieStore = await cookies();
  cookieStore.set('token', token, { httpOnly: true });
}

export async function editProfile(data: { email?: string, username?: string } ) {
  await connectDB();
  const token = (await cookies()).get('token')?.value;
  if (!token) throw new Error('Unauthorized');

  const payload = jwt.verify(token, SECRET) as { userId: string };
  const updated = await User.findByIdAndUpdate(payload.userId, data, { new: true });
  return updated;
}
export async function changePassword(newPassword: string) {
  await connectDB();
  const token = (await cookies()).get('token')?.value;
  if (!token) throw new Error('Unauthorized');

  const payload = jwt.verify(token, SECRET) as { userId: string };

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(payload.userId, {
    password: hashedPassword,
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = cookies();
  (await cookieStore).set('token', '', {
    httpOnly: true,
    expires: new Date(0), 
  });
}

export async function session(){
    await connectDB();
  const token = (await cookies()).get('token')?.value;
  if (!token) return null

  try {
    const payload = jwt.verify(token, SECRET) as { userId: string };
    const user = await User.findById(payload.userId).select('-password');
    return user;
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      console.warn('Token expired');
      return null;
    }
    throw error; 
  }
}