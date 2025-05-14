'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { editProfile, logout, changePassword } from '@/app/actions/auth';
import { FaFacebookF, FaTwitter, FaInstagram, FaBirthdayCake, FaTransgender, FaMapMarkerAlt } from 'react-icons/fa';

export type ProfileProps = {
  user: {
    username: string;
    email: string;
    age?: number;
    gender?: string;
    location?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
};

export function Profile({ user }: ProfileProps) {
  const router = useRouter();

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [age, setAge] = useState(user.age || '');
  const [gender, setGender] = useState(user.gender || '');
  const [location, setLocation] = useState(user.location || '');
  const [facebook, setFacebook] = useState(user.facebook || '');
  const [twitter, setTwitter] = useState(user.twitter || '');
  const [instagram, setInstagram] = useState(user.instagram || '');

  const handleEdit = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    setIsEditing(false);
    try {
      await editProfile({
        username,
        email,
        age: age ? parseInt(age as string, 10) : undefined,
        gender,
        location,
        facebook,
        twitter,
        instagram,
      });
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-pink-100 px-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white text-3xl flex items-center justify-center font-bold mb-4">
            {username[0]?.toUpperCase()}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">{username}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>

        {/* Profile Information */}
        <div className="grid gap-6 mb-8">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Username"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Email"
              />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Age"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                aria-label="Gender"
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Location"
              />
            </div>
          ) : (
            <div className="space-y-4 text-lg text-gray-700">
              {age && (
                <div className="flex items-center gap-2">
                  <FaBirthdayCake /> {age}
                </div>
              )}
              {gender && (
                <div className="flex items-center gap-2">
                  <FaTransgender /> {gender}
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt /> {location}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="grid gap-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-700">Social Links</h3>
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Facebook URL"
              />
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Twitter URL"
              />
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Instagram URL"
              />
            </div>
            
          ) : (
            <div className="space-y-2">
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FaFacebookF className="text-xl" /> Facebook
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  className="flex items-center gap-2 text-blue-400 hover:underline"
                >
                  <FaTwitter className="text-xl" /> Twitter
                </a>
              )}
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  className="flex items-center gap-2 text-pink-500 hover:underline"
                >
                  <FaInstagram className="text-xl" /> Instagram
                </a>
              )}
            </div>

            
          )}
        </div>

        {/* Password Section */}
        {isChangingPassword && (
          <div className="mb-8">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
              placeholder="New Password"
            />
          </div>
        )}
        

        {/* Action Buttons */}
        <div className="grid gap-4">
          <button
            onClick={isEditing ? handleSave : handleEdit}
            className="w-full p-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none"
          >
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
          
          <button
            onClick={isChangingPassword ? handleSavePassword : handleChangePassword}
            className="w-full p-3 text-white bg-red-500 hover:bg-red-600 rounded-md focus:outline-none"
          >
            {isChangingPassword ? 'Save Password' : 'Change Password'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full p-3 text-white bg-gray-500 hover:bg-gray-600 rounded-md focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    
  );
}
