"use client";

import Link from "next/link";
import { UserType } from "../../../../types";
import { deleteUser } from "../actions/deleteUser";
import { useRouter } from "next/navigation";

export default function UserRow({ user }: { user: UserType }) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteUser(user._id);
    router.refresh();
  };

  return (
    <tr>
  <td className="px-6 py-4">{user.username}</td>  
      <td>{user.email}</td>
      <td>
        
        <Link
          href={`/admin/users/edit/${user._id}`}
          className="text-blue-500 mr-4"
        >
          Edit
        </Link>
        <button onClick={handleDelete} className="text-red-500">
          Delete
        </button>
      </td>
    </tr>
  );
}
