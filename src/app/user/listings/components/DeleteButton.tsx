// src/app/(user)/dashboard/my-listings/components/DeleteButton.tsx
'use client';

import { deleteItem } from './../actions';
import { useTransition } from 'react';

export default function DeleteButton({ itemId }: { itemId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => deleteItem(itemId))}
      className="text-red-600 hover:underline"
      disabled={isPending}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
