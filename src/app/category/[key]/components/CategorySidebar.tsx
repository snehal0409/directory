// src/app/category/[key]/components/CategorySidebar.tsx
import Link from "next/link";

interface Props {
  category: {
    categoryName: string;
    categoryKey: string;
  };
  subcategories: {
    subcategoryName: string;
    subcategoryKey: string;
  }[];
}

export default function CategorySidebar({ category, subcategories }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-lg font-bold mb-3">{category.categoryName}</h2>
      <ul className="space-y-2">
        {subcategories.map((sub) => (
          <li key={sub.subcategoryKey}>
            <span className="block text-gray-700">{sub.subcategoryName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
