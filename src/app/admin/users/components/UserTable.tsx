"use client";


import { UserType } from "@/types";
import UserRow from "./UserRow";


interface UserTableProps {
  users: UserType[]; // Define the type for the 'users' prop
}

export default function UserTable({ users }: UserTableProps) {
  // Optionally, you can add a state to handle loading state as well
  if (!users) {
    return <div>Loading...</div>; // Or you could display a spinner
  }

  return (
    <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
      <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
        <tr>
          <th scope="col" className="px-6 py-3">Username</th>
          <th scope="col" className="px-6 py-3">Email</th>
          <th scope="col" className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={3} className="px-6 py-3 text-center">No users found</td>
          </tr>
        ) : (
          users.map((user) => (
            <UserRow key={user._id} user={user} />
          ))
        )}
      </tbody>
    </table>
  );
}
