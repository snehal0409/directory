'use client';

import { useState } from 'react';
import { sendMessage } from '../actions';
import { useRouter } from 'next/navigation';

export default function MessageBox({ receiverId }: { receiverId: string }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    await sendMessage(receiverId, content);
    setContent('');
    setLoading(false);
    router.refresh(); // Refresh the page to reload messages
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1 border px-3 py-2 rounded"
        placeholder="Type your message..."
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
