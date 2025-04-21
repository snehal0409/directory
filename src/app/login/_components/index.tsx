"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login} from '@/app/actions/auth'; 

export function LoginForm() {
 
  const [error, setError] = useState<string>("");
  const router = useRouter(); 


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await login(formData);
  
        setTimeout(() => {
          router.push('/user/dashboard');
        }, 1500);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error(err);
    }


  };
 
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label htmlFor="emailInput" className="block mb-1">Email</label>
          <input
            type="email"
            name="email"

            id="emailInput"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="passwordInput" className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            id="passwordInput"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded mb-4 `}
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}