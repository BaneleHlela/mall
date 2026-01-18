import { useAppSelector } from "../../../../app/hooks";
import GalleryWithGroupedImages from "./gallery_with_grouped_images/GalleryWithGroupedImages";
import GalleryWithHorizontalImages from "./gallery_with_horizontal_images/GalleryWithHorizontalImages";
import GalleryWithImageSlider from "./gallery_with_image_slider/GalleryWithImageSlider";
import MaxThreeGallery from "./max_three_gallery/MaxThreeGallery";
import PopularGallerySection from "./popular_gallery/PopularGallerySection";
import SimpleGallerySection from "./simple_gallery/SimpleGallerySection";

const StoreGallerySection = () => {
  const variation = useAppSelector(
    (state) => state.layoutSettings.sections.gallery.variation
  );

  switch (variation) {
    case "simpleGallery":
      return <SimpleGallerySection />;

    case "maxThreeGallery":
      return <MaxThreeGallery />;

    case "galleryWithImageSlider":
      return <GalleryWithImageSlider />;

    case "galleryWithGroupedImages":
      return <GalleryWithGroupedImages />;

    case "galleryWithHorizontalImages":
      return (
        <div id="gallery">
          <GalleryWithHorizontalImages />
        </div>
      );
    case "popularGallerySection": 
      return <PopularGallerySection />;
    default:
      return <p>No settings matching {variation}</p>;
  }
};

export default StoreGallerySection;
