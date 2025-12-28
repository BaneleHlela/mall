import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import { IoMdClose } from "react-icons/io";

import "swiper/css";

import {
  getBackgroundStyles,
  getBorderStyles,
  getTextStyles,
} from "../../../../utils/stylingFunctions";
import { useAppSelector } from "../../../../app/hooks";

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
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [popupImage, setPopupImage] = useState<Image | null>(null);

  const { fonts, colors } = useAppSelector(
    (state) => state.layoutSettings
  );

  return (
    <div
      className="relative w-full overflow-hidden font-[Outfit]"
      style={{
        backgroundColor:
          colors[style.background.color as keyof typeof colors],
      }}
    >
      <Swiper
        modules={[Autoplay, Mousewheel]}
        slidesPerView="auto"
        spaceBetween={style.background.margin || 12}
        loop
        speed={40000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        allowTouchMove
        mousewheel={{
          forceToAxis: true,
          releaseOnEdges: true,
          sensitivity: 0.6,
        }}
        grabCursor
        className="w-full"
      >
        {images.map((img) => (
          <SwiperSlide
            key={img._id}
            className="!w-auto"
            onMouseEnter={() => setHoveredImageId(img._id)}
            onMouseLeave={() => setHoveredImageId(null)}
          >
            <div
              className="relative flex-shrink-0"
              style={{
                ...getBackgroundStyles(style.background, colors),
              }}
            >
              <img
                src={img.url}
                alt={img.description || "Image"}
                className="object-cover cursor-pointer w-full h-full rounded-md"
                style={{
                  ...getBorderStyles(style.background.border, colors),
                }}
                onClick={() => setPopupImage(img)}
              />

              {hoveredImageId === img._id && (
                <>
                  {/* Hover Content */}
                  <div className="absolute inset-0 z-20">
                    {style.hover.descriptionText.show && (
                      <div
                        className="absolute bottom-0 left-0 w-full text-center px-3 py-2"
                        style={{
                          ...getTextStyles(
                            style.hover.descriptionText.style,
                            fonts,
                            colors
                          ),
                        }}
                      >
                        {img.description || "No description"}
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        className="min-h-[30px] z-30 hover:scale-105"
                        style={{
                          ...getBackgroundStyles(
                            style.hover.viewButton.background,
                            colors
                          ),
                          ...getTextStyles(
                            style.hover.viewButton.text,
                            fonts,
                            colors
                          ),
                        }}
                        onClick={() => setPopupImage(img)}
                      >
                        View
                      </button>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      backgroundColor: style.hover.background.color,
                      opacity: style.hover.background.opacity,
                      ...getBorderStyles(style.background.border, colors),
                    }}
                  />
                </>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Popup Viewer */}
      {popupImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative lg:max-w-[60%] max-h-[70%]">
            <button
              onClick={() => setPopupImage(null)}
              className="absolute top-2 right-2 z-50 bg-black text-white rounded-full p-2 hover:scale-105"
            >
              <IoMdClose size="3vh" />
            </button>

            <img
              src={popupImage.url}
              alt="Zoomed"
              className="max-w-full max-h-[60vh] object-cover rounded-md"
            />

            {popupImage.description && (
              <div
                className="absolute bottom-5 w-full text-center"
                style={{
                  ...getTextStyles(
                    style.hover.descriptionText,
                    fonts,
                    colors
                  ),
                }}
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
