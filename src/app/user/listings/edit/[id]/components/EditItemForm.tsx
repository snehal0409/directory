// src/app/user/listings/edit/[id]/components/EditItemForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateItem } from '../actions'; // Import the server action

type EditItemFormProps = {
  item: {
    _id: string;
    itemTitle: string;
    itemDescription: string;
    subCategoryKey: string;
  };
  selectedCategoryKey: string;
  categories: { categoryKey: string; categoryName: string }[];
  subcategories: { subcategoryKey: string; subcategoryName: string }[];
};

const EditItemForm = ({
  item,
  selectedCategoryKey,
  categories,
  subcategories,
}: EditItemFormProps) => {
  const router = useRouter();
  const [itemTitle, setItemTitle] = useState(item.itemTitle);
  const [itemDescription, setItemDescription] = useState(item.itemDescription);
  const [subCategoryKey, setSubCategoryKey] = useState(item.subCategoryKey);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await updateItem({
        _id: item._id,
        itemTitle,
        itemDescription,
        subCategoryKey,
      });
      router.push('/user/listings');
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="itemTitle" className="block text-sm font-medium">Item Title</label>
        <input
          type="text"
          id="itemTitle"
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
          className="border p-2 mt-1 block w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="itemDescription" className="block text-sm font-medium">Item Description</label>
        <textarea
          id="itemDescription"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          className="border p-2 mt-1 block w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium">Category</label>
        <select
          id="category"
          value={selectedCategoryKey}
          disabled // optional: make it readonly to avoid mismatch
          className="border p-2 mt-1 block w-full"
        >
          {categories.map((category) => (
            <option key={category.categoryKey} value={category.categoryKey}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="subcategory" className="block text-sm font-medium">Subcategory</label>
        <select
          id="subcategory"
          value={subCategoryKey}
          onChange={(e) => setSubCategoryKey(e.target.value)}
          className="border p-2 mt-1 block w-full"
        >
          {subcategories.map((subcat) => (
            <option key={subcat.subcategoryKey} value={subcat.subcategoryKey}>
              {subcat.subcategoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        <button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default EditItemForm;
