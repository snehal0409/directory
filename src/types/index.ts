import { Types } from "mongoose";
import { Image } from "@/models/item";

export interface AdminType {
  _id: string; // If you're using MongoDB, _id will be of type ObjectId but you can use string in most cases
  username: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
// Define and export CategoryType
export interface SubcategoryType {
 
  subcategoryDescription: string;
  _id: string;
  subcategoryKey: string;
  subcategoryName: string;
  subcategoryParent: string;
  parentCategoryName?: string;
}

export interface CategoryType {
  _id: string;
  categoryKey: string;
  categoryName: string;
}




// src/types/index.ts
export type UserType = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export interface ActionResult {
  success?: boolean;
  error?: string;
}

export interface ItemType {
  images: Image[];
 
  _id: string;
  itemTitle: string;
  itemDescription: string;
  subcategoryKey: string;
  categoryKey: string;
 
  userId: Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
  createdBy: UserType;
}


export interface User {
  _id: string;
  name: string;
  email: string;
  // Add other properties as needed
}

// types/index.ts

export interface SessionUser {
  _id: string;
  email: string;
  username: string;
   role: string;
}
// types/index.ts
// types/index.ts
export interface SessionUser {
  _id: string;
  name: string;
  email: string;
  // Add any other fields your session has
}