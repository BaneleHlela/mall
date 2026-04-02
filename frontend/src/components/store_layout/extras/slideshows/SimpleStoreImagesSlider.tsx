import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import { getBackgroundStyles } from '../../../../utils/stylingFunctions';
import { useAppSelector } from '../../../../app/hooks';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  const colors = useAppSelector((state) => state.layoutSettings.colors);

  if (!images || images.length === 0) {
    return (
      <div 
        style={{
          height: height,
          width: width,
          ...getBackgroundStyles(style || {}, colors),
        }}
        className="relative overflow-hidden bg-gray-200 flex items-center justify-center"
      >
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div 
      style={{
        height: height,
        width: width,
        ...getBackgroundStyles(style || {}, colors),
      }}
      className="relative overflow-hidden"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={false}
        pagination={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={images.length > 1}
        className="w-full h-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimpleStoreImagesSlider;
