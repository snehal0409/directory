import User from '@/models/user';

export const getUserProfile = async (userId: string) => {
  const user = await User.findById(userId).select('name bio');
  return user;
};
