import React, { useRef, useEffect, useState } from "react";
import type { Border } from "../../../../types/layoutTypes";
import { getBorderStyles } from "../../../../utils/stylingFunctions";

interface ImageSliderProps {
  images: string[];
  width: string;
  height: string;
  margin:string;
  border: Border
}

const StopAndGoImageSlider: React.FC<ImageSliderProps> = ({
  images,
  width,
  height,
  margin = "5px",
  border = {width: "5px", color: "solid", style: "white", radius: "0"}
}) => {
  const [offset, setOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [replicatedImages, setReplicatedImages] = useState([...images, ...images, ...images]); // Initialize with the original images
  const sliderRef = useRef<HTMLDivElement>(null);

  const imageWidthPx = parseInt("100");

  useEffect(() => {
    // Add more images to the replicatedImages array every 3 seconds
    const interval = setInterval(() => {
      setReplicatedImages((prevImages) => [...prevImages, ...images]); // Append the original images
    }, 1000);

    return () => clearInterval(interval);
  }, [images]); // Dependency ensures it uses the latest images array

  useEffect(() => {
    setReplicatedImages([...images]); 
  }, [images])

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => prevOffset + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (offset === replicatedImages.length) {
      // Disable transition to reset instantly
      setTransitionEnabled(false);
      setOffset(0);
    }
  };

  // Re-enable transition after resetting
  useEffect(() => {
    if (!transitionEnabled) {
      const timeout = setTimeout(() => {
        setTransitionEnabled(true);
      }, 0); // Allow a brief moment for reset without animation
      return () => clearTimeout(timeout);
    }
  }, [transitionEnabled]);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={sliderRef}
        className={`flex ${transitionEnabled ? "transition-transform duration-500 ease-in-out" : ""}`}
        style={{
          transform: `translateX(-${offset * imageWidthPx}px)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {replicatedImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx}`}
            style={{ 
              ...getBorderStyles(border),
              width, height, margin: margin 
            }}
            className="h-auto object-cover flex-shrink-0"
          />
        ))}
      </div>
    </div>
  );
};

export default StopAndGoImageSlider;
