// src/models/user.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string | undefined;
  userId: string;   // 👈 Add this line
  username: string;
  bio: string;
  email: string;
  password: string;
  age?: number;       
  gender?: string;    
  location?: string;
  facebook?: string; 
  twitter?: string;
  instagram?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },  // 👈 Add this
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String, required: true },
    age: { type: Number },       
    gender: { type: String },    
    location: { type: String }, 
    facebook: { type: String },
     twitter: { type: String },
      instagram: { type: String },

     
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
