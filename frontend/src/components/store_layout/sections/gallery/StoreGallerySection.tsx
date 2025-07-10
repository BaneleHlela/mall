import { useAppSelector } from "../../../../app/hooks";
import FirstStoreGallerySection from "./first/FirstStoreGallerySection"
import GalleryWithGroupedImages from "./gallery_with_grouped_images/GalleryWithGroupedImages";
import GalleryWithImageSlider from "./gallery_with_image_slider/GalleryWithImageSlider";

const StoreGallerySection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.gallery.variation);
  
  if ( variation === "galleryWithImageSlider") {
    return (
      <GalleryWithImageSlider/>
    )
  }
  if (variation === "galleryWithGroupedImages") {
    return (
      <GalleryWithGroupedImages/>
    )
  }
  return (
    // <FirstStoreGallerySection storeId="682eff789260b810aeba2c5f"/>
    <GalleryWithGroupedImages/>
  )
}

export default StoreGallerySection;