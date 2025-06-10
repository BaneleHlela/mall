import React, { useRef, useEffect, useState } from 'react';
import cupcake from "../assets/cupcake.png";

const images = [cupcake, cupcake, cupcake, cupcake, cupcake]
export default function ImageSlider() {
  const [offset, setOffset] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const imageWidth = 192; // Tailwind w-48 = 192px

  useEffect(() => {
    const totalImages = images.length;
    const interval = setInterval(() => {
      setOffset(prev => (prev + 1) % totalImages);
    }, 3000); // shift every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const duplicatedImages = [...images, ...images];

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={sliderRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${offset * imageWidth}px)` }}
      >
        {duplicatedImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx}`}
            className="w-48 h-auto object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
}