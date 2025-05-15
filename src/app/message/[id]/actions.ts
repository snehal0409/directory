'use server';

import Message from '@/models/message';
import { connectDB } from '@/lib/mongodb';
import { session } from '@/app/actions/auth'; // Your session auth util
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

export async function sendMessage(receiverId: string, content: string) {
  await connectDB();
  const sender = await session();
  if (!sender) throw new Error('Not authenticated');

  const message = await Message.create({
    senderId: sender.userId,
    receiverId,
    content,
  });

  return JSON.parse(JSON.stringify(message)); // Prevent non-serializable return
}

export async function getMessagesWithUser(otherUserId: string) {
  await connectDB();
  const sender = await session();
  if (!sender) return [];

  const messages = await Message.aggregate([
    {
      $match: {
        $or: [
          { senderId: sender.userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: sender.userId },
        ],
      },
    },
    { $sort: { createdAt: 1 } },
    {
      $lookup: {
        from: "users",
        localField: "senderId",
        foreignField: "userId",
        as: "senderData",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "receiverId",
        foreignField: "userId",
        as: "receiverData",
      },
    },
    {
      $unwind: "$senderData",
    },
    {
      $unwind: "$receiverData",
    },
    {
      $project: {
        senderId: 1,
        receiverId: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
        sender: {
          userId: "$senderData.userId",
          username: "$senderData.username",
          email: "$senderData.email",
          bio: "$senderData.bio",
        },
        receiver: {
          userId: "$receiverData.userId",
          username: "$receiverData.username",
          email: "$receiverData.email",
          bio: "$receiverData.bio",
        },
      },
    },
  ]);

   return JSON.parse(JSON.stringify(messages));
}
