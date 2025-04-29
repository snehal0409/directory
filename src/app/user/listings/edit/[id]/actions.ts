"use server";

import { session } from "@/app/actions/auth";
import { connectDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";
import Item from "@/models/item"; // Correct import for Item model
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Define the image upload path
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");
const THUMBNAIL_DIR = path.join(process.cwd(), "public/uploads/thumbnails");

// Ensure the upload and thumbnail directories exist
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(THUMBNAIL_DIR)) fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });

// Define the shape of the form data
interface FormData {
  _id: string;
  subCategoryKey: string;
  itemTitle: string;
  itemDescription: string;
  imageFile: string | null; // New field for image file
}

export async function updateItem(form: FormData) {
  // Get the current logged-in user
  const user = await session();
  if (!user) return redirect("/login"); // If no user is logged in, redirect to login page

  await connectDB(); // Connect to the database

  // Find the item by ID
  const item = await Item.findById(form._id);
  if (!item || item.userId.toString() !== user._id.toString()) {
    return redirect("/user/listings");
  }

  // Handle the image update if an image is provided
  let imageFile = item.images; // Default to existing images

  if (form.imageFile) {
    const fileName = `${Date.now()}-${Math.random()}.jpg`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    const thumbnailName = `thumb-${fileName}`;
    const thumbnailPath = path.join(THUMBNAIL_DIR, thumbnailName);

    const base64Data = form.imageFile.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    await fs.promises.writeFile(filePath, buffer);
    await sharp(filePath)
      .resize(150, 150) // Resize for thumbnail
      .toFile(thumbnailPath);

    imageFile = [
      {
        thumb: thumbnailName,
        url: fileName,
      },
    ];
  }

  // Update the item in the database
  await Item.updateOne(
    { _id: form._id },
    {
      itemTitle: form.itemTitle,
      itemDescription: form.itemDescription,
      subcategoryKey: form.subCategoryKey,
      images: imageFile,
    }
  );

  // Redirect after success
  redirect("/user/listings");
}
