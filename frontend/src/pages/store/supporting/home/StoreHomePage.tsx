import {
  StoreAboutSection,
  StoreHeroSection,
  StoreServicesSection,
  StoreMenuSection,
  StoreProductsSection,
  StoreReviewsSection,
  StoreContactSection,
  StoreFooterSection,
  StoreGallerySection,
  StoreEventsSection,
  StoreBookSection,
  StorePackagesSection
} from "../../../../components/store_layout/sections/StoreSections";

import { useAppSelector } from "../../../../app/hooks";
import StoreTeamSection from "../../../../components/store_layout/sections/team/StoreTeamSection";
import StoreFAQsSection from "../../../../components/store_layout/sections/FAQs/StoreFAQsSection";
import StoreDonationsSection from "../../../../components/store_layout/sections/donations/StoreDonationsSection";
import StoreRentalsSection from "../../../../components/store_layout/sections/rentals/StoreRentalsSection";

const StoreHome = () => {
  const settings = useAppSelector((state) => state.layoutSettings);
  const contains = settings.routes.home?.contains || [];


  // Mapping section keys to actual components
  const sectionMap: Record<string, React.ReactElement> = {
    hero: <StoreHeroSection />,
    about: <StoreAboutSection />,
    services: <StoreServicesSection />,
    menu: <StoreMenuSection />,
    products: <StoreProductsSection />,
    donations: <StoreDonationsSection />,
    reviews: <StoreReviewsSection />,
    contact: <StoreContactSection />,
    footer: <StoreFooterSection />,
    gallery: <StoreGallerySection />,
    events: <StoreEventsSection />,
    book: <StoreBookSection />,
    packages: <StorePackagesSection />,
    rentals: <StoreRentalsSection />,
    team: <StoreTeamSection />,
    FAQs: <StoreFAQsSection />,
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {contains.map((sectionKey) =>
        sectionMap[sectionKey] ? (
          <div key={sectionKey} className="w-full flex flex-row justify-center">
            {sectionMap[sectionKey]}
          </div>
        ) : null
      )}
    </div>
  );
};

export default StoreHome;
