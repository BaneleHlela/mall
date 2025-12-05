import { useAppSelector } from "../../../../app/hooks";
import FirstStoreGallerySection from "./first/FirstStoreGallerySection"
import GalleryWithGroupedImages from "./gallery_with_grouped_images/GalleryWithGroupedImages";
import GalleryWithHorizontalImages from "./gallery_with_horizontal_images/GalleryWithHorizontalImages";
import GalleryWithImageSlider from "./gallery_with_image_slider/GalleryWithImageSlider";
import MaxThreeGallery from "./max_three_gallery/MaxThreeGallery";
import SimpleGallerySection from "./simple_gallery/SimpleGallerySection";

const StoreGallerySection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.sections.gallery.variation);
  
  if (variation === "simpleGallery") {
    return (
      <SimpleGallerySection/>
    )
  }

  if (variation === "maxThreeGallery") {
    return (
      <MaxThreeGallery/>
    )
  }

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