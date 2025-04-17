import mongoose, { Schema, models, model } from 'mongoose';

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
},

{
  timestamps: true, // ✅ Automatically adds createdAt and updatedAt
}
);

const Admin = models.Admin || model('Admin', adminSchema);

export default Admin;
