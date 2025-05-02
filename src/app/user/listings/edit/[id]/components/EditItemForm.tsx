'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { updateItem } from '../actions';

type ImageType = {
  url: string;
  thumb: string;
};

type EditItemFormProps = {
  item: {
    _id: string;
    itemTitle: string;
    itemDescription: string;
    subCategoryKey: string;
    images: ImageType[];
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
  const [existingImages, setExistingImages] = useState<ImageType[]>(item.images);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [, setMainImage] = useState<string>(existingImages[0]?.url || '');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selected = Array.from(files);
      setNewImageFiles((prev) => [...prev, ...selected]);
    }
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateItem({
      _id: item._id,
      itemTitle,
      itemDescription,
      subCategoryKey,
      existingImages,
      newImages: newImageFiles,
    });

    router.push('/user/listings');
  };

  const handleThumbnailClick = (imageUrl: string) => {
    setMainImage(imageUrl);
    setPreviewImage(imageUrl);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="itemTitle" className="block mb-1">Item Title</label>
          <input
            id="itemTitle"
            type="text"
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="itemDescription" className="block mb-1">Item Description</label>
          <textarea
            id="itemDescription"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="categorySelect" className="block mb-1">Category</label>
          <select
            id="categorySelect"
            value={selectedCategoryKey}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          >
            {categories.map((cat) => (
              <option key={cat.categoryKey} value={cat.categoryKey}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subcategorySelect" className="block mb-1">Subcategory</label>
          <select
            id="subcategorySelect"
            value={subCategoryKey}
            onChange={(e) => setSubCategoryKey(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {subcategories.map((sub) => (
              <option key={sub.subcategoryKey} value={sub.subcategoryKey}>
                {sub.subcategoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="block mb-1">Image Gallery</h2>
          <div className="flex flex-wrap gap-2">
            {existingImages.map((img, index) => (
              <div key={index} className="relative inline-block">
                <Image
                  src={`/uploads/thumbnails/${img.thumb}`}
                  width={96}
                  height={96}
                  className="object-cover cursor-pointer rounded"
                  alt={`Gallery image ${index + 1}`}
                  onClick={() => handleThumbnailClick(`/uploads/${img.url}`)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="newImages" className="block mb-1">Add More Images</label>
          <input
            id="newImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {newImageFiles.map((file, index) => (
              <div key={index} className="relative">
                <Image
                  src={URL.createObjectURL(file)}
                  width={96}
                  height={96}
                  className="object-cover rounded"
                  alt={`New upload ${index + 1}`}
                  onClick={() => setPreviewImage(URL.createObjectURL(file))}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>

      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded relative max-w-3xl w-full">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 text-black text-xl font-bold"
            >
              ×
            </button>
            <Image
              src={previewImage}
              alt="Preview"
              width={800}
              height={600}
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditItemForm;
