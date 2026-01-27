import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { getGridColumnClasses } from '../../gallery/gallery_with_grouped_images/SingleGroupImages';
import CategorySelector from '../../../extras/category_selector/CategorySelector';
import PopularDonationCard from '../../../extras/cards/donation/popular/PopularDonationCard';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import UnderlinedText from '../../../extras/text/UnderlinedText';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import StorePayDonationModal from '../shared_donation_section_components/StorePayDonationModal';

const PopularDonationSection = () => {
  const settings = useAppSelector((state) => state.layoutSettings.sections.donations);
  const donations = useAppSelector((state) => state.donations.donations);
  const store = useAppSelector((state) => state.stores.currentStore);
  const colors = useAppSelector((state) => state.layoutSettings.colors);
  const fonts = useAppSelector((state) => state.layoutSettings.fonts);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null);


  const isMobile = window.innerWidth < 768;
  const isHorizontal =
    (isMobile && settings.stack.mobile === 'horizontal') ||
    (!isMobile && settings.stack.desktop === 'horizontal');

  const visibleCount = isMobile ? settings.grid.columns.mobile : settings.grid.columns.desktop;

  const handleDonationClick = (donationSlug: string) => {
    const currentUrl = window.location.href;

    if (currentUrl.includes('layouts')) {
      navigate(`/layouts/${store?.slug}/preview/donation/${donationSlug}`);
    } else if (store && store.slug) {
      navigate(`/stores/${store.slug}/donation/${donationSlug}`);
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
              className="w-full flex flex-col items-center"
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
      {store?.categories?.donations && settings.categorySelector.show && (
        <div className="w-full pb-4 flex flex-row justify-center">
          <CategorySelector
            categories={store?.categories?.donations || []}
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
            {donations.map((donation) => (
              <SwiperSlide key={donation._id}>
                <PopularDonationCard
                  donationName={donation.name}
                  donationDescription={donation.description}
                  imageUrl={donation.images[0]}
                  style={settings.card}
                  onClick={() => handleDonationClick(donation.slug)}
                  onPayClick={() => {
                    setSelectedDonation(donation);
                    setIsModalOpen(true);
                  }}
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
            {donations.map((donation) => (
              <PopularDonationCard
                key={donation._id}
                donationName={donation.name}
                donationDescription={donation.description}
                imageUrl={donation.images[0]}
                style={settings.card}
                onClick={() => handleDonationClick(donation.slug)}
                onPayClick={() => {
                  setSelectedDonation(donation);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      )}
      <StorePayDonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        donation={selectedDonation}
      />
    </div>
  );
};

export default PopularDonationSection;