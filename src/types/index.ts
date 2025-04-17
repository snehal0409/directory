export interface AdminType {
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

