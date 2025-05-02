'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setFilteredSubcategories(
      subcategories.filter(sub => sub.subcategoryParent === selectedCategory)
    );
  }, [selectedCategory, subcategories]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setImageFiles(prevFiles => [...prevFiles, ...newFiles]);

      const previewUrls = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviews(prevPreviews => [...prevPreviews, ...previewUrls]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const subcategoryKey = formData.get('subcategoryKey') as string;
    const itemTitle = formData.get('itemTitle') as string;
    const itemDescription = formData.get('itemDescription') as string;

    if (!subcategoryKey || !itemTitle || !itemDescription || imageFiles.length === 0) {
      setError('All fields and at least one image are required');
      return;
    }

    const data = {
      subcategoryKey,
      itemTitle,
      itemDescription,
      images: imageFiles,
    };

    console.log(data);
    await addItem(data);
  };

  const openLightbox = (image: string) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
      {/* Category Selection */}
      <div>
        <label htmlFor="category" className="block mb-1">Category</label>
        <select
          id="category"
          required
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full border p-2 rounded"
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
          required
          rows={4}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block mb-1">Upload Images</label>
        <input
          id="image"
          type="file"
          name="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative inline-block">
              <Image
                src={preview}
                alt={`Preview ${index}`}
                width={128}
                height={128}
                className="object-cover cursor-pointer rounded"
                onClick={() => openLightbox(preview)}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Listing
      </button>

      {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded shadow-lg">
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Lightbox"
              width={800}
              height={600}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </form>
  );
}
