"use server";

import { connectDB } from "../../../../lib/mongodb"; // Adjust based on your file structure
import Admin from "../../../../models/admin"; // Adjust based on your file structure
import { hashPassword } from "../../../actions/auth"; // Function for hashing password
import { getSessionAdmin } from "../../../../lib/session"; // Function for checking logged-in admin
import { revalidatePath } from "next/cache"; // Revalidate page cache after an update

interface AdminData {
  username: string;
  password: string;
}

export async function addAdminAction(adminData: AdminData) {
  await connectDB(); // Ensure database connection is made

  // Fetch the session admin to ensure the user is authorized to add admins
  const sessionAdmin = await getSessionAdmin();
  if (!sessionAdmin) {
    throw new Error("Unauthorized"); // If no admin is logged in, throw error
  }

  console.log('Session Admin:', sessionAdmin); // Debugging line

  // Get the count of admins in the database
  const adminCount = await Admin.countDocuments();

  console.log('Admin Count:', adminCount); // Debugging line

  // If more than one admin exists, allow only the first admin to add others
  if (adminCount > 1) {
    const firstAdmin = await Admin.findOne().sort({ _id: 1 }); // Get the first admin based on creation order

    // Check if firstAdmin is null and throw an error if so
    if (!firstAdmin) {
      throw new Error("No admins found in the database.");
    }

    if (sessionAdmin._id.toString() !== firstAdmin._id.toString()) {
      throw new Error("Only the first admin can add other admins.");
    }
  }

  // Hash the password before storing it in the database
  const hashedPassword = await hashPassword(adminData.password);

  // Create a new admin object with the hashed password
  const newAdmin = new Admin({
    username: adminData.username,
    password: hashedPassword,
  });

  // Save the new admin to the database
  await newAdmin.save();

  // Revalidate the admin dashboard to reflect the new changes
  revalidatePath("/admin/admins");
}
