export type AdminType = {
  _id: string;
  
  username: string;
  password: string;
  createdAt: string; // changed from Date
  updatedAt: string; // changed from Date
};
// Define and export CategoryType
export interface CategoryType {
  _id: string;
  categoryKey: string;
  categoryName: string;
}
export interface ICategory {
  _id: string;
  categoryKey: string;
  categoryName: string;
}

export interface ISubcategory {
  _id: string;
  subcategoryKey: string;
  subcategoryName: string;
  subcategoryParent: string;
}

