// app/user/my-listings/components/ListingRow.tsx

import { ItemType } from "@/types";
import Link from "next/link";

interface ListingRowProps {
  item: ItemType;
}

export default function ListingRow({ item }: ListingRowProps) {
  return (
    <tr className="border-t border-gray-200 hover:bg-gray-50 transition duration-150">
      <td className="px-4 py-2">{item.itemTitle}</td>
      <td className="px-4 py-2">{item.itemDescription}</td>
      <td className="px-4 py-2">{item.subCategoryKey}</td>
      <td className="px-4 py-2">
        {new Date(item.timeStamp).toLocaleDateString()}
      </td>
      <td className="px-4 py-2 space-x-2">
        <Link
          href={`/user/listings/edit/${item._id}`}
          className="text-blue-500 hover:underline"
        >
          Edit
        </Link>
        <Link
          href={`/user/listings/delete/${item._id}`}
          className="text-red-500 hover:underline"
        >
          Delete
        </Link>
      </td>
    </tr>
  );
}
