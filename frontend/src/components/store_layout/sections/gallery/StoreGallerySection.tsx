import { useAppSelector } from "../../../../app/hooks";
import FirstStoreGallerySection from "./first/FirstStoreGallerySection"
import GalleryWithImageSlider from "./gallery_with_image_slider/GalleryWithImageSlider";

const StoreGallerySection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.gallery.variation);

  if ( variation === "galleryWithImageSlider") {
    return (
      <GalleryWithImageSlider/>
    )
  }
  return (
    <FirstStoreGallerySection storeId="682eff789260b810aeba2c5f"/>
  )
}

export default StoreGallerySection;