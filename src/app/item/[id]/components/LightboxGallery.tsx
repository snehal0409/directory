'use client';

import { useState } from 'react';
import Image from 'next/image';

type MediaItem = {
  presignedUrl: string; 
  mainUrl: string;    
  thumb: string;
  url: string;
};

type Props = {
  item: {
    itemTitle: string;
    images: MediaItem[];
    videos: MediaItem[];
  };
};

// Get full media URL
function getMainUrl(media: MediaItem): string {
 
  return media.mainUrl; 
}

export default function LightboxGallery({ item }: Props) {
  const [lightboxMedia, setLightboxMedia] = useState<null | {
    mainUrl: string;
    type: 'image' | 'video';
  }>(null);

  if (!item.images || item.images.length === 0) return null;

  return (
    <>
      <div className="mb-6">
        {/* Main Image/Video Thumb */}
        <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden cursor-pointer">
          <Image
            src={item.images[0].presignedUrl}
            alt={item.itemTitle}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            onClick={() => {
              const mainUrl = getMainUrl(item.images[0]);
              if (mainUrl) {
                setLightboxMedia({
                 mainUrl,
                  type:  'image',
                });
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                const mainUrl = getMainUrl(item.images[0]);
                if ( mainUrl) {
                  setLightboxMedia({
                   mainUrl,
                    type: 'image',
                  });
                }
              }
            }}
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 overflow-x-auto">
          {item.images.slice(1).map((img, index) => (
            <div
              key={index}
              className="relative w-32 h-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-300 dark:border-zinc-700 cursor-pointer"
              onClick={() => {
                const mainUrl = getMainUrl(img);
                if ( mainUrl) {
                  setLightboxMedia({
                   mainUrl,
                    type: 'image',
                  });
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  const  mainUrl = getMainUrl(img);
                  if ( mainUrl) {
                    setLightboxMedia({
                     mainUrl,
                      type: 'image',
                    });
                  }
                }
              }}

        
            >
              <Image
                src={img.presignedUrl}
                alt={`Image ${index + 2}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}

{item.videos.map((video, index) => (
            <div
              key={index}
              className="relative w-32 h-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-300 dark:border-zinc-700 cursor-pointer"
              onClick={() => {
                const mainUrl = getMainUrl(video);
                if ( mainUrl) {
                  setLightboxMedia({
                   mainUrl,
                    type: 'video',
                  });
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  const  mainUrl = getMainUrl(video);
                  if ( mainUrl) {
                    setLightboxMedia({
                     mainUrl,
                      type: 'video',
                    });
                  }
                }
              }}

        
            >
              <Image
                src={video.presignedUrl}
                alt={`Video ${index + 2}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}


        </div>
      </div>
      
      

      {/* Lightbox Modal */}
      {lightboxMedia && lightboxMedia.mainUrl && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4 overflow-auto">
          <div className="relative max-w-[90vw] max-h-[90vh] mx-auto">
            {lightboxMedia.type === 'image' ? (
              <Image
                src={lightboxMedia.mainUrl}
                alt="Large Preview"
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={() => setLightboxMedia(null)}
              />
            ) : (
              <video
                src={lightboxMedia.mainUrl}
                controls
                autoPlay
                className="max-w-full max-h-[90vh] rounded-lg"
                onClick={() => setLightboxMedia(null)}
              />
            )}
            <button
              onClick={() => setLightboxMedia(null)}
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80"
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
