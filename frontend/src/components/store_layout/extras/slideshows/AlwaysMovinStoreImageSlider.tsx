import React, { useRef, useEffect } from "react";
import { getBorderStyles } from "../../../../utils/stylingFunctions";
import type { Border } from "../../../../types/layoutTypes";

interface ImageSliderProps {
  images: string[];
  width: string;
  height: string;
  margin:string;
  border: Border;
}

const AlwaysMovingImageSlider: React.FC<ImageSliderProps> = ({
  images,
  width,
  height,
  margin = "5px",
  border = {width: "5px", color: "solid", style: "white", radius: "0"}
}) => {
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
              ...getBorderStyles(border),
              width, height, margin: margin 
            }}
            className="m-1 h-auto object-cover flex-shrink-0 border-4 border-white"
          />
        ))}
      </div>
    </div>
  );
};

export default AlwaysMovingImageSlider;