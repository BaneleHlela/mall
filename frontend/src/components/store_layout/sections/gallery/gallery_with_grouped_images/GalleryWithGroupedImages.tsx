import React, { useRef, useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import SingleGroupImages, { getGridColumnClasses } from './SingleGroupImages';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import UnderlinedText from '../../../extras/text/UnderlinedText';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import StoreTextTag from '../../../shared_layout_components/StoreTextTag';

interface GalleryGroup {
  input: string;
  description: string;
  thumbnail: string[];
  images: string[];
}

const GalleryWithGroupedImages = () => {
   const settings = useAppSelector((state) => state.layoutSettings.sections.gallery);
   const colors = useAppSelector((state) => state.layoutSettings.colors);
   const groups: Record<string, GalleryGroup> = settings.imagesModal.images;
  const swiperRef = useRef<SwiperRef | null>(null);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const stack = settings.imagesModal.grids.thumbnail.stack;
  const isMobile = window.innerWidth < 768;
  const isHorizontal = (isMobile && stack.mobile === 'horizontal') || (!isMobile && stack.desktop === 'horizontal');

  const allGroups = Object.entries(groups);
  const visibleCount = isMobile
    ? settings.imagesModal.grids.thumbnail.columns.mobile
    : settings.imagesModal.grids.thumbnail.columns.desktop;

  // Group groups into slides for Swiper
  const slides: typeof allGroups[] = [];
  for (let i = 0; i < allGroups.length; i += visibleCount) {
    slides.push(allGroups.slice(i, i + visibleCount));
  }

  const toggleLike = (url: string) => {
      setLikedImages(prev => {
      const next = new Set(prev);
      next.has(url) ? next.delete(url) : next.add(url);
      return next;
      });
  };


  return (
    <div id="gallery" style={getBackgroundStyles(settings.background)} className='min-h-fit'>
      {/* Heading & Subheading */}
      <div 
            className='w-full mb-4'
        >   
            {/* Heading + Subheading */}
            <div className="w-full">
              <StoreTextTag style={settings.text.heading} />
              
              {settings.text.subheading.input && (
                <div className='lg:max-w-[50%]'> 
                  <UnderlinedText style={settings.text.subheading} />
                </div>
                
              )}
            </div>
      </div>
      
      {/* Stack Layouts */}
      {isHorizontal ? (
        <div
          className="relative w-full"
          style={{ // @ts-ignore
            '--swiper-pagination-color': colors[settings.text.heading.color as keyof typeof colors],
            '--swiper-pagination-bullet-inactive-color': colors[settings.text.heading.color as keyof typeof colors] + '55',
            '--swiper-navigation-color': colors[settings.text.heading.color as keyof typeof colors],
          }}
        >
          <Swiper
            ref={swiperRef}
            modules={[ Autoplay , Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={15}
            grabCursor={true}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            pagination={false}
            className="z-10"
            autoplay={{
              delay: 3000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
          >
            {slides.map((slide, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                <div
                  className="w-full flex gap-4 justify-center"
                  style={{
                    gap: getResponsiveDimension(settings.imagesModal.grids.thumbnail.gap),
                    ...getBackgroundStyles(settings.imagesModal.grids.thumbnail.background, colors),
                  }}
                >
                  {slide.map(([groupKey, groupData]) => (
                    <SingleGroupImages
                      key={groupKey}
                      groupName={groupData.input}
                      groupDescrition={groupData.description}
                      thumbnail={groupData.thumbnail}
                      descriptionTextStyle={settings.text.groupDescription}
                      images={groupData.images}
                      textStyle={settings.text.groupName}
                      style={settings.imagesModal}
                      likedImages={likedImages}
                      toggleLike={toggleLike}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Navigation Buttons */}
          <div className="absolute bottom-0 right-0 flex items-center gap-1 z-20 font-semibold">
            <button 
              onClick={() => swiperRef.current?.swiper.slidePrev()}
              className="flex items-center px-2 py-1 text-sm"
            >
              <MdArrowBackIos />
              <p className="mb-[.1vh]">Prev</p>
            </button>
            <div style={{backgroundColor: colors[settings.text.heading.color as keyof typeof colors]}} className="h-5 w-[.2vh]"></div>
            <button 
              onClick={() => swiperRef.current?.swiper.slideNext()}
              className="flex items-center px-2 py-1 text-sm"
            >
             
             <p className="mb-[.15vh]">Next</p>
             <MdArrowForwardIos />
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            gap: getResponsiveDimension(settings.imagesModal.grids.thumbnail.gap),
          }}
          className={`grid px-1 ${getGridColumnClasses({
            mobile: settings.imagesModal.grids.thumbnail.columns.mobile,
            desktop: settings.imagesModal.grids.thumbnail.columns.desktop,
          })}
          ${settings.imagesModal.grids.thumbnail.columns.desktop === 2 && 'lg:grid-cols-2'}`}
        >
          {allGroups.map(([groupKey, groupData]) => (
            <SingleGroupImages
              key={groupKey}
              groupName={groupData.input}
              groupDescrition={groupData.description}
              thumbnail={groupData.thumbnail}
              images={groupData.images}
              textStyle={settings.text.groupName}
              descriptionTextStyle={settings.text.groupDescription}
              style={settings.imagesModal}
              likedImages={likedImages}
              toggleLike={toggleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryWithGroupedImages;
