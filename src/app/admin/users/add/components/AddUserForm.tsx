'use client';

import { useState } from 'react';
import { addUser } from '../addUser';
import { useRouter } from 'next/navigation';

export default function AddUserForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = await addUser({ username, email, password });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/admin/users');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {error && <p className="text-red-600">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      <div className="flex gap-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add User
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/users')}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
