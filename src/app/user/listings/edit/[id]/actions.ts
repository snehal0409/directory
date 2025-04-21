// src/app/user/listings/edit/[id]/actions.ts
"use server";

import { session } from "@/app/actions/auth";
import { connectDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";
import Item from "@/models/item"; // Correct import for Item model
import { redirect } from "next/navigation";

// Define the shape of the form data
interface FormData {
  _id: string;              // The item's ID (string representation of Mongo ObjectId)
  subCategoryKey: string;   // Subcategory key of the item
  itemTitle: string;        // Title of the item
  itemDescription: string;  // Description of the item
}

export async function updateItem(form: FormData) {
  // Get the current logged-in user
  const user = await session();
  if (!user) return redirect("/login");  // If no user is logged in, redirect to login page

  await connectDB();  // Connect to the database

  // Find the item by ID
  const item = await Item.findById(form._id);
  if (!item || item.userId.toString() !== user._id.toString()) {
    return redirect("/user/listings");  // Redirect if the item doesn't exist or doesn't belong to the user
  }

  // Update the item's data with the new data from the form
  item.subCategoryKey = form.subCategoryKey;
  item.itemTitle = form.itemTitle;
  item.itemDescription = form.itemDescription;
  
  // Save the updated item
  await item.save();
}
export async function getItemById(id: string) {
  await connectDB();
  try {
    const item = await Item.findOne({ _id: new Object(id) });
    return JSON.parse(JSON.stringify(item));
  } catch (error) {
    console.error("Invalid ObjectId:", error);
    return null;
  }
}