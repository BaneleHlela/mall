import React, { useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import SingleGroupImages, { getGridColumnClasses } from './SingleGroupImages';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

interface GalleryGroup {
  input: string;
  description: string;
  thumbnail: string[];
  images: string[];
}

const GalleryWithGroupedImages = () => {
  const settings = useAppSelector((state) => state.layoutSettings.gallery);
  const groups: Record<string, GalleryGroup> = settings.imagesModal.images;

  const stack = settings.imagesModal.grids.thumbnail.stack;
  const isMobile = window.innerWidth < 768;
  const isHorizontal = (isMobile && stack.mobile === 'horizontal') || (!isMobile && stack.desktop === 'horizontal');

  const allGroups = Object.entries(groups);
  const visibleCount = isMobile
    ? settings.imagesModal.grids.thumbnail.columns.mobile
    : settings.imagesModal.grids.thumbnail.columns.desktop;

  
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const handleNext = () => {
    setDirection('right');
    setActiveGroupIndex((prev) => (prev + 1) % totalGroups);
  };

  const handlePrev = () => {
    setDirection('left');
    setActiveGroupIndex((prev) => (prev === 0 ? totalGroups - 1 : prev - 1));
  };
  
    const totalGroups = Math.ceil(allGroups.length / visibleCount);
    const startIdx = activeGroupIndex * visibleCount;

    let currentGroup = allGroups.slice(startIdx, startIdx + visibleCount);

    if (currentGroup.length < visibleCount && allGroups.length > 0) {
        const needed = visibleCount - currentGroup.length;
        const padding = allGroups.slice(0, needed);
        currentGroup = [...currentGroup, ...padding];
    }

  return (
    <div style={getBackgroundStyles(settings.background)}>
      {/* Heading & Subheading */}
      <div className="w-full">
        <div
          className={`w-full flex flex-row ${
            settings.text.heading.position === 'center'
              ? 'justify-center'
              : settings.text.heading.position === 'start'
              ? 'justify-start'
              : 'justify-end'
          }`}
        >
          <h1 style={getTextStyles(settings.text.heading)}>
            {settings.text.heading.input}
          </h1>
        </div>

        {settings.text.subheading.input && (
          <div
            className={`w-full flex flex-row ${
              settings.text.subheading.position === 'center'
                ? 'justify-center'
                : settings.text.subheading.position === 'start'
                ? 'justify-start'
                : 'justify-end'
            }`}
          >
            <h1
              style={{
                ...getTextStyles(settings.text.subheading),
                ...getBackgroundStyles(settings.text.subheading.background),
                maxWidth: 'fit-content',
              }}
              className={`w-full ${
                settings.text.subheading.position === 'center'
                  ? 'text-center'
                  : settings.text.subheading.position === 'start'
                  ? 'text-start'
                  : 'text-end'
              }`}
            >
              {settings.text.subheading.input}
            </h1>
          </div>
        )}
      </div>

      {/* Stack Layouts */}
      {isHorizontal ? (
        <div className="w-full relative flex flex-col items-center overflow-hidden">
            {/* Navigation Buttons */}
            <div className="flex justify-between absolute top-1/2 w-full mb-4 z-1">
                <button 
                    style={{
                        ...getTextStyles(settings.imagesModal.toggleButtons),
                        ...getBackgroundStyles(settings.imagesModal.toggleButtons.background)
                    }}
                    onClick={handlePrev}
                >
                    <MdOutlineKeyboardArrowLeft
                />
                </button>
                <button 
                    style={{
                        ...getTextStyles(settings.imagesModal.toggleButtons),
                        ...getBackgroundStyles(settings.imagesModal.toggleButtons.background)
                    }}
                    onClick={handleNext}
                >
                    <MdOutlineKeyboardArrowRight/>
                </button>
            </div>

          {/* Cards */}
          <div className="w-full flex h-fit justify-center items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeGroupIndex}
                custom={direction}
                initial={{ x: direction === 'right' ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === 'right' ? -100 : 100, opacity: 0 }}
                transition={{ type: 'keyframes', stiffness: 300, damping: 30, duration: 0.5 }}
                className="w-full flex gap-4 justify-center"
                style={{
                  gap: getResponsiveDimension(settings.imagesModal.grids.thumbnail.gap),
                  ...getBackgroundStyles(settings.imagesModal.grids.thumbnail.background),
                }}
              >
                {currentGroup.map(([groupKey, groupData]) => (
                  <SingleGroupImages
                    key={groupKey}
                    groupName={groupData.input}
                    groupDescrition={groupData.description}
                    thumbnail={groupData.thumbnail}
                    images={groupData.images}
                    textStyle={settings.text.groupName}
                    style={settings.imagesModal}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Count */}
          <div className="mt-4 text-sm text-black">
            {allGroups.length > 0 && (() => {
              const start = activeGroupIndex * visibleCount + 1;
              const end = Math.min(start + visibleCount - 1, allGroups.length);
              return start === end
                ? `${start} / ${allGroups.length}`
                : `${start}–${end} / ${allGroups.length}`;
            })()}
          </div>

          {/* Dots */}
          <div className="mt-4 flex gap-2">
            {Array.from({ length: totalGroups }).map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === activeGroupIndex ? 'bg-black scale-125' : 'bg-gray-300'
                }`}
              />
            ))}
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
              style={settings.imagesModal}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryWithGroupedImages;
