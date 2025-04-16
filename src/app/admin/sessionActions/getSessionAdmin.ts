"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import clientPromise from "./../../../lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function getSessionAdmin() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("adminToken")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const client = await clientPromise();
    const db = client.db();

    const admin = await db.collection("admins").findOne({ _id: new ObjectId(decoded.id) });

    if (!admin) return null;

    return {
      id: admin._id.toString(),
      username: admin.username,
    };
  } catch (err: any) {
    // Handle token expiration or invalid token
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      // Optional: delete the expired or invalid cookie
      (await
        // Optional: delete the expired or invalid cookie
        cookieStore).delete("adminToken");
    }

    return null;
  }
}
