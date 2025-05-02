'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  item: {
    itemTitle: string;
    images: { url: string }[];
  };
};

export default function LightboxGallery({ item }: Props) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!item.images || item.images.length === 0) return null;

  return (
    <>
      <div className="mb-6">
        {/* Main Image */}
        <div
          className="relative w-full h-64 mb-4 rounded-lg overflow-hidden cursor-pointer"
         
        >
          <Image
            src={`/uploads/${item.images[0].url}`}
            alt={item.itemTitle}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            onClick={() => setLightboxImage(`/uploads/${item.images[0].url}`)}
            onKeyUp={(e => {
              if (e.key === 'Enter') {
                setLightboxImage(`/uploads/${item.images[0].url}`);
              }
            })}
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 overflow-x-auto">
          {item.images.slice(1).map((img, index) => (
            <div
              key={index}
              className="relative w-32 h-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-300 dark:border-zinc-700 cursor-pointer"
            >
              <Image
                src={`/uploads/${img.url}`}
                alt={`Image ${index + 2}`}
                layout="fill"
                objectFit="cover"
                onClick={() => setLightboxImage(`/uploads/${img.url}`)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    setLightboxImage(`/uploads/${img.url}`);
                  }
                }}
                
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4 overflow-auto"
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] mx-auto"
          >
            <Image
              src={lightboxImage}
              alt="Large Preview"
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={() => setLightboxImage(null)}

            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
