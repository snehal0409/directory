"use client";

import { ItemType } from "@/types";
import Link from "next/link";
import { deleteItem } from "../../actions";

export default function ItemRow({ item }: { item: ItemType }) {
  return (
    <div className="border p-4 rounded flex justify-between items-center">
      <div>
        <p className="font-bold">{item.itemTitle}</p>
        <p>{item.itemDescription}</p>
        <p className="text-sm text-gray-600">{new Date(item.timeStamp).toLocaleString()}</p>
      </div>
      <div className="flex gap-2">
        <Link href={`/user/listing/edit/${item._id}`} className="text-blue-600">Edit</Link>
        <button onClick={() => deleteItem(item._id)} className="text-red-600">Delete</button>
      </div>
    </div>
  );
}
