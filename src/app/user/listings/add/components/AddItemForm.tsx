'use client'

import { useEffect, useState } from 'react';
import { addItem } from '../actions'; 


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
  const [imageFile, setImageFile] = useState<string | null>(null); // State for the image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for the image preview
  const [error, setError] = useState('');
  

  useEffect(() => {
    setFilteredSubcategories(
      subcategories.filter(sub => sub.subcategoryParent === selectedCategory)
    );
  }, [selectedCategory, subcategories]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const reader = new FileReader()

      reader.onload = (e: any) => {
        setImageFile(e.target.result);
      }

      reader.readAsDataURL(file)
    }
  };

  const handleSubmit = async (formData: FormData) => {
      const subcategoryKey = formData.get('subcategoryKey') as string;
      const itemTitle = formData.get('itemTitle') as string;
      const itemDescription = formData.get('itemDescription') as string;

      if(!subcategoryKey || !itemTitle || !itemDescription) {
        setError('Required fields are empty')

        return
      }
      
      const data = {
        subcategoryKey,
        itemTitle,
        itemDescription,
        imageFile: imageFile??'',
      }

      console.log(data)

      addItem(data)
    }



  return (
    
    <form action={handleSubmit} method="POST" encType="multipart/form-data" className="space-y-4">
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

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block mb-1">Upload Image</label>
        <input
          id="image"
          type="file"
          name="file" // Match the server-side formData key
          accept="image/*"
          onChange={handleFileChange} // Handle file input change
          className="w-full border p-2 rounded"
        />
        {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2 w-32" />}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Listing
      </button>

      {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

    </form>
  );
}
