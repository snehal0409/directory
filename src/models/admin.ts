// src/models/admin.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Admin extends Document {
  _id: string;
  username: string;
  password: string;  // Optional or required, depending on your setup
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const AdminModel = mongoose.model<Admin>('Admin', AdminSchema);
export default AdminModel;
