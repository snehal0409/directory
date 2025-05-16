import { Header } from '@/app/_components/Header';
import Link from 'next/link';
import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaBirthdayCake,
  FaTransgender,
  FaMapMarkerAlt,
} from 'react-icons/fa';

interface PublicProfileProps {
  user: {
    _id: any;
    username: string;
    email?: string;
    age?: number;
    gender?: string;
    location?: string;
    facebook?: string;   
    twitter?: string;
    instagram?: string;
  };
}

export const PublicProfile: React.FC<PublicProfileProps> = ({ user }) => {
  return (
      <><Header />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-pink-100 px-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-lg">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white text-3xl flex items-center justify-center font-bold mb-4">
            {user.username[0]?.toUpperCase()}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
        </div>

        {/* Profile Information */}
        <div className="space-y-4 text-lg text-gray-700 mb-8">
          {user.age && (
            <div className="flex items-center gap-2">
              <FaBirthdayCake /> {user.age}
            </div>
          )}
          {user.gender && (
            <div className="flex items-center gap-2">
              <FaTransgender /> {user.gender}
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt /> {user.location}
            </div>
          )}
        </div>

        {/* Social Links */}
        {(user.facebook || user.twitter || user.instagram) && (
          <div className="grid gap-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-700">Social Links</h3>
            <div className="space-y-2">
              {user.facebook && (
                <a
                  href={`https://facebook.com/${user.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FaFacebookF className="text-xl" /> Facebook
                </a>
              )}
              {user.twitter && (
                <a
                  href={`https://twitter.com/${user.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:underline"
                >
                  <FaTwitter className="text-xl" /> Twitter
                </a>
              )}
              {user.instagram && (
                <a
                  href={`https://instagram.com/${user.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-pink-500 hover:underline"
                >
                  <FaInstagram className="text-xl" /> Instagram
                </a>
              )}
            </div>
          </div>
        )}

        {/* Contact Button */}
        <div>
          <Link href={`/message/${user._id}`}>
            <button className="w-full p-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md">
              Send Message
            </button>
          </Link>
        </div>
      </div>
    </div></>
  );
};
