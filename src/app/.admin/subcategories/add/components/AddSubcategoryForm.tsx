'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { addSubcategory } from './../actions';
import { getAllCategories } from '../../../../.admin/categories/actions/getAllCategories';
import React from 'react';

export default function AddSubcategoryForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({ subcategoryKey: '', subcategoryName: '', subcategoryParent: '' });

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addSubcategory(form);
    router.push('/.admin/subcategories');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="subcategoryKey" value={form.subcategoryKey} onChange={handleChange} className="input" placeholder="Key" />
      <input name="subcategoryName" value={form.subcategoryName} onChange={handleChange} className="input" placeholder="Name" />
      <label htmlFor="subcategoryParent" className="sr-only">Parent Category</label>
      <select id="subcategoryParent" name="subcategoryParent" value={form.subcategoryParent} onChange={handleChange} className="input">
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat.categoryKey}>{cat.categoryName}</option>
        ))}
      </select>
      <div className="flex gap-4">
        <button type="submit" className="btn-primary">Add</button>
        <button type="button" onClick={() => router.push('/.admin/subcategories')} className="btn-secondary">Cancel</button>
      </div>
    </form>
  );
}
