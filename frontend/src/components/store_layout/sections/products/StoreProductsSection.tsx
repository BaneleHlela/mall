import { useAppSelector } from "../../../../app/hooks";
import FirstStoreProductsSection from "./first/FirstStoreProductsSection";
import HorizontalProductsSection from "./horizontal_products/HorizontalProductsSection";
import PopularProductsSection from "./popular/PopularProductSection";
import ProductsWithVerySimpleCard from "./products_with_very_simple_card/ProductsWithVerySimpleCard";

const StoreProductsSection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.sections.products.variation);

  if (variation === "horizontalProducts") {
    return <HorizontalProductsSection />;
  }

  if ( variation === "productsSectionPopular") {
    return <PopularProductsSection  />
  }

  if (variation === "productWithVerySimpleCard") {
    return <ProductsWithVerySimpleCard />
  }

  return (
    <FirstStoreProductsSection ></FirstStoreProductsSection>
  )
}

export default StoreProductsSection;