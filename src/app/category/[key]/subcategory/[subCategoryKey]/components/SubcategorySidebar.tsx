interface Props {
  category: {
    categoryName: string;
    categoryKey: string;
  };
  subcategory: {
    subcategoryName: string;
    subcategoryKey: string;
  };
}

export default function SubcategorySidebar({ category, subcategory }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-lg font-bold mb-3">{category.categoryName}</h2>
      <p className="text-gray-700">{subcategory.subcategoryName}</p>
    </div>
  );
}
