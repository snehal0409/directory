import React from "react";
import EditAdminForm from "./components/EditAdminForm";
import { getAdminById } from "./actions";
import { AdminType } from "../../../../types";


export default async function EditAdminPage({ params }: { params: { id: string } }) {
  const result = await getAdminById(params.id);
  const admin: AdminType | null = Array.isArray(result)
    ? {
        _id: result[0]._id as string,
        username: result[0].username,
        password: result[0].password,
        createdAt: result[0].createdAt,
      }
    : result
    ? {
        _id: result._id as string,
        username: result.username,
        password: result.password,
        createdAt: result.createdAt,
      }
    : null;
  if (!admin) return <div className="p-4 text-red-600">Admin not found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <EditAdminForm admin={admin} />
    </div>
  );
}

