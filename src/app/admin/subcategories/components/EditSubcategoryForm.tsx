'use client';
import { SubcategoryType, CategoryType } from '../../../../types';
import { useRouter } from 'next/navigation';
import { updateSubcategory } from '../actions/updateSubcategory'; // Assume this function is already defined
import React, { useState, useEffect } from 'react';

export default function EditSubcategoryForm({ subcategory, categories }: { subcategory: SubcategoryType; categories: CategoryType[] }) {
  const router = useRouter();

  // Initialize state for form data
  const [formData, setFormData] = useState({
    subcategoryKey: subcategory.subcategoryKey,
    subcategoryName: subcategory.subcategoryName,
    subcategoryParent: subcategory.subcategoryParent,
  });

  useEffect(() => {
    // Update form data when subcategory props change
    setFormData({
      subcategoryKey: subcategory.subcategoryKey,
      subcategoryName: subcategory.subcategoryName,
      subcategoryParent: subcategory.subcategoryParent,
    });
  }, [subcategory]);

  // Handle form field change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { subcategoryKey, subcategoryName, subcategoryParent } = formData;
    await updateSubcategory(subcategory._id, { subcategoryKey, subcategoryName, subcategoryParent });
    router.push('/admin/subcategories');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="subcategoryKey" className="block text-sm font-medium text-gray-700">
          Subcategory Key
        </label>
        <input
          id="subcategoryKey"
          name="subcategoryKey"
          value={formData.subcategoryKey}
          onChange={handleInputChange}
          required
          className="w-full border px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="subcategoryName" className="block text-sm font-medium text-gray-700">
          Subcategory Name
        </label>
        <input
          id="subcategoryName"
          name="subcategoryName"
          value={formData.subcategoryName}
          onChange={handleInputChange}
          required
          className="w-full border px-2 py-1"
        />
      </div>

      <div>
        <label htmlFor="subcategoryParent" className="block text-sm font-medium text-gray-700">
          Parent Category
        </label>
        <select
          id="subcategoryParent"
          name="subcategoryParent"
          value={formData.subcategoryParent}
          onChange={handleInputChange}
          required
          className="w-full border px-2 py-1"
        >
          <option value="">Select Parent Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.categoryKey}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          Update
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/subcategories')}
          className="bg-gray-300 px-4 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
