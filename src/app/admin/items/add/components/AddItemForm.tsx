'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


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
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]); // Allow multiple videos
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setFilteredSubcategories(
      subcategories.filter(sub => sub.subcategoryParent === selectedCategory)
    );
  }, [selectedCategory, subcategories]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      if (type === 'image') {
        setImageFiles(prevFiles => [...prevFiles, ...newFiles]);
        const previewUrls = newFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(prevPreviews => [...prevPreviews, ...previewUrls]);
      } else if (type === 'video') {
        setVideoFiles(prevFiles => [...prevFiles, ...newFiles]);
        const previewUrls = newFiles.map(file => URL.createObjectURL(file));
        setVideoPreviews(prevPreviews => [...prevPreviews, ...previewUrls]);
      }
    }
  };

  const handleRemoveFile = (index: number, type: 'image' | 'video') => {
    if (type === 'image') {
      setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
      setImagePreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    } else if (type === 'video') {
      setVideoFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
      setVideoPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formDataFromEvent = new FormData(event.target as HTMLFormElement);
    const subcategoryKey = formDataFromEvent.get('subcategoryKey') as string;
    const itemTitle = formDataFromEvent.get('itemTitle') as string;
    const itemDescription = formDataFromEvent.get('itemDescription') as string;

    if (!subcategoryKey || !itemTitle || !itemDescription || imageFiles.length === 0 || videoFiles.length === 0) {
      setError('All fields and at least one image and one video are required');
      return;
    }

    const formData = new FormData();
    formData.append('subcategoryKey', subcategoryKey);
  
    formData.append('itemTitle', itemTitle);
    formData.append('itemDescription', itemDescription);
    imageFiles.forEach((image) => formData.append(`images`, image));
    videoFiles.forEach((video) => formData.append(`videos`, video));

    await fetch('http://localhost:3100/items', {
      method: 'POST',
      body: formData,
    });
    router.push("/admin/items");
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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

      <div>
        <label htmlFor="subcategoryKey" className="block mb-1">Subcategory</label>
        <select
          id="subcategoryKey"
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

      <div>
        <label htmlFor="itemTitle" className="block mb-1">Item Title</label>
        <input
          id="itemTitle"
          name="itemTitle"
          type="text"
          required
          className="w-full border p-2 rounded"
          placeholder="Enter title"
        />
      </div>

      <div>
        <label htmlFor="itemDescription" className="block mb-1">Description</label>
        <textarea
          id="itemDescription"
          name="itemDescription"
          required
          className="w-full border p-2 rounded"
          placeholder="Enter description"
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="imageUpload" className="block mb-1">Upload Images</label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          multiple
          onChange={e => handleFileChange(e, 'image')}
          className="w-full border p-2 rounded"
          title="Choose images to upload"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative inline-block">
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                width={128}
                height={128}
                className="object-cover rounded cursor-pointer"
                onClick={() => setSelectedImage(preview)}
              />
              <button
                type="button"
                          onClick={() => handleRemoveFile(index, 'image')}
                className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                aria-label={`Remove image ${index + 1}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="videoUpload" className="block mb-1">Upload Videos</label>
        <input
          id="videoUpload"
          type="file"
          accept="video/*"
          multiple
                 onChange={e => handleFileChange(e, 'video')}
          className="w-full border p-2 rounded"
          title="Choose videos to upload"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {videoPreviews.map((preview, index) => (
            <div key={index} className="relative inline-block">
              <video width={128} height={128} controls className="rounded cursor-pointer">
                <source src={preview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button
                type="button"
                        onClick={() => handleRemoveFile(index, 'video')}
                className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
                aria-label={`Remove video ${index + 1}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Item
      </button>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center"
              aria-label="Close image preview"
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Preview"
              width={800}
              height={600}
              className="object-contain max-w-full max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </form>
  );
}
