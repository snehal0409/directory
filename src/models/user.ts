// src/models/user.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;   // 👈 Add this line
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },  // 👈 Add this
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
