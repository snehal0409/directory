// src/app/admin/items/add/actions.ts
'use server';

import dbConnect from '@/lib/mongodb';
import Item from '@/models/item';
import Category, { ICategory } from '@/models/category';
import { Subcategory, ISubcategory } from '@/models/subcategory';
import { getSessionAdmin } from '@/lib/session';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');
const THUMBNAIL_DIR = path.join(process.cwd(), 'public/uploads/thumbnails');

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
if (!fs.existsSync(THUMBNAIL_DIR)) fs.mkdirSync(THUMBNAIL_DIR, { recursive: true });

type ItemForm = {
  subcategoryKey: string;
  itemTitle: string;
  itemDescription: string;
  images: File[];
};

export async function addItem({ subcategoryKey, itemTitle, itemDescription, images }: ItemForm) {
  const admin = await getSessionAdmin();
  if (!admin) redirect('/admin/login');

  await dbConnect();

  const imageUrls = [];

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
      thumb: thumbnailName,
      url: fileName,
    });
  }

  await Item.create({
   
    subcategoryKey,
    itemTitle,
    itemDescription,
    images: imageUrls,
  });

  redirect('/admin/items');
}


export async function getAllCategories() {
  await dbConnect();
  
  return Category.find({})
    .then((categories) => {
      return categories.map((category: ICategory) => ({
        categoryKey: category.categoryKey,
        categoryName: category.categoryName,
      }));
    });
}

export async function getAllSubCategories() {
  await dbConnect();

  return Subcategory.find({}).then((subcategories) => {
    return subcategories.map((subcategory: ISubcategory) => ({
      subcategoryKey: subcategory.subcategoryKey,
      subcategoryName: subcategory.subcategoryName,
      subcategoryParent: subcategory.subcategoryParent,
    }));
  });
}
