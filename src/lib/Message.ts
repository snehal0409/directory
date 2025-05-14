import Message from '../models/message';

export const sendMessageToUser = async (receiverId: string, content: string) => {
  const senderId = 'currentUserId'; 
  const newMessage = new Message({
    senderId,
    receiverId,
    content,
  });

  await newMessage.save();
};
