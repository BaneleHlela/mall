import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

/** Tailwind version of Swiper Cards Effect */
export default function MultipleLayoutsPost() {
  const images = [
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20120235.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20115934.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20120351.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20120156.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20120328.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20121222.png",
    "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/Screenshot%202025-12-08%20121535.png",
  ];

  return (
    <div className="flex flex-col w-full aspect-3/4 items-center">

      {/* Header text */}
      <div className="w-full bg-white font-normal py-2">
        Get extra poster designs from{" "}
        <a
          href="https://www.freepik.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Freepik
        </a>
        ! You get 2 unique posters after adding your store. Just send us a screenshot and your replacement content.
      </div>

      {/* Swiper Section */}
      <div className="flex items-center justify-center w-full h-[90%] bg-stone-200">
        <Swiper
          effect="cards"
          grabCursor={true}
          modules={[EffectCards]}
          className="w-[70%] h-[80%] my-[2vh]"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className="shadow-lg">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
