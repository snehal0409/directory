'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUser } from '../actions';
import { UserType } from '@/types';
import { ActionResult } from '@/types';

type Props = {
  user: UserType;
};

export const EditUserForm = ({ user }: Props) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const updateData: any = {
      username: formData.username,
      email: formData.email,
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    const result: ActionResult = await updateUser(user._id!, updateData);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/admin/users');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4 bg-white p-6 rounded-xl shadow-md">
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          New Password <span className="text-gray-400 text-xs"></span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Update
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/users')}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
