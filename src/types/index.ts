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
export interface SubcategoryType {
  _id?: string;
  subcategoryKey: string;
  subcategoryName: string;
  subcategoryParent: string;
}
