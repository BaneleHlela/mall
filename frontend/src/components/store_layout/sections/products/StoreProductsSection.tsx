import { useAppSelector } from "../../../../app/hooks";
import FirstStoreProductsSection from "./first/FirstStoreProductsSection";
import HorizontalProductsSection from "./horizontal_products/HorizontalProductsSection";
import PopularProductsSection from "./popular/PopularProductSection";

const StoreProductsSection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.sections.products.variation);

  if (variation === "horizontalProducts") {
    return <HorizontalProductsSection />;
  }

  if ( variation === "productsSectionPopular") {
    return <PopularProductsSection  />
  }
  return (
    <FirstStoreProductsSection ></FirstStoreProductsSection>
  )
}

export default StoreProductsSection;