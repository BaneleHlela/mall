import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface SlidingPostersProps {
    imageUrl: string[];
    color?: string;
}
const SlidingPosters: React.FC<SlidingPostersProps> = ({
    imageUrl,
    color = "#fef3c71a"
}) => {
  // If there's only one image, use the original single poster display
  if (imageUrl.length === 1) {
    return (
      <div 
          style={{
              backgroundColor: color,
          }}
          className='relative flex flex-col items-center justify-evenly w-full aspect-square'
      >
          <div className="h-[4%] w-[60%] flex items-center justify-between px-[.6vh]">
              <div className="h-full w-[.1vh] bg-gray-700"></div>
                  <div className="h-[.1vh] w-[35%] bg-gray-700"></div>
                  <p className="text-[1.3vh]">50cm</p>
                  <div className="h-[.1vh] w-[35%] bg-gray-700"></div>
              <div className="h-full w-[.1vh] bg-gray-700"></div>
          </div>
          <img 
              src={imageUrl[0]} 
              alt="Sliding Poster" 
              className='w-[50%] h-fit object-cover z-1 shadow-[0px_0px_46px_0px_rgba(0,_0,_0,_0.1)] bg-[#ffffff1a]' 
          />
          <img
              src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Physical-Poster-BG-image.jpg"
              alt="Poster Frame"
              className='absolute inset-0 w-full h-full object-cover pointer-events-none opacity-5'
          />
          <p className="scale-80 text-gray-800">PHYSICAL POSTER</p>
      </div>
    )
  }

  // Multiple posters - use swiper carousel with multiple visible slides
  return (
    <div 
        style={{
            backgroundColor: color,
        }}
        className='relative flex flex-col items-center justify-evenly w-full aspect-square'
    >
        <div className="h-[4%] w-[60%] flex items-center justify-between px-[.6vh]">
            <div className="h-full w-[.1vh] bg-gray-700"></div>
                <div className="h-[.1vh] w-[35%] bg-gray-700"></div>
                <p className="text-[1.3vh]">50cm</p>
                <div className="h-[.1vh] w-[35%] bg-gray-700"></div>
            <div className="h-full w-[.1vh] bg-gray-700"></div>
        </div>
        
        {/* Poster Images - Sliding from left to right with multiple visible */}
        <div className="w-full h-[70%] mt-[10%] flex items-center justify-center">
            <Swiper
                slidesPerView={2}
                spaceBetween={0}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-full"
            >
                {imageUrl.map((url, index) => (
                    <SwiperSlide key={index} className="flex items-center justify-center">
                        <img 
                            src={url} 
                            alt={`Sliding Poster ${index + 1}`} 
                            className='w-[80%] aspect-[1/1.414] object-cover z-1 shadow-[0px_0px_46px_0px_rgba(0,_0,_0,_0.1)] bg-[#ffffff1a]' 
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        
        {/* Background Image */}
        <img
            src="https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Physical-Poster-BG-image.jpg"
            alt="Poster Frame"
            className='absolute inset-0 w-full h-full object-cover pointer-events-none opacity-5'
        />
        <p className="scale-80 text-gray-800">PHYSICAL POSTER</p>
    </div>
  )
}

export default SlidingPosters;
