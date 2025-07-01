import { StoreProductsSection, StoreFooterSection } from "../../../../components/store_layout/sections/StoreSections";

const StoreProductsPage = () => {
  return (
    <div className="w-full flex flex-col items-center">
        <StoreProductsSection />
        <StoreFooterSection />
    </div>
  )
}

export default StoreProductsPage;