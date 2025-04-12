'use client';

import React, { useState } from 'react';
import { addAdmin } from './../../add/actions';
import { useRouter } from 'next/navigation';

export default function AddAdminForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAdmin({ username, password });
    router.push('/.admin/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Admin</h2>
      <div className="mb-4">
        <label className="block mb-1">Username</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          title="Password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Add Admin
      </button>
      <div className="my-4 border-t"></div>
      <p className="text-sm text-gray-500 mb-2">Or</p>
      <a
      href="/.admin/admins"
      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
    >
      Cancel
      </a>
    </form>
  );
}
