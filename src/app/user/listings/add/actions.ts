'use server';

import dbConnect from '@/lib/mongodb';
import Item from '@/models/item';
import { redirect } from 'next/navigation';
import { session } from '@/app/actions/auth';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Define the image upload path
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');
const THUMBNAIL_DIR = path.join(process.cwd(), 'public/uploads/thumbnails');

// Ensure the upload and thumbnail directories exist
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(THUMBNAIL_DIR)) fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });

type ItemForm = {
  subcategoryKey: string,
  itemTitle: string,
  itemDescription: string,
  imageFile: string,
}

export async function addItem({
  subcategoryKey,
  itemTitle,
  itemDescription,
  imageFile,
}: ItemForm) {
  const user = await session();
  if (!user) redirect('/login');

  
  const fileName = `${Date.now()}-${Math.random()}.jpg`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  const thumbnailName = `thumb-${fileName}`;
  const thumbnailPath = path.join(THUMBNAIL_DIR, thumbnailName);


  const base64Data = imageFile.replace(/^data:image\/\w+;base64,/, '');

  // Create a buffer from the base64 string
  const buffer = Buffer.from(base64Data, 'base64');

  // Write the buffer to a file
  await fs.writeFileSync(filePath, buffer)


  // Create a thumbnail using sharpitle
  await sharp(filePath)
    .resize(150, 150) // Resize for thumbnail
    .toFile(thumbnailPath);


  // Save the item with the file and thumbnail name in the database
  await dbConnect();

  const images = [{
    thumb: thumbnailName,
    url: fileName,
  }]

  await Item.create({
    userId: user.userId,
    subcategoryKey,
    itemTitle,
    itemDescription,
    images,
  });

  // Redirect after success
  redirect('/user/listings');
}
