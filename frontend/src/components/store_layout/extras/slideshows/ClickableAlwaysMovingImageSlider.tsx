import React, { useRef, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { getBackgroundStyles, getBorderStyles, getTextStyles } from "../../../../utils/stylingFunctions";

interface Image {
  _id: string;
  url: string;
  description?: string;
}

interface ImageSliderProps {
  images: Image[];
  style: any;
}

const ClickableAlwaysMovingImageSlider: React.FC<ImageSliderProps> = ({
  images,
  style,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [popupImage, setPopupImage] = useState<Image | null>(null);

  // Duplicate images for infinite scrolling
  const duplicatedImages = [...images, ...images];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const keyframes = [
      { transform: "translateX(0)" },
      { transform: "translateX(-50%)" },
    ];

    const animation = track.animate(keyframes, {
      duration: 80000, // 20 seconds loop
      iterations: Infinity,
      easing: "linear",
    });

    return () => animation.cancel();
  }, []);

  return (
    <div
      style={{ backgroundColor: style.background.color }}
      className="relative w-full overflow-hidden font-[Outfit]"
    >
      <div ref={trackRef} className="flex w-max">
        {duplicatedImages.map((img, idx) => (
          <div
            key={`${img._id}-${idx}`} // include idx to avoid duplicate keys in duplicated array
            className="relative flex-shrink-0"
            style={{
              margin: style.background.margin,
              ...getBackgroundStyles(style.background),
            }}
            onMouseEnter={() => setHoveredImageId(img._id)}
            onMouseLeave={() => setHoveredImageId(null)}
          >
            <img
              src={img.url}
              alt={img.description || "Image"}
              style={{
                ...getBorderStyles(style.background.border),
              }}
              className="object-cover cursor-pointer w-full h-full rounded-md"
              onClick={() => setPopupImage(img)}
            />

            {hoveredImageId === img._id && (
              <>
                {/* Hover Overlay */}
                <div className="absolute inset-0 w-full h-full z-20">
                  {/* Description at bottom */}
                  {style.hover.descriptionText.show && (
                    <div
                        style={{
                            ...getTextStyles(style.hover.descriptionText.style),
                        }} 
                        className="absolute bottom-0 left-0 w-full text-center text-white text-sm px-3 py-2 z-20">
                        {img.description || "No description"}
                    </div>
                  )}

                  {/* View Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => setPopupImage(img)}
                      style={{
                        ...getBackgroundStyles(style.hover.viewButton.background),
                        ...getTextStyles(style.hover.viewButton.text)
                      }}
                      className="min-h-[30px] hover:scale-102 z-30"
                    >
                      View
                    </button>
                  </div>
                </div>

                {/* Background Overlay */}
                <div
                  style={{
                    backgroundColor: style.hover.background.color,
                    opacity: style.hover.background.opacity,
                    ...getBorderStyles(style.background.border),
                  }}
                  className="absolute inset-0 w-full h-full z-10"
                ></div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Popup Viewer */}
      {popupImage && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/80 z-50">
          <div className="relative flex flex-row justify-center lg:max-w-[60%] max-h-[70%]">
            <button
              onClick={() => setPopupImage(null)}
              className="absolute top-2 right-2 text-white bg-black p-1 rounded-full z-50 hover:scale-105"
            >
              <IoMdClose size={28} />
            </button>
            <img
              src={popupImage.url}
              alt="Zoomed"
              className="relative max-w-full max-h-[60vh] object-cover rounded-md"
            />
            {popupImage.description && (
              <div
                style={{
                  ...getTextStyles(style.hover.descriptionText),
                }}
                className="absolute bottom-5 mt-2 text-center text-white"
              >
                {popupImage.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickableAlwaysMovingImageSlider;
