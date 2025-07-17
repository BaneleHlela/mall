import React, { useCallback, useEffect, useState } from "react";
import { getBackgroundStyles, getBorderStyles, getComplementaryPercentages, getTextStyles } from "../../../../utils/stylingFunctions";
import { IoMdClose } from "react-icons/io";
import { RiArrowRightWideLine, RiArrowLeftWideLine } from "react-icons/ri";

// Updated image format
interface RawImageObject {
  [key: string]: {
    url: string[]; // array of urls
    title?: string;
    description?: string;
  };
}

// Normalized image type
interface Image {
  _id: string;
  url: string;
  description?: string;
  title?: string;
}

interface ImageSliderProps {
  images: RawImageObject;
  style: any;
}

const ClickableStopAndGoImageSliderWithText: React.FC<ImageSliderProps> = ({ images, style }) => {
  // Convert object to array
  const normalizedImages: Image[] = Object.entries(images).map(([key, imgObj]) => ({
    _id: key,
    url: imgObj.url[0], // assume first image in url array
    title: imgObj.title || "",
    description: imgObj.description || "",
  }));

  const duplicatedImages: Image[] = [...normalizedImages, ...normalizedImages];


  const [offset, setOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [popupImage, setPopupImage] = useState<Image | null>(null);
  const imageWidth = parseInt(style.background.width.mobile || "400");

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) =>
        prevOffset >= normalizedImages.length - 1 ? 0 : prevOffset + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [normalizedImages.length]);

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
  
  const moveSlider = useCallback((direction: 'left' | 'right') => {
    setOffset((prevOffset) => {
      if (direction === 'left') {
        return prevOffset === 0 ? normalizedImages.length - 1 : prevOffset - 1;
      } else {
        return prevOffset >= normalizedImages.length - 1 ? 0 : prevOffset + 1;
      }
    });
  }, [normalizedImages.length]);

  console.log(style.image.background.height)
  return (
    <div
      className="relative w-full overflow-hidden font-[Outfit]"
    >
      <div 
        className="absolute inset-0 h-full w-full z-1
        flex flex-row justify-between items-center text-[8vh]"
      >
         <button 
            onClick={() => moveSlider('left')}
            className=""
          >
            <RiArrowLeftWideLine />
          </button>
          <button 
            onClick={() => moveSlider('right')}
            className=""
          >
            <RiArrowRightWideLine />
          </button>
      </div>
      <div
        className={`flex ${transitionEnabled ? "transition-transform duration-500 ease-in-out" : ""}`}
        style={{
          transform: `translateX(-${(offset * imageWidth)/2}vh)`,
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
              style={{ ...getBackgroundStyles(style.image.background) }}
              className="object-cover  cursor-pointer w-full rounded-md"
            />
            <div 
              style={{
                ...getBackgroundStyles(getComplementaryPercentages(style.image.background.height, "height")),
              }}
              className="px-2 flex flex-col bg-yellow-500 justify-evenly"
            >
              <h2 
                style={{ ...getTextStyles(style.text.title) }}
                className={`
                    ${style.text.title.position === 'start' && 'text-left'}
                    ${style.text.title.position === 'end' && 'text-right'}
                    ${style.text.title.position === 'center' && 'text-center'}
                  `}
              >
                {img.title || ""}
              </h2>
              <h4 
                  style={{ ...getTextStyles(style.text.description) }}
                  className={`
                    ${style.text.description.position === 'start' && 'text-left'}
                    ${style.text.description.position === 'end' && 'text-right'}
                    ${style.text.description.position === 'center' && 'text-center'}
                  `}
              >
                {img.description || ""}
              </h4>
            </div>
            
            {hoveredImageId === img._id && (
              <>
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center z-30">
                    <button
                      onClick={() => setPopupImage(img)}
                      style={{
                        ...getBackgroundStyles(style.hover.viewButton.background),
                        ...getTextStyles(style.hover.viewButton.text),
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
                  className="absolute inset-0 w-full h-full"
                />
              </>
            )}
          </div>
        ))}
      </div>

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
          </div>
        </div>
      )}
    </div>
  );
};

export default ClickableStopAndGoImageSliderWithText;
