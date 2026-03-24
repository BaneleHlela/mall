import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { getGridColumnClasses } from '../../gallery/gallery_with_grouped_images/SingleGroupImages';
import ServiceCardWithImage from '../../../extras/cards/service/with_image/ServiceCardWithImage';
import CategorySelector from '../../../extras/category_selector/CategorySelector';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import UnderlinedText from '../../../extras/text/UnderlinedText';
import { useNavigate } from 'react-router-dom';
import { useStoreButtonClickHandler } from '../../../extras/buttons/useStoreButtonClickHandler';
import StoreTextTag from '../../../shared_layout_components/StoreTextTag';
import StoreDivTag from '../../../shared_layout_components/StoreDivTag';

const SimpleServicesSection = () => {
  const navigate = useNavigate();
  const settings = useAppSelector((state) => state.layoutSettings.sections.services);
  const services = useAppSelector((state) => state.services.services);
  const selectedCategory = useAppSelector((state) => state.categories.selectedCategory);
  const store = useAppSelector((state) => state.stores.currentStore);
  const layoutId = useAppSelector((state) => state.layoutSettings._id);
  const colors = useAppSelector((state) => state.layoutSettings.colors);
  const fonts = useAppSelector((state) => state.layoutSettings.fonts);
  const handleButtonClick = useStoreButtonClickHandler();
  const routes = useAppSelector((state) => state.layoutSettings.routes);

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

  const handleServiceButtonClick = (serviceSlug: string) => {
    const currentUrl = window.location.href;

    if (currentUrl.includes('layouts')) {
      navigate(`/layouts/${layoutId}/preview/service/${serviceSlug}#book`);
    } else if (store && store.slug) {
      navigate(`/stores/${store.slug}/service/${serviceSlug}#book`);
    } else {
      console.error('Store ID is not available');
    }
  };
  

  const isMobile = window.innerWidth < 768;
  const isHorizontal = (isMobile && settings.grid.container.stack.mobile === "horizontal") || (!isMobile && settings.grid.container.stack.desktop === "horizontal");

  const handleNext = () => {
    setDirection("right");
    setActiveGroupIndex((prev) => (prev + 1) % totalGroups);
  };

  const handlePrev = () => {
    setDirection("left");
    setActiveGroupIndex((prev) => (prev === 0 ? totalGroups - 1 : prev - 1));
  };

  return (
    <StoreDivTag
      style={settings.background}
      jsx={
      <div
          id="services"
          style={getBackgroundStyles(settings.background, colors)}
          className='flex flex-col justify-between w-full h-full min-h-fit'
      >
          {/* Heading & Subheading */}
          <div 
              className='w-full mb-4'
          >   
              {/* Heading + Subheading */}
              <div className="w-full">
                <StoreTextTag style={settings.text.heading}  />
                
                {settings.text.subheading.input && (
                  <StoreTextTag style={settings.text.subheading} />
                )}
              </div>
          </div>

        {store?.categories?.services && settings.categorySelector.show && (
          <div className="w-full pb-4 flex flex-row justify-center">
            <CategorySelector categories={store.categories?.services} style={settings.categorySelector} />
          </div>
        )}

        {/* Services Content - with Category Dividers */}
        {isHorizontal ? (
          settings.categoryDivider?.show && store?.categories?.services ? (
            // Horizontal with Category Dividers
            ((selectedCategory && selectedCategory !== 'all') ? [selectedCategory] : store?.categories?.services || [])?.map((category: string) => {
              const categoryServices = selectedCategory && selectedCategory !== 'all' 
                ? services.filter(service => service.category === selectedCategory)
                : services.filter(service => service.category === category);
            
              if (categoryServices.length === 0) return null;

              const categoryDividerStyle = getTextStyles(settings.categoryDivider, fonts, colors);

              return (
                <div key={category} className="w-full">
                  <p style={{ ...categoryDividerStyle }} className="capitalize">
                    {category}
                  </p>
                  <div className="w-full relative flex flex-col items-center overflow-hidden">
                    {/* Navigation Buttons */}
                    <div className="flex justify-between absolute top-1/2 w-full z-10">
                      <button
                          style={{
                              ...getBackgroundStyles(settings.grid.container.toggleButtons.background, colors),
                              ...getTextStyles(settings.grid.container.toggleButtons, fonts, colors),
                          }}
                          onClick={handlePrev}
                      >
                          <MdOutlineKeyboardArrowLeft />
                      </button>
                      <button
                          style={{
                              ...getBackgroundStyles(settings.grid.container.toggleButtons.background, colors),
                              ...getTextStyles(settings.grid.container.toggleButtons, fonts, colors),
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
                            ...getBackgroundStyles(settings.grid.container.background, colors)
                          }}
                        >
                          {categoryServices.slice(0, visibleCount).map((service) => (
                            <ServiceCardWithImage
                              key={service._id}
                              title={service.name}
                              duration={service.duration}
                              description={service.description}
                              imageUrl={service.images?.[0] || ".placeholder-image.png"}
                              price={service.price}
                              style={settings.card}
                              onClick={() =>
                                settings.card.textAndButton.button.function === 'book'
                                  ? handleServiceButtonClick(service.slug || "")
                                  : handleButtonClick({
                                      type: settings.card.textAndButton.button.function,
                                      routes: routes,
                                      contactNumber: store?.contact.phone,
                                      storeSlug: store?.slug || '',
                                      contactEmail: store?.contact.email || '',
                                  })
                              }
                            />
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Horizontal without Category Dividers
            <div className="w-full relative flex flex-col items-center overflow-hidden">
            {/* Navigation Buttons */}
            <div className="flex justify-between absolute top-1/2 w-full z-10">
              <button
                  style={{
                      ...getBackgroundStyles(settings.grid.container.toggleButtons.background, colors),
                      ...getTextStyles(settings.grid.container.toggleButtons, fonts, colors),
                  }}
                  onClick={handlePrev}
              >
                  <MdOutlineKeyboardArrowLeft
              />
              </button>
              <button
                  style={{
                      ...getBackgroundStyles(settings.grid.container.toggleButtons.background, colors),
                      ...getTextStyles(settings.grid.container.toggleButtons, fonts, colors),
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
                    ...getBackgroundStyles(settings.grid.container.background, colors)
                  }}
                >
                  {currentGroup.map((service, index) => (
                    <ServiceCardWithImage
                      key={service._id}
                      title={service.name}
                      duration={service.duration}
                      description={service.description}
                      imageUrl={service.images?.[0] || ".placeholder-image.png"}
                      price={service.price}
                      style={settings.card}
                      onClick={() =>
                        settings.card.textAndButton.button.function === 'book'
                          ? handleServiceButtonClick(service.slug || "")
                          : handleButtonClick({
                              type: settings.card.textAndButton.button.function,
                              routes: routes, //@ts-ignore-next-line
                              contactNumber: store?.contact.phone,
                              storeSlug: store?.slug || '',
                              contactEmail: store?.contact.email || '',  
                          })
                      }
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Position Info */}
            {settings.grid.container.stepIndicator.use === 'digits' && (
              <div
                style={{
                  ...getTextStyles(settings.grid.container.stepIndicator.text, fonts, colors),
                }}
                className="mt-4 text-sm text-black"
              >
                {services.length > 0 && (() => {
                  const start = activeGroupIndex * visibleCount + 1;
                  const end = Math.min(start + visibleCount - 1, services.length);
                  return start === end
                    ? `${start} / ${services.length}`
                    : `${start}–${end} / ${services.length}`;
                })()}
              </div>
            )}

            {/* Dots */}
            {settings.grid.container.stepIndicator.use === 'dots' && (
              <div className="mt-4 flex gap-2 p-[1.8vh]">
                {Array.from({ length: totalGroups }).map((_, index) => (
                  <span
                    key={index}
                    style={{
                      ...getBackgroundStyles(settings.grid.container.stepIndicator.background, colors),
                      width: getResponsiveDimension(settings.grid.container.stepIndicator.background.height),
                      backgroundColor:
                        index === activeGroupIndex
                          ? settings.grid.container.stepIndicator.background.color
                          : 'transparent',
                    }}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === activeGroupIndex ? 'scale-105' : ''
                    }`}
                  />
                ))}
              </div>
            )}
            </div>
          )
        ) : (
          // Vertical (grid layout)
          settings.categoryDivider?.show && store?.categories?.services ? (
            // Vertical with Category Dividers
            ((selectedCategory && selectedCategory !== 'all') ? [selectedCategory] : store?.categories?.services || [])?.map((category: string) => {
              const categoryServices = selectedCategory && selectedCategory !== 'all' 
                ? services.filter(service => service.category === selectedCategory)
                : services.filter(service => service.category === category);
              if (categoryServices.length === 0) return null;
              console.log(categoryServices)

              const categoryDividerStyle = getTextStyles(settings.categoryDivider, fonts, colors);

              return (
                <div key={category} className="w-full">
                  <p style={{ ...categoryDividerStyle }} className="capitalize">
                    {category}
                  </p>
                  <div
                    className={`w-full flex flex-row ${
                      settings.grid.container.background.position === "center" ? "justify-center" :
                      settings.grid.container.background.position === "start" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      style={{
                        ...getBackgroundStyles(settings.grid.container.background, colors),
                        gap: getResponsiveDimension(settings.grid.gap)
                      }}
                      className={`grid px-1 ${getGridColumnClasses({
                        mobile: settings.grid.columns.mobile,
                        desktop: settings.grid.columns.desktop,
                      })}`}
                    >
                      {categoryServices.map((service) => (
                        <ServiceCardWithImage
                          key={service._id}
                          title={service.name}
                          duration={service.duration}
                          description={service.description}
                          imageUrl={service.images?.[0] || ".placeholder-image.png"}
                          price={service.price}
                          style={settings.card}
                          onClick={() =>
                            settings.card.textAndButton.button.function === 'book'
                              ? handleServiceButtonClick(service.slug || "")
                              : handleButtonClick({
                                  type: settings.card.textAndButton.button.function,
                                  routes: routes,
                                  contactNumber: store?.contact.phone,
                                  storeSlug: store?.slug || '',
                                  contactEmail: store?.contact.email || '',
                              })
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Vertical without Category Dividers
            <div
            className={`w-full flex flex-row ${
              settings.grid.container.background.position === "center" ? "justify-center" :
              settings.grid.container.background.position === "start" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              style={{
                ...getBackgroundStyles(settings.grid.container.background, colors),
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
                  imageUrl={service.images?.[0] || ".placeholder-image.png"}
                  price={service.price}
                  style={settings.card}
                  onClick={() =>
                    settings.card.textAndButton.button.function === 'book'
                      ? handleServiceButtonClick(service.slug || "")
                      : handleButtonClick({
                          type: settings.card.textAndButton.button.function,
                          routes: routes, //@ts-ignore-next-line
                          contactNumber: store?.contact.phone,
                          storeSlug: store?.slug || '',
                          contactEmail: store?.contact.email || '',  
                      })
                  }
                />
              ))}
            </div>
          </div>
          )
        )}
      </div>
      }
      />
  );
};

export default SimpleServicesSection;
