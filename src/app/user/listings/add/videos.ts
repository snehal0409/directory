'use server';

import dbConnect from '@/lib/mongodb';
import Item from '@/models/item';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { session } from '@/app/actions/auth';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');
const THUMBNAIL_DIR = path.join(process.cwd(), 'public/uploads/thumbnails');
const VIDEO_DIR = path.join(process.cwd(), 'public/uploads/videos');

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(THUMBNAIL_DIR)) fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });
if (!fs.existsSync(VIDEO_DIR)) fs.mkdirSync(VIDEO_DIR, { recursive: true });

export async function addItem(formData: FormData) {
  const user = await session();
  if (!user) redirect('/user/login');

  await dbConnect();

  const imageUrls: { url: string; thumb: string }[] = [];
  const videoUrls: { url: string; thumb: string }[] = [];

  const images = formData.getAll('images') as File[];
  for (const image of images) {
    const fileName = `${Date.now()}-${Math.random()}.jpg`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    const thumbnailName = `thumb-${fileName}`;
    const thumbnailPath = path.join(THUMBNAIL_DIR, thumbnailName);

    const buffer = await image.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    await fs.promises.writeFile(filePath, imageBuffer);

    await sharp(filePath).resize(150, 150).toFile(thumbnailPath);

    imageUrls.push({
      url: fileName,
      thumb: thumbnailName,
    });
  }

  const videos = formData.getAll('videos') as File[];
  if (videos && videos.length > 0) {
    for (const video of videos) {
      const videoName = `${Date.now()}-${Math.random()}.mp4`;
      const videoPath = path.join(VIDEO_DIR, videoName);

      const buffer = await video.arrayBuffer();
      const videoBuffer = Buffer.from(buffer);
      await fs.promises.writeFile(videoPath, videoBuffer);

      videoUrls.push({
        url: videoName,
        thumb: videoName,
      });
    }
  }

  const subcategoryKey = formData.get('subcategoryKey') as string;
  const itemTitle = formData.get('itemTitle') as string;
  const itemDescription = formData.get('itemDescription') as string;

  await Item.create({
    userId: user.userId,
    subcategoryKey,
    itemTitle,
    itemDescription,
    images: imageUrls,
    videos: videoUrls,
  });

  redirect('/user/listings');
}
