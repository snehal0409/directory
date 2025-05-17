import connectToDatabase from '@/lib/mongodb';
import ItemModel from '@/models/item';
import UserModel from '@/models/user';

export const getItemById = async (itemId: string) => {
  await connectToDatabase();
  return ItemModel.findById(itemId).exec();
};

export const fetchUserItems = async (userId: string) => {
  await connectToDatabase();
  return ItemModel.find({ userId }).exec();
};

export const editItem = async (itemId: string, updatedData: { itemTitle: string; itemDescription: string }) => {
  await connectToDatabase();
  return ItemModel.findByIdAndUpdate(itemId, updatedData, { new: true }).exec();
};

export const deleteItem = async (itemId: string) => {
  await connectToDatabase();
  return ItemModel.findByIdAndDelete(itemId).exec();
};
export const addItem = async (userId: string, itemData: { subCategoryKey: string; itemTitle: string; itemDescription: string }) => {
  await connectToDatabase();
  const newItem = new ItemModel({ ...itemData, userId });
  return await newItem.save();
};

export const getUserProfile = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId).select('name age gender location');
    return user;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};