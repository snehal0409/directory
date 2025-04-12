import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  password: string;
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  
});


const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema);

export default Admin;
