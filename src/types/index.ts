export interface AdminType {
  email: any;
  _id: string; // If you're using MongoDB, _id will be of type ObjectId but you can use string in most cases
  username: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}
// Define and export CategoryType
export interface SubcategoryType {
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
// src/types/index.ts
export type UserType = {
  _id: string;
  username: string;
  email: string;
  createdAt: string; // Or Date, depending on your setup
};

export interface ActionResult {
  success?: boolean;
  error?: string;
}

export interface ItemType {
  _id: string;
  userId: string;
  subCategoryKey: string;
  itemTitle: string;
  itemDescription: string;
  timeStamp: string;
  active: boolean;
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
