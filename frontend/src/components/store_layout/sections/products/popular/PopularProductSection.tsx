import React, { useRef } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { getGridColumnClasses } from '../../gallery/gallery_with_grouped_images/SingleGroupImages';
import CategorySelector from '../../../extras/category_selector/CategorySelector';
import PopularProductCard from '../../../extras/cards/product/popular/PopularProductCard';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UnderlinedText from '../../../extras/text/UnderlinedText';

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AcceptingOrdersButton from '../../../extras/buttons/AcceptingOrdersButton';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import StoreTextTag from '../../../extras/text/StoreTextTag';

const PopularProductsSection = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const settings = useAppSelector((state) => state.layoutSettings.sections.products);
  const products = useAppSelector((state) => state.products.products);
  const store = useAppSelector((state) => state.stores.currentStore);
  const colors = useAppSelector((state) => state.layoutSettings.colors);
  const fonts = useAppSelector((state) => state.layoutSettings.fonts);
  const selectedCategory = useAppSelector((state) => state.categories.selectedCategory);
  const navigate = useNavigate();


  const isMobile = window.innerWidth < 768;
  const isHorizontal =
    (isMobile && settings.stack.mobile === 'horizontal') ||
    (!isMobile && settings.stack.desktop === 'horizontal');

  const visibleCount = isMobile ? settings.grid.columns.mobile : settings.grid.columns.desktop;

  const handleProductClick = (productSlug: string) => {
    const currentUrl = window.location.href;

    if (currentUrl.includes('layouts')) {
      navigate(`/layouts/${store?.slug}/preview/product/${productSlug}#singleProduct`);
    } else if (store && store.slug) {
      navigate(`/stores/${store.slug}/product/${productSlug}#singleProduct`);
    } else {
      console.error('Store ID is not available');
    }
  };

  return (
    <div
      style={{
        ...getBackgroundStyles(settings.background, colors),
      }}
      className="flex flex-col justify-between min-h-fit"
    >
      {/* Heading + Subheading */}
      <div className="w-full">
        <StoreTextTag style={settings.text.heading} />
        
        {settings.text.subheading.input && (
          <StoreTextTag style={settings.text.subheading} />
        )}
      </div>
      {settings.acceptingOrdersButton?.show && (
        <div className={`w-full flex flex-col justify-center 
          ${settings.acceptingOrdersButton.position === "center" && "items-center"}
          ${settings.acceptingOrdersButton.position === "end" && "items-end"}
          ${settings.acceptingOrdersButton.position === "start" && "items-start"}
          mb-2 py-[1vh]`}>
          <AcceptingOrdersButton operationTimes={store?.operationTimes} manualStatus={store?.manualStatus} style={settings.acceptingOrdersButton} />
      </div>
      )}
      {settings.pickupOrDelivery?.show && (
        <div
          style={{
            ...getBackgroundStyles(settings.pickupOrDelivery.background, colors),
            padding: "0px"
          }} 
          className="flex w-[80%] lg:w-[30%] border overflow-hidden mb-10 lg:mb-15">
          {/* Pickup */}
          <div 
            style={{
              ...getBackgroundStyles(settings.pickupOrDelivery.background, colors),
              border: "none",
              borderRight: `${settings.pickupOrDelivery.background.border.width} ${settings.pickupOrDelivery.background.border.style} ${colors[settings.pickupOrDelivery.background.border.color as keyof typeof colors]}`,
              width: "50%",
              borderRadius: "0px",
            }} className="w-1/2 text-center bg-blue-100">Pickup</div>
          {/* Deliver */}
          <div
            style={{
                ...getBackgroundStyles(settings.pickupOrDelivery.background, colors),
                border: "none",
                borderLeft: `${settings.pickupOrDelivery.background.border.width} ${settings.pickupOrDelivery.background.border.style} ${colors[settings.pickupOrDelivery.background.border.color as keyof typeof colors]}`,
                width: "50%",
                borderRadius: "0px",
            }} className="w-1/2 text-center">Deliver</div>
        </div>
      )}

      {/* Category Selector */}
      {store?.categories?.products && settings.categorySelector.show && (
        <div className="w-full pb-4 flex flex-row justify-center">
          <CategorySelector
            categories={store?.categories?.products || []}
            style={settings.categorySelector}
          />
        </div>
      )}

      {/* Horizontal (swiper) */}
      {isHorizontal ? (
        settings.categoryDivider?.show && store?.categories?.products?.length !== 0 ? (
          // Horizontal with Category Dividers
          ((selectedCategory && selectedCategory !== 'all') ? [selectedCategory] : store?.categories?.products || [])?.map((category: string) => {
            const categoryProducts = selectedCategory && selectedCategory !== 'all'
              ? products.filter(product => product.category === selectedCategory)
              : products.filter(product => product.category === category);
            
            if (categoryProducts.length === 0) return null;


            // Group products into slides for Swiper
            const categorySlides: typeof categoryProducts[] = [];
            for (let i = 0; i < categoryProducts.length; i += visibleCount) {
              let slideProducts = categoryProducts.slice(i, i + visibleCount);
              if (slideProducts.length < visibleCount && categoryProducts.length > 0) {
                const needed = visibleCount - slideProducts.length;
                const padding = categoryProducts.slice(0, needed);
                slideProducts = [...slideProducts, ...padding];
              }
              categorySlides.push(slideProducts);
            }
            return (
              <div key={category} className="relative w-full">
                <StoreTextTag style={settings.categoryDivider} input={category}/>
                <div
                  style={{
                    '--swiper-pagination-color': colors[settings.text.heading.color as keyof typeof colors],
                    '--swiper-pagination-bullet-inactive-color': colors[settings.text.heading.color as keyof typeof colors] + "55",
                    '--swiper-navigation-color': colors[settings.text.heading.color as keyof typeof colors],
                    ...getBackgroundStyles(settings.grid.container.background, colors),
                  }}
                  className="w-full pl-2 h-fit border-y-2"
                >
                  <Swiper
                    ref={swiperRef}
                    modules={[Pagination, Navigation, Autoplay]}
                    slidesPerView={visibleCount}
                    spaceBetween={parseFloat(getResponsiveDimension(settings.grid.gap))}
                    grabCursor={true}
                    pagination={false}
                    navigation={{
                      prevEl: '.swiper-button-prev',
                      nextEl: '.swiper-button-next',
                    }}
                    autoplay={{
                      delay: 4000, 
                      disableOnInteraction: false, 
                      pauseOnMouseEnter: true, 
                    }}
                    className="z-10"
                  >
                    {categorySlides.map((slide, slideIndex) => (
                      <SwiperSlide key={slideIndex}>
                        <div className="flex gap-4 justify-center">
                          {slide.map((product) => (
                            <PopularProductCard
                              key={product._id}
                              title={product.name}
                              imageUrl={product.images[0]}
                              marking={product.marking}
                              price={product.price}
                              prices={product.prices}
                              style={settings.card}
                              productId={product._id}
                              storeId={store?._id}
                              onClick={() => handleProductClick(product.slug)}
                            />
                          ))}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {/* Custom Navigation Buttons */}
                  <div style={{color: colors[settings.card.textAndButton.text.name.color as keyof typeof colors]}} className={`absolute bottom-0 right-0 flex items-center gap-1 z-20 ${categorySlides.length === 1 && "hidden"}`}>
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
              </div>
            );
          })
        ) : (
          // Horizontal without Category Dividers
          <div
            style={{
              '--swiper-pagination-color': colors[settings.text.heading.color as keyof typeof colors],
              '--swiper-pagination-bullet-inactive-color': colors[settings.text.heading.color as keyof typeof colors] + "55",
              '--swiper-navigation-color': colors[settings.text.heading.color as keyof typeof colors],
              ...getBackgroundStyles(settings.grid.container.background, colors),
            }}
            className="relative w-full pl-2 h-fit border-y-2"
          >
            <Swiper
              ref={swiperRef}
              modules={[Pagination, Navigation, Autoplay]}
              slidesPerView={visibleCount}
              spaceBetween={parseFloat(getResponsiveDimension(settings.grid.gap))}
              grabCursor={true}
              pagination={false}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              autoplay={{
                delay: 4000, 
                disableOnInteraction: false, 
                pauseOnMouseEnter: true, 
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product._id}>
                  <PopularProductCard
                    title={product.name}
                    imageUrl={product.images[0]}
                    marking={product.marking}
                    price={product.price}
                    prices={product.prices}
                    style={settings.card}
                    productId={product._id}
                    storeId={store?._id}
                    onClick={() => handleProductClick(product.slug)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Navigation Buttons */}
            <div style={{color: colors[settings.card.textAndButton.text.name.color as keyof typeof colors]}} className={`absolute bottom-0 right-0 flex items-center gap-1 z-20 ${products.length === 1 && "hidden"}`}>
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
        )
      ) : (
        // Vertical (grid layout)
        settings.categoryDivider?.show && store?.categories?.products?.length !== 0 ? (
          // Vertical with Category Dividers
          ((selectedCategory && selectedCategory !== 'all') ? [selectedCategory] : store?.categories?.products || [])?.map((category: string) => {
            const categoryProducts = selectedCategory && selectedCategory !== 'all'
              ? products.filter(product => product.category === selectedCategory)
              : products.filter(product => product.category === category);
            if (categoryProducts.length === 0) return null;

            const categoryDividerStyle = getTextStyles(settings.categoryDivider, fonts, colors);

            return (
              <div key={category} className="w-full">
                <p style={{ ...categoryDividerStyle }} className="capitalize">
                  {category}
                </p>
                <div
                  className={`w-full flex flex-row ${
                    settings.grid.container.background.position === 'center' ? 'justify-center' :
                    settings.grid.container.background.position === 'start' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    style={{
                      ...getBackgroundStyles(settings.grid.container.background, colors),
                      gap: getResponsiveDimension(settings.grid.gap),
                      gridAutoRows: "1fr"
                    }}
                    className={`grid px-1 items-stretch ${getGridColumnClasses({
                      mobile: settings.grid.columns.mobile,
                      desktop: settings.grid.columns.desktop,
                    })}`}
                  >
                    {categoryProducts.map((product) => (
                      <PopularProductCard
                        key={product._id}
                        title={product.name}
                        imageUrl={product.images[0]}
                        price={product.price}
                        prices={product.prices}
                        marking={product.marking}
                        style={settings.card}
                        productId={product._id}
                        storeId={store?._id}
                        onClick={() => handleProductClick(product.slug)}
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
              settings.grid.container.background.position === 'center'
                ? 'justify-center'
                : settings.grid.container.background.position === 'start'
                ? 'justify-start'
                : 'justify-end'
            }`}
          >
            <div
              style={{
                ...getBackgroundStyles(settings.grid.container.background, colors),
                gap: getResponsiveDimension(settings.grid.gap),
                gridAutoRows: "1fr"
              }}
              className={`grid px-1 items-stretch ${getGridColumnClasses({
                mobile: settings.grid.columns.mobile,
                desktop: settings.grid.columns.desktop,
              })}`}
            >
              {products.map((product) => (
                <PopularProductCard
                  key={product._id}
                  title={product.name}
                  imageUrl={product.images[0]}
                  price={product.price}
                  prices={product.prices}
                  marking={product.marking}
                  style={settings.card}
                  productId={product._id}
                  storeId={store?._id}
                  onClick={() => handleProductClick(product.slug)}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PopularProductsSection;
