// src/app/(user)/dashboard/my-listings/add/components/actions.ts
'use server';

import dbConnect from '@/lib/mongodb';
import Item from '@/models/item';
import { redirect } from 'next/navigation';
import { session } from '@/app/actions/auth';

export async function addItem(formData: FormData) {
  const user = await session();
  if (!user) redirect('/login');

  const subcategoryKey = formData.get('subcategoryKey') as string;
  const itemTitle = formData.get('itemTitle') as string;
  const itemDescription = formData.get('itemDescription') as string;

  await dbConnect();

  await Item.create({
    userId: user.id,
    subcategoryKey,
    itemTitle,
    itemDescription,
  });

  redirect('/user/listings');
}
