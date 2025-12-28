import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { getGridColumnClasses } from '../../gallery/gallery_with_grouped_images/SingleGroupImages';
import CategorySelector from '../../../extras/category_selector/CategorySelector';
import PopularProductCard from '../../../extras/cards/product/popular/PopularProductCard';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UnderlinedText from '../../../extras/text/UnderlinedText';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const PopularProductsSection = () => {
  const settings = useAppSelector((state) => state.layoutSettings.sections.products);
  const products = useAppSelector((state) => state.products.products);
  const store = useAppSelector((state) => state.stores.currentStore);
  const colors = useAppSelector((state) => state.layoutSettings.colors);
  const navigate = useNavigate();


  const isMobile = window.innerWidth < 768;
  const isHorizontal =
    (isMobile && settings.stack.mobile === 'horizontal') ||
    (!isMobile && settings.stack.desktop === 'horizontal');

  const visibleCount = isMobile ? settings.grid.columns.mobile : settings.grid.columns.desktop;

  const handleProductClick = (productSlug: string) => {
    const currentUrl = window.location.href;

    if (currentUrl.includes('layouts')) {
      navigate(`/layouts/${store?.slug}/preview/product/${productSlug}`);
    } else if (store && store.slug) {
      navigate(`/stores/${store.slug}/product/${productSlug}`);
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
        <UnderlinedText style={settings.text.heading} />
        
        {settings.text.subheading.input && (
          <UnderlinedText style={settings.text.subheading} />
        )}
      </div>

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
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={visibleCount}
            spaceBetween={parseFloat(getResponsiveDimension(settings.grid.gap))}
            grabCursor={true}
            pagination={false}
            navigation={true}
            autoplay={{
              delay: 4000, 
              disableOnInteraction: false, 
              pauseOnMouseEnter: true, 
            }}
            className="my-3"
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
                  onClick={() => handleProductClick(product.slug)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        // Vertical Grid
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
                onClick={() => handleProductClick(product.slug)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularProductsSection;
