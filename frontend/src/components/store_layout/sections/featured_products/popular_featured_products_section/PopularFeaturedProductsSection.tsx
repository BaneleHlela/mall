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
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AcceptingOrdersButton from '../../../extras/buttons/AcceptingOrdersButton';
import StoreLayoutButton from '../../../shared_layout_components/StoreLayoutButton';
import { useStoreButtonClickHandler } from '../../../extras/buttons/useStoreButtonClickHandler';
import StoreTextTag from '../../../extras/text/StoreTextTag';
import StoreDivTag from '../../../shared_layout_components/StoreDivTag';

const PopularFeaturedProductsSection = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const config = useAppSelector((state) => state.layoutSettings.sections.featuredProducts);
  const allProducts = useAppSelector((state) => state.products.products);
  const store = useAppSelector((state) => state.stores.currentStore);
  const { fonts, colors } = useAppSelector((state) => state.layoutSettings);
  const navigate = useNavigate();
  const handleButtonClick = useStoreButtonClickHandler();
  const routes = useAppSelector((state) => state.layoutSettings.routes);

  // Filter products based on selected product IDs and maintain order
  const productIds = config.productIds ? config.productIds : [];
  const featuredProducts = productIds.length > 0
    ? productIds.map((id: string) => allProducts.find(p => p._id === id)).filter(Boolean)
    : [];



  const isMobile = window.innerWidth < 768;
  const isHorizontal =
    (isMobile && config.stack.mobile === 'horizontal') ||
    (!isMobile && config.stack.desktop === 'horizontal');

  const visibleCount = isMobile ? config.grid.columns.mobile : config.grid.columns.desktop;

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
        ...getBackgroundStyles(config.background, colors),
      }}
      className="flex flex-col justify-between min-h-fit"
    >
      {/* Heading + Subheading */}
      <div className="w-full">
        <StoreTextTag 
          style={config.text.heading}
        />
        
        <StoreTextTag 
          style={config.text.subheading}
        />
      </div>
      {config.acceptingOrdersButton?.show && (
        <div className={`w-full flex flex-col justify-center 
          ${config.acceptingOrdersButton.position === "center" && "items-center"}
          ${config.acceptingOrdersButton.position === "end" && "items-end "}
          ${config.acceptingOrdersButton.position === "start" && "items-start"}
          mb-2 p-[1vh]`}>
          <AcceptingOrdersButton operationTimes={store?.operationTimes} manualStatus={store?.manualStatus} style={config.acceptingOrdersButton} />
      </div>
      )}
      {config.pickupOrDelivery?.show && (
        <div className={`w-full flex flex-col justify-center 
          ${config.pickupOrDelivery.position === "center" && "items-center"}
          ${config.pickupOrDelivery.position === "end" && "items-end"}
          ${config.pickupOrDelivery.position === "start" && "items-start"}
        mb-2`}>
          <StoreDivTag
            style={{...config.pickupOrDelivery.background, padding: { x: "0px", y: "0px"}}}
            jsx={
              <div
                style={{
                  padding: "0px",
                }} 
                className="flex">
                {/* Pickup */}
                <div 
                  style={{
                    ...getTextStyles(config.pickupOrDelivery, fonts, colors),
                    border: "none",
                    borderRight: `${config.pickupOrDelivery.background.border.width} ${config.pickupOrDelivery.background.border.style} ${colors[config.pickupOrDelivery.background.border.color as keyof typeof colors]}`,
                    width: "50%",
                    borderRadius: "0px",
                  }} className="w-1/2 h-full text-center bg-blue-100">Pickup</div>
                {/* Deliver */}
                <div
                  style={{
                      ...getTextStyles(config.pickupOrDelivery, fonts, colors),
                      border: "none",
                      borderLeft: `${config.pickupOrDelivery.background.border.width} ${config.pickupOrDelivery.background.border.style} ${colors[config.pickupOrDelivery.background.border.color as keyof typeof colors]}`,
                      width: "50%",
                      borderRadius: "0px",
                  }} className="w-1/2 h-full text-center">Deliver</div>
              </div>
            }
          />
        </div>
      )}

      {/* Category Selector */}
      {store?.categories?.products && config.categorySelector.show && (
        <div className="w-full pb-4 flex flex-row justify-center">
          <CategorySelector
            categories={store?.categories?.products || []}
            style={config.categorySelector}
          />
        </div>
      )}
      
      {/* Horizontal (swiper) */}
      {isHorizontal ? (
        <div
          style={{
            '--swiper-pagination-color': colors[config.text.heading.color as keyof typeof colors],
            '--swiper-pagination-bullet-inactive-color': colors[config.text.heading.color as keyof typeof colors] + "55",
            '--swiper-navigation-color': colors[config.text.heading.color as keyof typeof colors],
            ...getBackgroundStyles(config.grid.container.background, colors),
          }}
          className="relative w-full pl-2 h-fit border-y-2"
        >
          <Swiper
            ref={swiperRef}
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={visibleCount + (isMobile ? (config.grid.swiperOffset?.mobile ?? 0) : (config.grid.swiperOffset?.desktop ?? 0))}
            centeredSlides={false}
            spaceBetween={parseFloat(getResponsiveDimension(config.grid.gap))}
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
            {featuredProducts.map((product: any) => (
              <SwiperSlide key={product._id}>
                <PopularProductCard
                  title={product.name}
                  imageUrl={product.images[0]}
                  marking={product.marking}
                  price={product.price}
                  prices={product.prices}
                  style={config.card}
                  productId={product._id}
                  storeId={store?._id}
                  onClick={() => handleProductClick(product.slug)}
                />
                <div className="h-[25px] w-full"></div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Custom Navigation Buttons */}
            <div style={{color: colors[config.card.textAndButton.text.name.color as keyof typeof colors]}} className={`absolute bottom-0 right-0 flex items-center gap-1 z-20 ${featuredProducts.length === 1 && "hidden"}`}>
              <button 
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                className="flex items-center px-2 py-1 text-sm"
              >
                <MdArrowBackIos />
                <p className="mb-[.1vh]">Prev</p>
              </button>
              <div style={{backgroundColor: colors[config.text.heading.color as keyof typeof colors]}} className="h-5 w-[.2vh]"></div>
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
        // Vertical Grid
        <div
          className={`w-full flex flex-row ${
            config.grid.container.background.position === 'center'
              ? 'justify-center'
              : config.grid.container.background.position === 'start'
              ? 'justify-start'
              : 'justify-end'
          }`}
        >
          <div
            style={{
              ...getBackgroundStyles(config.grid.container.background, colors),
              gap: getResponsiveDimension(config.grid.gap),
              gridAutoRows: "1fr",
            }}
            className={`grid px-1 items-stretch ${getGridColumnClasses({
              mobile: config.grid.columns.mobile,
              desktop: config.grid.columns.desktop,
            })}`}
          >
            {featuredProducts.map((product: any) => (
              <PopularProductCard
                key={product._id}
                title={product.name}
                imageUrl={product.images[0]}
                price={product.price}
                prices={product.prices}
                marking={product.marking}
                style={config.card}
                productId={product._id}
                storeId={store?._id}
                onClick={() => handleProductClick(product.slug)}
              />
            ))}
          </div>
        </div>
      )}
      {/* View More Button (na) */}
      <div className={`flex
        ${config.showMoreButton?.background.placement.position === "center" && "justify-center"}
        ${config.showMoreButton?.background.placement.position === "start" && "justify-start"}
        ${config.showMoreButton?.background.placement.position === "end" && "justify-end"}
        mt-5 w-full
        `}>
          <StoreLayoutButton
            onClick={() =>
                handleButtonClick({
                    type: "shop",
                    routes,
                    storeSlug: store?.slug ?? '',
                    contactNumber: store?.contact?.phone,
                })
            }
            style={config.showMoreButton || {}}
          />
      </div>
    </div>
  );
};

export default PopularFeaturedProductsSection;
