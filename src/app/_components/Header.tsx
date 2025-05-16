import Link from "next/link";
import { session, logout } from '@/app/actions/auth';

export async function Header() { 
  const user = await session();

  return (
    <header className="flex justify-end gap-4 p-4 sm:p-6">
      {user ? (
        <>
         <Link
            href="/"
            className="inline-block px-5 py-2 rounded-full backdrop-blur-sm bg-blue-300 text-black font-bold shadow-md hover:bg-blue-400 hover:scale-105 transition duration-300"
          >
            Home
          </Link>
           <Link
                    href="/user/listings"
                   className="inline-block px-5 py-2 rounded-full backdrop-blur-sm bg-pink-400 text-black font-bold shadow-md hover:bg-pink-500 hover:scale-105 transition duration-300"
                  >
                    Listings
                  </Link>
          <Link
            href="/profile"
            className="inline-block px-4 py-2 rounded-full backdrop-blur-sm bg-green-400 text-black font-bold shadow-md hover:bg-green-500 hover:scale-105 transition duration-300"
          >
            Profile
          </Link>
          <Link
            href="/inbox"
            className="px-4 py-2 rounded-full backdrop-blur-sm bg-yellow-300 text-black font-bold shadow hover:bg-yellow-400 hover:scale-105 transition"
          >
            Inbox
          </Link>
         
         
          <form action={logout}>
            <button
              type="submit"
              className="inline-block px-5 py-2 rounded-full backdrop-blur-sm bg-red-400 text-white font-bold shadow-md hover:bg-red-500 hover:scale-105 transition duration-300"
            >
              Logout
            </button>
          </form>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="inline-block px-5 py-2 rounded-full backdrop-blur-sm bg-blue-600 text-white font-bold shadow-md hover:bg-gray-300 hover:scale-105 transition duration-300"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-block px-5 py-2 rounded-full backdrop-blur-sm bg-green-400 text-white font-bold shadow-md hover:bg-gray-300 hover:scale-105 transition duration-300"
          >
            Register
          </Link>
        </>
      )}
    </header>
  );
}
