// SimpleStoreImagesSlideshow.tsx

import React, { useState, useEffect, useRef } from 'react';
import { getBorderStyles } from '../../../../utils/stylingFunctions';

export interface SlideshowProps {
  images: string[];
  height?: string;
  width?: string;
  style: {
    border: {
      width: string;
      style: string;
      color: string;
      radius: string;
    };
  };
}

const SimpleStoreImagesSlider: React.FC<SlideshowProps> = ({ images, height = "50vh", width = "50vw", style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (trackRef.current) {
        trackRef.current.style.transition = "transform 1s ease-in-out";
        trackRef.current.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;

        setTimeout(() => {
          setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % images.length;

            // Reset position if looping
            if (newIndex === 0 && trackRef.current) {
              trackRef.current.style.transition = "none";
              trackRef.current.style.transform = `translateX(0%)`;
            }

            return newIndex;
          });
        }, 1000); // Match transition duration
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div 
      style={{
        height: height,
        width: width,
        ...getBorderStyles(style.border),
      }}
      className="relative overflow-hidden"
    >
      <div
        ref={trackRef}
        className="flex w-full h-full"
        style={{ transform: "translateX(0%)" }}
      >
        {[...images, images[0]].map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleStoreImagesSlider;
