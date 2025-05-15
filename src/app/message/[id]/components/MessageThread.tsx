'use client';
import { useEffect, useState } from 'react'
import { getMessagesWithUser } from '../actions';


export default function MessageThread({
  messages: serverMessages,
  currentUserId,
  otherUserId,
}: {
  messages: { _id: string; senderId: string; receiverId: string; content: string; createdAt: string }[];
  currentUserId: string;
  otherUserId: string,
}) {
  const [messages, setMessages] = useState(serverMessages)

  useEffect(()=>{
    async function fetchMessages(){
      const newMessages = await getMessagesWithUser(otherUserId)

      setMessages(newMessages)
    }

    const interval = setInterval(fetchMessages, 3000);

    return () => clearInterval(interval);
  },[])

  return (
    <div className="space-y-2 mb-4 max-h-96 overflow-y-auto border p-4 rounded flex flex-col">
        {messages.map((msg: any) => {
          const isSender = msg.senderId === currentUserId;
          return (
            <div
              key={msg._id}
              className={`p-2 rounded max-w-[75%] ${
                isSender
                  ? 'bg-blue-500 self-end text-right' 
                  : 'bg-gray-300 self-start text-left' 
              }`}
            >
             <b>{isSender ? 'Me' : msg.sender.username}:</b> {msg.content}
            </div>
          );
        })}
      </div>
  );
}
