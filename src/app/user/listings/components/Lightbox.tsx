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
  media:MediaItem
  type:'image'|'video'  
};

// Get full media URL
function getMainUrl(media: MediaItem): string {
 
  return media.mainUrl; 
}

export function Lightbox({ media,type  }: Props) {
  const [lightboxMedia, setLightboxMedia] = useState<null | {
    mainUrl: string;
    type: 'image' | 'video';
  }>(null);

  if(!media||!type) return null;
 

  return (
    <>
      <div>       

  
            <div
              className="relative w-32 h-20 flex-shrink-0 rounded-md overflow-hidden border border-gray-300 dark:border-zinc-700 cursor-pointer"
              onClick={() => {
                const mainUrl = getMainUrl(media);
                if ( mainUrl) {
                  setLightboxMedia({
                   mainUrl,
                    type,
                  });
                }
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  const  mainUrl = getMainUrl(media);
                  if ( mainUrl) {
                    setLightboxMedia({
                     mainUrl,
                      type,
                    });
                  }
                }
              }}

        
            >
              <Image
                src={media.presignedUrl}
                alt={`Image`}
                fill
                style={{ objectFit: 'cover' }}
              />
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
