import React, { useRef, useEffect } from "react";

interface ImageSliderProps {
  images: string[]; 
  width: string; 
  height: string; 
}

const AlwaysMovingImageSlider: React.FC<ImageSliderProps> = ({ images, width, height }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const keyframes = [
      { transform: "translateX(0)" },
      { transform: "translateX(-50%)" },
    ];

    const animation = track.animate(keyframes, {
      duration: 20000, // 20s for full scroll
      iterations: Infinity,
      easing: "linear",
    });

    return () => animation.cancel();
  }, []);

  // Duplicate images for seamless looping
  const duplicatedImages = [...images, ...images];

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex w-max">
        {duplicatedImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx}`}
            style={{
              width: width,
              height: height,
            }}
            className="m-1 h-auto object-cover flex-shrink-0 border-4 border-white"
          />
        ))}
      </div>
    </div>
  );
};

export default AlwaysMovingImageSlider;