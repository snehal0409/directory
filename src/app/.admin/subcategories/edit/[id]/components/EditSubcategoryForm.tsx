'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateSubcategory } from './../actions';
import { SubcategoryType } from '../../../../../../types';
import { getAllCategories } from './../../../../../.admin/categories/actions/getAllCategories';
import React from 'react';

export default function EditSubcategoryForm({ subcategory }: { subcategory: SubcategoryType }) {
  const router = useRouter();
  const [form, setForm] = useState({
    subcategoryKey: subcategory.subcategoryKey || '',
    subcategoryName: subcategory.subcategoryName || '',
    subcategoryParent: subcategory.subcategoryParent || '',
  });

  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSubcategory(subcategory._id!, form);
    router.push('/.admin/subcategories');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="subcategoryKey"
        value={form.subcategoryKey}
        onChange={handleChange}
        className="input"
        placeholder="Subcategory Key"
        required
      />
      <input
        type="text"
        name="subcategoryName"
        value={form.subcategoryName}
        onChange={handleChange}
        className="input"
        placeholder="Subcategory Name"
        required
      />
      <label htmlFor="subcategoryParent" className="block text-sm font-medium text-gray-700">
        Parent Category
      </label>
      <select
        id="subcategoryParent"
        name="subcategoryParent"
        value={form.subcategoryParent}
        onChange={handleChange}
        className="input"
        required
      >
        <option value="">Select Parent Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.categoryKey}>
            {cat.categoryName}
          </option>
        ))}
      </select>

      <div className="flex gap-4">
        <button type="submit" className="btn-primary">Update</button>
        <button type="button" onClick={() => router.push('/.admin/subcategories')} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
}
