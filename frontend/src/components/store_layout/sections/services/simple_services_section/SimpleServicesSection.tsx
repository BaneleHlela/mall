import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { getGridColumnClasses } from '../../gallery/gallery_with_grouped_images/SingleGroupImages';
import ServiceCardWithImage from '../../../extras/cards/service/with_image/ServiceCardWithImage';
import CategorySelector from '../../../extras/category_selector/CategorySelector';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { Settings } from 'lucide-react';

const SimpleServicesSection = () => {
  const settings = useAppSelector((state) => state.layoutSettings.services);
  const services = useAppSelector((state) => state.services.services);
  const store = useAppSelector((state) => state.stores.currentStore);

  const visibleCount = window.innerWidth < 768 ? settings.grid.columns.mobile : settings.grid.columns.desktop;
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const totalGroups = Math.ceil(services.length / visibleCount);
  const startIdx = activeGroupIndex * visibleCount;
  let currentGroup = services.slice(startIdx, startIdx + visibleCount);
  
  if (currentGroup.length < visibleCount && services.length > 0) {
    const needed = visibleCount - currentGroup.length;
    const padding = services.slice(0, needed);
    currentGroup = [...currentGroup, ...padding];
  }
  

  const isMobile = window.innerWidth < 768;
  const isHorizontal = (isMobile && settings.stack.mobile === "horizontal") || (!isMobile && settings.stack.desktop === "horizontal");

  const handleNext = () => {
    setDirection("right");
    setActiveGroupIndex((prev) => (prev + 1) % totalGroups);
  };

  const handlePrev = () => {
    setDirection("left");
    setActiveGroupIndex((prev) => (prev === 0 ? totalGroups - 1 : prev - 1));
  };

  return (
    <div 
        style={getBackgroundStyles(settings.background)}
        className='flex flex-col justify-between min-h-fit'
    >
        {/* Heading & Subheading */}
        <div 
            className='w-full'
        >   
            {/* Heading */}
            <div className={`w-full flex flex-row
                ${settings.text.heading.position === "center" && "justify-center"}
                ${settings.text.heading.position === "start" && "justify-start"}
                ${settings.text.heading.position === "end" && "justify-end"}
            `}>
                <h1 
                    style={{
                        ...getTextStyles(settings.text.heading),
                    }}
                    
                >
                    {settings.text.heading.input}
                </h1>
            </div>
            {/* Subheading */}
            {settings.text.subheading.input && (
                <div className={`w-full flex flex-row
                    ${settings.text.subheading.position === "center" && "justify-center"}
                    ${settings.text.subheading.position === "start" && "justify-start"}
                    ${settings.text.subheading.position === "end" && "justify-end"}
                `}>
                    <h1 
                        style={{
                            ...getTextStyles(settings.text.subheading),
                            ...getBackgroundStyles(settings.text.subheading.background),
                            maxWidth: "fit-content"
                        }}
                        className={`w-full
                            ${settings.text.subheading.position === "center" && "text-center"}
                            ${settings.text.subheading.position === "start" && "text-start"}
                            ${settings.text.subheading.position === "end" && "text-end"}
                        `}
                    >
                        {settings.text.subheading.input}
                    </h1>
                </div>
            )}
        </div>

      {store?.categories.services && settings.categorySelector.show && (
        <div className="w-full pb-4 flex flex-row justify-center">
          <CategorySelector categories={store.categories.services} style={settings.categorySelector} />
        </div>
      )}

      {isHorizontal ? (
        <div className="w-full relative flex flex-col items-center overflow-hidden">
          {/* Navigation Buttons */}
          <div className="flex justify-between absolute top-1/2 w-full z-10">
            <button 
                style={{
                    ...getTextStyles(settings.toggleButtons),
                    ...getBackgroundStyles(settings.toggleButtons.background)
                }}
                onClick={handlePrev}
            >
                <MdOutlineKeyboardArrowLeft
            />
            </button>
            <button 
                style={{
                    ...getTextStyles(settings.toggleButtons),
                    ...getBackgroundStyles(settings.toggleButtons.background)
                }}
                onClick={handleNext}
            >
                <MdOutlineKeyboardArrowRight/>
            </button>
          </div>

          {/* Animated Slide Group */}
          <div className="w-full flex h-fit justify-center items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeGroupIndex}
                custom={direction}
                initial={{ x: direction === "right" ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === "right" ? -100 : 100, opacity: 0 }}
                transition={{ type: "keyframes", stiffness: 300, damping: 30, duration: 0.5 }}
                className="w-full flex gap-4 justify-center"
                style={{
                  gap: getResponsiveDimension(settings.grid.gap),
                  ...getBackgroundStyles(settings.grid.container.background)
                }}
              >
                {currentGroup.map((service, index) => (
                  <ServiceCardWithImage
                    key={service._id}
                    title={service.name}
                    duration={service.duration}
                    description={service.description}
                    imageUrl={settings.card.image.urls[index]}
                    price={service.price}
                    style={settings.card}
                    onClick={() => console.log(`Clicked on service: ${service.name}`)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Position Info */}
          <div className="mt-4 text-sm text-black">
            {services.length > 0 && (() => {
              const start = activeGroupIndex * visibleCount + 1;
              const end = Math.min(start + visibleCount - 1, services.length);
              return start === end
                ? `${start} / ${services.length}`
                : `${start}–${end} / ${services.length}`;
            })()}
          </div>

          {/* Dots */}
          <div className="mt-4 flex gap-2">
            {Array.from({ length: totalGroups }).map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === activeGroupIndex ? "bg-black scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        // Vertical (grid layout)
        <div
          className={`w-full flex flex-row ${
            settings.grid.container.background.position === "center" ? "justify-center" :
            settings.grid.container.background.position === "start" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            style={{
              ...getBackgroundStyles(settings.grid.container.background),
              gap: getResponsiveDimension(settings.grid.gap)
            }}
            className={`grid px-1 ${getGridColumnClasses({
              mobile: settings.grid.columns.mobile,
              desktop: settings.grid.columns.desktop,
            })}`}
          >
            {services.map((service, index) => (
              <ServiceCardWithImage
                key={service._id}
                title={service.name}
                duration={service.duration}
                description={service.description}
                imageUrl={settings.card.image.urls[index]}
                price={service.price}
                style={settings.card}
                onClick={() => console.log(`Clicked on service: ${service.name}`)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleServicesSection;
