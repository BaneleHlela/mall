import { useAppSelector } from "../../../../app/hooks";
import FirstStoreProductsSection from "./first/FirstStoreProductsSection";
import PopularProductsSection from "./popular/PopularProductSection";

const StoreProductsSection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.products.variation);

  if ( variation === "productsSectionPopular") {
    return <PopularProductsSection  />
  }
  return (
    <FirstStoreProductsSection ></FirstStoreProductsSection>
  )
}

export default StoreProductsSection;