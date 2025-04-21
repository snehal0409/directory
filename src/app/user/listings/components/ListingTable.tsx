// app/user/my-listings/components/ListingTable.tsx

import { ItemType } from "@/types";
import ListingRow from "./ListingRow";

interface ListingTableProps {
  items: ItemType[];
}

export default function ListingTable({ items }: ListingTableProps) {
  if (items.length === 0) {
    return <p className="text-gray-500">No listings found.</p>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left font-semibold">Title</th>
          <th className="px-4 py-2 text-left font-semibold">Description</th>
          <th className="px-4 py-2 text-left font-semibold">Subcategory</th>
          <th className="px-4 py-2 text-left font-semibold">Date</th>
          <th className="px-4 py-2 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <ListingRow key={item._id} item={item} />
        ))}
      </tbody>
    </table>
  );
}
