import React, { useRef, useEffect, useState } from "react";

interface ImageSliderWithPropsProps {
  images: string[];
  width: string;
  height: string;
}

const StopAndGoImageSlider: React.FC<ImageSliderWithPropsProps> = ({
  images,
  width,
  height,
}) => {
  const [offset, setOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

    //   const imageWidthPx = parseInt(width);
  const imageWidthPx = parseInt("100");
  const totalImages = images.length;

  // Duplicate images to enable seamless loop
  const replicatedImages = [...images, ...images, ...images];

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => prevOffset + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleTransitionEnd = () => {
    if (offset === totalImages) {
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
            style={{ width, height }}
            className="m-1 h-auto object-cover flex-shrink-0 border-6 border-white"
          />
        ))}
      </div>
    </div>
  );
};

export default StopAndGoImageSlider;
