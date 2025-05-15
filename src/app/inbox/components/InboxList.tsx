'use client';

import Link from 'next/link';

interface InboxItem {
  userId: string;
  username: string;
  lastMessage: string;
  lastMessageDate: string;
  isOnline?: boolean;  // optional online status
}

export default function InboxList({ inbox }: { inbox: InboxItem[] }) {
  if (inbox.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-lg font-medium">📭 No Conversations</p>
          <p className="text-sm mt-2">Start chatting with someone to see messages here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-1 bg-white dark:bg-zinc-900 shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Chats</h2>
      </div>

      <ul className="overflow-y-auto max-h-[480px]">
        {inbox.map(({ userId, username, lastMessage, lastMessageDate, isOnline }) => {
          // get initials for avatar fallback
          const initials = username
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

          return (
            <li key={userId} className="border-b border-gray-100 dark:border-zinc-800 last:border-0">
              <Link
                href={`/message/${userId}`}
                className="flex items-center px-5 py-4 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                    {initials}
                  </div>
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full ring-2 ring-white dark:ring-zinc-900 bg-green-400" />
                  )}
                </div>

                <div className="flex flex-col flex-1 min-w-0 ml-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-900 dark:text-white font-semibold text-md truncate">
                      {username}
                    </p>
                    <time className="text-xs text-gray-500 dark:text-gray-400 ml-2 whitespace-nowrap">
                      {new Date(lastMessageDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </time>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm truncate max-w-full mt-1">
                    {lastMessage}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
