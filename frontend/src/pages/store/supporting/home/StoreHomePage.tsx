import { 
  StoreAboutSection, StoreHeroSection, StoreServicesSection,
  StoreMenuSection, StoreProductsSection, StoreReviewsSection,
  StoreContactSection, StoreFooterSection, StoreGallerySection, 
  StoreEventsSection, StoreBookSection, StorePackagesSection
} from "../../../../components/store_layout/sections/StoreSections"; 
import { useAppSelector } from "../../../../app/hooks";

const StoreHome = () => {
  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-gray-100"
    >
      StoreHome
    </div>
  )
}

export default StoreHome;