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
import ErrorBoundary from "../../../../components/ErrorBoundary";

const StoreHome = () => {
  const settings = useAppSelector((state) => state.layoutSettings);
  const contains = settings.routes.home?.contains || [];

  const withErrorBoundary = (Component: React.ReactElement) => (
    <ErrorBoundary>
      {Component}
    </ErrorBoundary>
  );
  
  console.log(window.scrollY)
  

  // Mapping section keys to actual components
  const sectionMap: Record<string, React.ReactElement> = {
    hero: withErrorBoundary(<StoreHeroSection />),
    about: withErrorBoundary(<StoreAboutSection />),
    services: withErrorBoundary(<StoreServicesSection />),
    menu: withErrorBoundary(<StoreMenuSection />),
    products: withErrorBoundary(<StoreProductsSection />),
    donations: withErrorBoundary(<StoreDonationsSection />),
    reviews: withErrorBoundary(<StoreReviewsSection />),
    contact: withErrorBoundary(<StoreContactSection />),
    footer: withErrorBoundary(<StoreFooterSection />),
    gallery: withErrorBoundary(<StoreGallerySection />),
    events: withErrorBoundary(<StoreEventsSection />),
    book: withErrorBoundary(<StoreBookSection />),
    packages: withErrorBoundary(<StorePackagesSection />),
    rentals: withErrorBoundary(<StoreRentalsSection />),
    team: withErrorBoundary(<StoreTeamSection />),
    FAQs: withErrorBoundary(<StoreFAQsSection />),
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
