import StoreFooterSection from "../../../../components/store_layout/sections/footer/StoreFooterSection"
import StoreGallerySection from "../../../../components/store_layout/sections/gallery/StoreGallerySection"

const StoreGalleryPage = () => {
  return (
    <div className="w-screen flex flex-col items-center">
        <StoreGallerySection />
        <StoreFooterSection />
    </div>
  )
}

export default StoreGalleryPage