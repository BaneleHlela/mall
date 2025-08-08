import { useAppSelector } from "../../../../app/hooks";
import FirstStoreGallerySection from "./first/FirstStoreGallerySection"
import GalleryWithGroupedImages from "./gallery_with_grouped_images/GalleryWithGroupedImages";
import GalleryWithHorizontalImages from "./gallery_with_horizontal_images/GalleryWithHorizontalImages";
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
      <div id="gallery">
        <GalleryWithGroupedImages/>
      </div>
    )
  }
  if (variation === "galleryWithHorizontalImages") {
    return (
      <div id="gallery">
        <GalleryWithHorizontalImages />
      </div>
      
    )
  }
  return (
    // <FirstStoreGallerySection storeId="682eff789260b810aeba2c5f"/>
    <GalleryWithGroupedImages/>
  )
}

export default StoreGallerySection;