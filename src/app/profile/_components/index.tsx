'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { editProfile, logout, changePassword } from '@/app/actions/auth';

export type ProfileProps = {
  user: {
    username: string;
    email: string;
  };
};

export function Profile({ user }: ProfileProps) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const router = useRouter();

  const handleEdit = () => setIsEditing(!isEditing);
  const handleSave = async () => {
    setIsEditing(false);
    try {
      await editProfile({ username, email });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleChangePassword = () => setIsChangingPassword(!isChangingPassword);
  const handleSavePassword = async () => {
    setIsChangingPassword(false);
    try {
      await changePassword(password);
    } catch (error) {
      console.error('Failed to change password:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="username">
            Name:
          </label>
          {isEditing ? (
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          ) : (
            <p>{username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          {isEditing ? (
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          ) : (
            <p>{email}</p>
          )}
        </div>
        {isChangingPassword && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              New Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3"
            />
          </div>
        )}
        <button
          onClick={isEditing ? handleSave : handleEdit}
          className="w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? 'Save' : 'Edit Profile'}
        </button>
        <button
          onClick={isChangingPassword ? handleSavePassword : handleChangePassword}
          className="w-full mb-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          {isChangingPassword ? 'Save Password' : 'Change Password'}
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
