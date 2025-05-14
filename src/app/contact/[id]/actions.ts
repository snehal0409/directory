
import User from '@/models/user';


export async function getUserById(userId: string) {
  try {
    const user = await User.findOne({ userId }).select('-password'); 
    
    return user
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null
  }
}
