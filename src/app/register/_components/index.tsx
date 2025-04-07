"use client";
import React from 'react';


import { register} from '@/app/actions/auth';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = React.useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (typeof password === 'string' && password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }
    try {
      await register(formData);
      setError('Registration successful! Redirecting to login...');
      // Optionally redirect to login page after a short delay
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error(err);
    }
  }

  return (
    
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              name="username"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              required
            />
          </div>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a className="underline text-blue-600" href="/">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}