'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { updateItem } from '../actions';

type VideoType = {
  url: string;
  thumb: string;
};

export type ImageType = {
  url: string;
  thumb: string;
};

type Subcategory = {
  subcategoryKey: string;
  subcategoryName: string;
  subcategoryParent: string;
};

type EditItemFormProps = {
  item: {
    _id: string;
    itemTitle: string;
    itemDescription: string;
    subCategoryKey: string;
    categoryKey: string;
    images: ImageType[];
    videos: VideoType[];
  };
  categories: { categoryKey: string; categoryName: string }[];
  subcategories: Subcategory[];
};

export const EditItemForm = ({
  item,
  categories,
  subcategories,
}: EditItemFormProps) => {
  const router = useRouter();

  const [itemTitle, setItemTitle] = useState(item.itemTitle);
  const [itemDescription, setItemDescription] = useState(item.itemDescription);
  const [subCategoryKey, setSubCategoryKey] = useState(item.subCategoryKey);
  const [selectedCategory, setSelectedCategory] = useState(item.categoryKey);

  const [existingImages, setExistingImages] = useState<ImageType[]>(item.images ?? []);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);

  const [existingVideos, setExistingVideos] = useState<VideoType[]>(item.videos ?? []);
  const [newVideoFiles, setNewVideoFiles] = useState<File[]>([]);

  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  useEffect(() => {
    setFilteredSubcategories(
      subcategories.filter((sub) => sub.subcategoryParent === selectedCategory)
    );
  }, [selectedCategory, subcategories]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewImageFiles((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveNewImage = (index: number) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewVideoFiles((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveNewVideo = (index: number) => {
    setNewVideoFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveExistingVideo = (index: number) => {
    setExistingVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('subCategoryKey', subCategoryKey);
    formData.append('itemTitle', itemTitle);
    formData.append('itemDescription', itemDescription);
   

    newImageFiles.forEach((image) => formData.append('images', image));
    newVideoFiles.forEach((video) => formData.append('videos', video));

    
    existingImages.forEach((img) => formData.append('existingImages', img.url));
    existingVideos.forEach((vid) => formData.append('existingVideos', vid.url));

    await fetch(`http://localhost:3100/items/${item._id}`, {
      method: 'PUT',
      body: formData,
    });

    router.push('/user/listings');
  };

  const handleThumbnailClick = (url: string) => {
    setPreviewImage(url);
  };

  const handleVideoThumbnailClick = (url: string) => {
    setPreviewVideo(url);
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
            {filteredSubcategories.map((sub) => (
              <option key={sub.subcategoryKey} value={sub.subcategoryKey}>
                {sub.subcategoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="block mb-1">Existing Images</h2>
          <div className="flex flex-wrap gap-2">
            {existingImages.map((img, index) => (
              <div key={index} className="relative inline-block">
                <Image
                  src={`/uploads/thumbnails/${img.thumb}`}
                  width={96}
                  height={96}
                  className="object-cover cursor-pointer rounded"
                  alt={`Image ${index + 1}`}
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
          <label htmlFor="newImages" className="block mb-1">Add New Images</label>
          <input
            id="newImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {newImageFiles.map((file, index) => {
              const previewUrl = URL.createObjectURL(file);
              return (
                <div key={index} className="relative">
                  <Image
                    src={previewUrl}
                    width={96}
                    height={96}
                    className="object-cover rounded"
                    alt={`New image ${index + 1}`}
                    onClick={() => setPreviewImage(previewUrl)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="block mb-1">Existing Videos</h2>
          <div className="flex flex-wrap gap-2">
            {existingVideos.map((video, index) => (
              <div key={index} className="relative inline-block">
                <video
                  width={128}
                  height={128}
                  controls
                  className="rounded cursor-pointer"
                  onClick={() => handleVideoThumbnailClick(`/uploads/videos/${video.url}`)}
                >
                  <source src={`/uploads/videos/${video.url}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <button
                  type="button"
                  onClick={() => handleRemoveExistingVideo(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="newVideos" className="block mb-1">Add New Videos</label>
          <input
            id="newVideos"
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoFileChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {newVideoFiles.map((file, index) => {
              const previewUrl = URL.createObjectURL(file);
              return (
                <div key={index} className="relative">
                  <video
                    width={128}
                    height={128}
                    controls
                    className="rounded cursor-pointer"
                    onClick={() => setPreviewVideo(previewUrl)}
                  >
                    <source src={previewUrl} type="video/mp4" />
                  </video>
                  <button
                    type="button"
                    onClick={() => handleRemoveNewVideo(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              );
            })}
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
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        ><a
          onClick={() => setPreviewImage(null)}
          onKeyUp={() => setPreviewImage(null)}
          href="#"
          title="Preview"
        >
            <Image
              src={previewImage}
              alt="Preview"
              width={800}
              height={800}
              className="rounded max-h-[90vh] max-w-[90vw] object-contain"
            />
          </a>
        </div>
      )}

      {previewVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        >
          <a
            onClick={() => setPreviewVideo(null)}
            onKeyUp={() => setPreviewVideo(null)}
            href="#"
            title="Preview"
          >
            <video
              src={previewVideo}
              controls
              autoPlay
              className="rounded max-h-[90vh] max-w-[90vw]"
            />
          </a>
        </div>
      )}
    </>
  );
};
