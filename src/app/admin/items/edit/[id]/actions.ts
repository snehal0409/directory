'use server';

import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import dbConnect from '@/lib/mongodb';
import Item from '@/models/item';
import { redirect } from 'next/navigation';
import { getSessionAdmin } from '@/lib/session';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');
const THUMBNAIL_DIR = path.join(process.cwd(), 'public/uploads/thumbnails');
const VIDEO_DIR = path.join(process.cwd(), 'public/uploads/videos');


if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(THUMBNAIL_DIR)) fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });

if (!fs.existsSync(VIDEO_DIR)) fs.mkdirSync(VIDEO_DIR, { recursive: true });


type UpdateItemForm = {
  _id: string;
  itemTitle: string;
  itemDescription: string;
  subCategoryKey: string;
  existingImages: { url: string; thumb: string }[];
  existingVideos:  { url: string; thumb: string }[];
  newImages: File[];
  newVideos: File[];
};

export async function updateItem({
  _id,
  itemTitle,
  itemDescription,
  subCategoryKey,
  existingImages,
  existingVideos,
  newImages,
  newVideos,
}: UpdateItemForm) {
  const user = await getSessionAdmin();
  if (!user) redirect('/admin/login');

  await dbConnect();

  const newImageRecords = [];

  for (const image of newImages) {
    const fileName = `${Date.now()}-${Math.random()}.jpg`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    const thumbName = `thumb-${fileName}`;
    const thumbPath = path.join(THUMBNAIL_DIR, thumbName);

    const buffer = await image.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    await fs.promises.writeFile(filePath, imageBuffer);
    await sharp(filePath).resize(150, 150).toFile(thumbPath);

    newImageRecords.push({ url: fileName, thumb: thumbName });
  }

  const allImages = [...existingImages, ...newImageRecords];

  const newVideosRecords = [];
    if (newVideos && newVideos.length > 0) {
      for (const video of newVideos) {
        const videoName = `${Date.now()}-${Math.random()}.mp4`;
        const videoPath = path.join(VIDEO_DIR, videoName);
  
        const buffer = await video.arrayBuffer();
        const videoBuffer = Buffer.from(buffer);
        await fs.promises.writeFile(videoPath, videoBuffer);
  
        newVideosRecords.push({
          url: videoName,
          thumb: videoName, 
        });
      }
    }
    const allVideos = [...existingVideos, ...newVideosRecords];
  

  await Item.findByIdAndUpdate(_id, {
    itemTitle,
    itemDescription,
    subcategoryKey: subCategoryKey,
    images: allImages,
    videos: allVideos,
  });



  return;
}
