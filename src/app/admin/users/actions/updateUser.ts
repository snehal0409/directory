'use server';

import { connectDB } from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';
import { ActionResult } from '@/types';

export async function updateUser(id: string, data: { username?: string; email?: string; password?: string }): Promise<ActionResult> {
  try {
    // Connect to the database
    await connectDB();

    // Initialize updateData with the fields that are available
    const updateData: { username?: string; email?: string; password?: string } = {};

    // Validate data and update accordingly
    if (data.username) {
      updateData.username = data.username;
    }

    if (data.email) {
      updateData.email = data.email;
    }

    if (data.password) {
      // Hash the password if it's provided
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData.password = hashedPassword;
    }

    // Perform the update operation
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return { error: 'User not found or update failed' }; // Ensure an error is returned if the update fails
    }

    // Return success
    return { success: true };
  } catch (err) {
    console.error('Update user failed:', err);
    return { error: 'Failed to update user' }; // Return error if an exception occurs
  }
}
