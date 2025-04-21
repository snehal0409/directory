// src/app/(user)/dashboard/my-listings/add/components/AddItemForm.tsx
'use client';

import { useEffect, useState } from 'react';
import { addItem } from './../actions';

type Category = {
  categoryKey: string;
  categoryName: string;
};

type Subcategory = {
  subcategoryKey: string;
  subcategoryName: string;
  subcategoryParent: string;
};

type Props = {
  categories: Category[];
  subcategories: Subcategory[];
};

export default function AddItemForm({ categories, subcategories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    setFilteredSubcategories(
      subcategories.filter(sub => sub.subcategoryParent === selectedCategory)
    );
  }, [selectedCategory, subcategories]);

  return (
    <form action={addItem} className="space-y-4">
      {/* Category Selection */}
      <div>
        <label htmlFor="category" className="block mb-1">Category</label>
        <select
          id="category"
          required
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full border p-2 rounded"
          title="Select a category"
        >
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat.categoryKey} value={cat.categoryKey}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Selection */}
      <div>
        <label htmlFor="subcategory" className="block mb-1">Subcategory</label>
        <select
          id="subcategory"
          name="subcategoryKey"
          required
          className="w-full border p-2 rounded"
          title="Select a subcategory"
        >
          <option value="">Select subcategory</option>
          {filteredSubcategories.map(sub => (
            <option key={sub.subcategoryKey} value={sub.subcategoryKey}>
              {sub.subcategoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Item Title Input */}
      <div>
        <label htmlFor="itemTitle" className="block mb-1">Item Title</label>
        <input
          id="itemTitle"
          type="text"
          name="itemTitle"
          placeholder="Enter item title"
          title="Title of the item"
          required
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Description Textarea */}
      <div>
        <label htmlFor="itemDescription" className="block mb-1">Description</label>
        <textarea
          id="itemDescription"
          name="itemDescription"
          placeholder="Enter a detailed description"
          title="Item description"
          required
          rows={4}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Listing
      </button>
    </form>
  );
}
