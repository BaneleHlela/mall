import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import SingleGroupImages, { getGridColumnClasses } from './SingleGroupImages';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import UnderlinedText from '../../../extras/text/UnderlinedText';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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


  return (
    <div id="gallery" style={getBackgroundStyles(settings.background)} className='min-h-fit'>
      {/* Heading & Subheading */}
      <div 
            className='w-full mb-4'
        >   
            {/* Heading + Subheading */}
            <div className="w-full">
              <UnderlinedText style={settings.text.heading} />
              
              {settings.text.subheading.input && (
                <UnderlinedText style={settings.text.subheading} />
              )}
            </div>
      </div>
      
      {/* Stack Layouts */}
      {isHorizontal ? (
        <div
          className="w-full"
          style={{ // @ts-ignore
            '--swiper-pagination-color': colors[settings.text.heading.color as keyof typeof colors],
            '--swiper-pagination-bullet-inactive-color': colors[settings.text.heading.color as keyof typeof colors] + '55',
            '--swiper-navigation-color': colors[settings.text.heading.color as keyof typeof colors],
          }}
        >
          <Swiper
            modules={[ Autoplay , Navigation]}
            slidesPerView={1}
            spaceBetween={15}
            grabCursor={true}
            navigation={true}
            className=""
            autoplay={{
              delay: 3000, 
              disableOnInteraction: false,
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
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryWithGroupedImages;
