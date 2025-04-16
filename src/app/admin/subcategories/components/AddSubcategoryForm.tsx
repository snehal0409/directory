'use client';
import { addSubcategory } from '../actions/addSubcategory';
import { CategoryType } from '../../../../types';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AddSubcategoryForm({ categories }: { categories: CategoryType[] }) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const subcategoryKey = formData.get('subcategoryKey') as string;
    const subcategoryName = formData.get('subcategoryName') as string;
    const subcategoryParent = formData.get('subcategoryParent') as string;
    await addSubcategory({ subcategoryKey, subcategoryName, subcategoryParent });
    router.push('/admin/subcategories');
  }

  return (
    <form action={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="subcategoryKey" className="block text-sm font-medium text-gray-700">
          Subcategory Key
        </label>
        <input
          id="subcategoryKey"
          name="subcategoryKey"
          placeholder="Subcategory Key"
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
          placeholder="Subcategory Name"
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
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">
          Add
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
