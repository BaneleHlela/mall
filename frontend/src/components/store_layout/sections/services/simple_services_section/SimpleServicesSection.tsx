import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { getGridColumnClasses } from '../../gallery/gallery_with_grouped_images/SingleGroupImages';
import ServiceCardWithImage from '../../../extras/cards/service/with_image/ServiceCardWithImage';
import CategorySelector from '../../../extras/category_selector/CategorySelector';
import { useState, useRef } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import UnderlinedText from '../../../extras/text/UnderlinedText';
import { useNavigate } from 'react-router-dom';
import { useStoreButtonClickHandler } from '../../../extras/buttons/useStoreButtonClickHandler';
import StoreTextTag from '../../../shared_layout_components/StoreTextTag';
import StoreDivTag from '../../../shared_layout_components/StoreDivTag';
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
  const swiperRef = useRef<SwiperRef | null>(null);

  const totalGroups = Math.ceil(services.length / visibleCount);
  const startIdx = 0 * visibleCount;
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

  // Group services into slides for Swiper
  const slides: typeof services[] = [];
  for (let i = 0; i < services.length; i += visibleCount) {
    let slideServices = services.slice(i, i + visibleCount);
    // Pad the last slide if needed
    if (slideServices.length < visibleCount && services.length > 0) {
      const needed = visibleCount - slideServices.length;
      const padding = services.slice(0, needed);
      slideServices = [...slideServices, ...padding];
    }
    slides.push(slideServices);
  }


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
          settings.categoryDivider?.show && store?.categories?.services?.length !== 0 ? (
            // Horizontal with Category Dividers
            ((selectedCategory && selectedCategory !== 'all') ? [selectedCategory] : store?.categories?.services || [])?.map((category: string) => {
              const categoryServices = selectedCategory && selectedCategory !== 'all' 
                ? services.filter(service => service.category === selectedCategory)
                : services.filter(service => service.category === category);
            
              if (categoryServices.length === 0) return null;

              const categoryDividerStyle = getTextStyles(settings.categoryDivider, fonts, colors);

              // Group category services into slides for Swiper
              const categorySlides: typeof categoryServices[] = [];
              for (let i = 0; i < categoryServices.length; i += visibleCount) {
                let slideServices = categoryServices.slice(i, i + visibleCount);
                if (slideServices.length < visibleCount && categoryServices.length > 0) {
                  const needed = visibleCount - slideServices.length;
                  const padding = categoryServices.slice(0, needed);
                  slideServices = [...slideServices, ...padding];
                }
                categorySlides.push(slideServices);
              }

              return (
                <div key={category} className="w-full">
                  <p style={{ ...categoryDividerStyle }} className="capitalize">
                    {category}
                  </p>
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
                      {categorySlides.map((slide, slideIndex) => (
                        <SwiperSlide key={slideIndex}>
                          <div
                            className="w-full flex gap-4 justify-center"
                            style={{
                              gap: getResponsiveDimension(settings.grid.gap),
                              ...getBackgroundStyles(settings.grid.container.background, colors)
                            }}
                          >
                            {slide.map((service) => (
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
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {/* Custom Navigation Buttons */}
                    <div className="absolute bottom-0 right-0 flex items-center gap-1 z-20 font-semibold">
                      <button 
                        onClick={() => swiperRef.current?.swiper.slidePrev()}
                        className="flex items-center px-2 py-1 text-sm"
                      >
                        <MdOutlineKeyboardArrowLeft />
                        <p className="mb-[.1vh]">Prev</p>
                      </button>
                      <div style={{backgroundColor: colors[settings.text.heading.color as keyof typeof colors]}} className="h-5 w-[.2vh]"></div>
                      <button 
                        onClick={() => swiperRef.current?.swiper.slideNext()}
                        className="flex items-center px-2 py-1 text-sm"
                      >
                       
                       <p className="mb-[.15vh]">Next</p>
                       <MdOutlineKeyboardArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // Horizontal without Category Dividers
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
                        gap: getResponsiveDimension(settings.grid.gap),
                        ...getBackgroundStyles(settings.grid.container.background, colors)
                      }}
                    >
                      {slide.map((service, index) => (
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
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Custom Navigation Buttons */}
              <div className="absolute bottom-0 right-0 flex items-center gap-1 z-20 font-semibold">
                <button 
                  onClick={() => swiperRef.current?.swiper.slidePrev()}
                  className="flex items-center px-2 py-1 text-sm"
                >
                  <MdOutlineKeyboardArrowLeft />
                  <p className="mb-[.1vh]">Prev</p>
                </button>
                <div style={{backgroundColor: colors[settings.text.heading.color as keyof typeof colors]}} className="h-5 w-[.2vh]"></div>
                <button 
                  onClick={() => swiperRef.current?.swiper.slideNext()}
                  className="flex items-center px-2 py-1 text-sm"
                >
                 
                 <p className="mb-[.15vh]">Next</p>
                 <MdOutlineKeyboardArrowRight />
                </button>
              </div>
            </div>
          )
        ) : (
          // Vertical (grid layout)
          settings.categoryDivider?.show && store?.categories?.services?.length !== 0 ? (
            // Vertical with Category Dividers
            ((selectedCategory && selectedCategory !== 'all') ? [selectedCategory] : store?.categories?.services || [])?.map((category: string) => {
              const categoryServices = selectedCategory && selectedCategory !== 'all' 
                ? services.filter(service => service.category === selectedCategory)
                : services.filter(service => service.category === category);
              if (categoryServices.length === 0) return null;

              const categoryDividerStyle = getTextStyles(settings.categoryDivider, fonts, colors);

              return (
                <div key={category} className="w-full">
                  <p style={{ ...categoryDividerStyle }} className="capitalize">
                    {category} here
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
