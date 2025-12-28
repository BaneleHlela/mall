import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

/** Tailwind version of Swiper Cards Effect */
export default function MultipleLayoutsPost() {
  const images = [
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20103329.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20103746.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20104407.png"
  ];

  return (
    <div className="flex flex-col w-full aspect-3/4 items-center">

      {/* Header text */}
      <div className="w-full bg-white font-normal py-1">
        Design multiple layouts for your store, tailor some for seasonal campaigns, and effortlessly track their performance.
      </div>

      {/* Swiper Section */}
      <div className="flex items-center justify-center w-full h-[90%] bg-[#f9d195]">
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards]}
          className="w-[70%] h-[80%] my-[2vh]"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className="rounded-lg">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
