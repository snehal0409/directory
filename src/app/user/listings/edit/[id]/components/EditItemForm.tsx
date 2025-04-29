'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateItem } from '../actions'; // Import the server action

type EditItemFormProps = {
  item: {
    _id: string;
    itemTitle: string;
    itemDescription: string;
    subCategoryKey: string;
    images: { url: string; thumb: string }[]; // Assuming images are stored like this
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
  const [imageFile, setImageFile] = useState<string | null>(null); // State for the image file
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for the image preview

  useEffect(() => {
    if (item.images && item.images.length > 0) {
      setImagePreview(`/uploads/thumbnails/${item.images[0].thumb}`);
    }
  }, [item]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImageFile(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await updateItem({
        _id: item._id,
        itemTitle,
        itemDescription,
        subCategoryKey,
        imageFile, // Send the image if it's updated
      });
      router.push('/user/listings');
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {/* Image Upload */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium">Upload Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 mt-1 block w-full"
        />
        {imagePreview && (
          <img src={imagePreview} alt="Image Preview" className="mt-2 w-32" />
        )}
      </div>

      <div className="flex justify-between">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        <button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default EditItemForm;
