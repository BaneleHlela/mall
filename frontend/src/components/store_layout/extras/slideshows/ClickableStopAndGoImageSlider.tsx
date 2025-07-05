import React, { useEffect, useState } from "react";
import { getBackgroundStyles, getBorderStyles, getTextStyles } from "../../../../utils/stylingFunctions";
import { IoMdClose } from "react-icons/io";

interface Image {
  _id: string;
  url: string;
  description?: string;
}

interface ImageSliderProps {
  images: Image[];
  style: any;
}

const ClickableStopAndGoImageSlider: React.FC<ImageSliderProps> = ({
  images,
  style
}) => {
    // Duplicate images for infinite scrolling
  const duplicatedImages = [...images, ...images];
  const [offset, setOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [popupImage, setPopupImage] = useState<Image | null>(null);
  const imageWidthPx = parseInt(style.background.width.mobile || "400");

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) =>
        prevOffset >= images.length - 1 ? 0 : prevOffset + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const handleTransitionEnd = () => {
    if (offset === duplicatedImages.length) {
      setTransitionEnabled(false);
      setOffset(0);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      const timeout = setTimeout(() => setTransitionEnabled(true), 0);
      return () => clearTimeout(timeout);
    }
  }, [transitionEnabled]);

  

  return (
    <div
        style={{
            backgroundColor: style.background.color,
        }} 
        className="relative w-full overflow-hidden font-[Outfit]"
    >
      <div
        className={`flex ${transitionEnabled ? "transition-transform duration-500 ease-in-out" : ""}`}
        style={{
          transform: `translateX(-${offset * imageWidthPx}px)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {duplicatedImages.map((img, idx) => (
          <div
            key={`${img._id}-${idx}`}
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
                ...getBorderStyles(style.background.border)
              }}
              className="object-cover cursor-pointer w-full h-full rounded-md"
            />

            {hoveredImageId === img._id && (
                <>
                    <div className="absolute inset-0 w-full h-full">
                        {/* Description at bottom */}
                        {style.hover.descriptionText.show && (
                            <div
                            style={{
                                ...getTextStyles(style.hover.descriptionText.style),
                            }} 
                            className="absolute bottom-0 left-0 w-full text-center text-white text-sm px-3 py-2 z-20">
                            {img.description || ""}
                        </div>
                        )}
                        

                        {/* View Button in center */}
                        <div className="absolute  inset-0 flex items-center justify-center z-30">
                            <button
                                onClick={() => setPopupImage(img)}
                                style={{
                                    ...getBackgroundStyles(style.hover.viewButton.background),
                                    ...getTextStyles(style.hover.viewButton.text)
                                }}
                                className="min-h-[30px] hover:scale-102"
                            >
                                View
                            </button>
                        </div>
                    </div>
                    <div
                        style={{
                            backgroundColor: style.hover.background.color,
                            opacity: style.hover.background.opacity,
                            ...getBorderStyles(style.background.border),
                        }} 
                        className="absolute inset-0 w-full h-full">

                    </div>
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
                className="absolute bottom-5 mt-2 text-center"
              >{popupImage.description || "No description"}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickableStopAndGoImageSlider;
