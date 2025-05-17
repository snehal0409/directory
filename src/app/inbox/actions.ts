'use server';

import Message from '@/models/message';
import { connectDB } from '@/lib/mongodb';
import { session } from '@/app/actions/auth';

export async function getInboxList() {
  await connectDB();
  const currentUser = await session();
  if (!currentUser) return [];

  const userId = currentUser.userId;
  const inbox = await Message.aggregate([
    {
      $match: {
        $or: [{ senderId: userId }, { receiverId: userId }],
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        senderId: 1,
        receiverId: 1,
        content: 1,
        createdAt: 1,
      },
    },
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ['$senderId', userId] },
            '$receiverId',
            '$senderId',
          ],
        },
        lastMessage: { $first: '$content' },
        lastMessageDate: { $first: '$createdAt' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'userId',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $project: {
        userId: '$_id',
        username: '$user.username',
        lastMessage: 1,
        lastMessageDate: 1,
      },
    },
    {
      $sort: { lastMessageDate: -1 },
    },
  ]);

  return JSON.parse(JSON.stringify(inbox));
}
