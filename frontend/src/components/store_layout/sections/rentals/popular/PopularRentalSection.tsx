import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { getGridColumnClasses } from '../../gallery/gallery_with_grouped_images/SingleGroupImages';
import CategorySelector from '../../../extras/category_selector/CategorySelector';
import PopularRentalCard from '../../../extras/cards/rental/popular/PopularRentalCard';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UnderlinedText from '../../../extras/text/UnderlinedText';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const PopularRentalSection = () => {
  const settings = useAppSelector((state) => state.layoutSettings.sections.rentals);
  const rentals = useAppSelector((state) => state.rentals.rentals);
  const store = useAppSelector((state) => state.stores.currentStore);
  const { fonts, colors } = useAppSelector((state) => state.layoutSettings);
  const navigate = useNavigate();


  const isMobile = window.innerWidth < 768;
  const isHorizontal =
    (isMobile && settings.stack.mobile === 'horizontal') ||
    (!isMobile && settings.stack.desktop === 'horizontal');

  const visibleCount = isMobile ? settings.grid.columns.mobile : settings.grid.columns.desktop;

  const handleRentalClick = (rentalSlug: string) => {
    const currentUrl = window.location.href;

    if (currentUrl.includes('layouts')) {
      navigate(`/layouts/${store?.slug}/preview/rental/${rentalSlug}`);
    } else if (store && store.slug) {
      navigate(`/stores/${store.slug}/rental/${rentalSlug}`);
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
          <div
            style={getTextStyles(settings.text.subheading, fonts, colors)}
            className={`w-full flex flex-row ${settings.text.subheading?.position === 'center'
                ? 'justify-center text-center'
                : settings.text.subheading?.position === 'start'
                ? 'justify-start text-start'
                : 'justify-end text-end'}`}
          >
            <div
              style={{
                maxWidth: '100%',
              }}
              className="w-full lg:w-[50%] flex flex-col items-center"
            >
              <div
                style={{
                  ...getBackgroundStyles(settings.text.subheading?.background || {}),
                }}
                className={`${settings.text.subheading?.animation || ''} text-wrap w-full rich-text`}
                dangerouslySetInnerHTML={{ __html: settings.text.subheading.input }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Category Selector */}
      {store?.categories?.rentals && settings.categorySelector.show && (
        <div className="w-full pb-4 flex flex-row justify-center">
          <CategorySelector
            categories={store?.categories?.rentals || []}
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
            className="my-3 overflow-y-visible"
          >
            {rentals.map((rental) => (
              <SwiperSlide key={rental._id}>
                <PopularRentalCard
                  rentalName={rental.name}
                  rentalDescription={rental.description}
                  rentalPrice={rental.price.value}
                  rentalDuration={`${rental.duration.value} ${rental.duration.unit}`}
                  rentalImages={rental.images}
                  style={settings.card}
                  onClick={() => handleRentalClick(rental.slug)}
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
            {rentals.map((rental) => (
              <PopularRentalCard
                key={rental._id}
                rentalName={rental.name}
                rentalDescription={rental.description}
                rentalPrice={rental.price.value}
                rentalDuration={`${rental.duration.value} ${rental.duration.unit}`}
                rentalImages={rental.images}
                style={settings.card}
                onClick={() => handleRentalClick(rental.slug)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularRentalSection;