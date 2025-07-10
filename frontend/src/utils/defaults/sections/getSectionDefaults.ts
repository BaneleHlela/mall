import { defaultAboutWithImageNextToTextConfig } from "./about/defaultAboutWithImageNextToText";
import { defaultFirstBookWithCalandarConfig } from "./book_with_calendar/defaultFirstBookWithCalandarConfig";
import { defaultFirstFooterConfig } from "./footer/defaultFirstFooterConfig";
import { defaultFourthStoreHeroConfig } from "./hero/defaultFourthStoreHeroConfig";
import { defaultHeroWithButtonBetweenImages } from "./hero/defaultHeroWithButtonBetweenImagesConfig";
import { defaultFirstStoreMenuSectionConfig } from "./menu/defaultFirstStoreMenuSectionConfig";
import { defaultFirstStoreProductsConfig } from "./order_online/defualtFirstStoreProductsConfig";
import { defaultFirstStoreReviewsConfig } from "./reviews/defaultFirstStoreReviewsConfig";
import { defaultHeroWithImageButtonAndBox } from "./hero/defaultHeroWithImagePatternAndBoxConfig";
import { defaultBasicBookWithOpenCalendarConfig } from "./book/defaultBasicBookWithOpenCalenderConfig";
import { defaultGalleryWithGroupedImagesConfig } from "./gallery/defaultGalleryWithGroupedImagesConfig";
import { defaultGalleryWithImageSliderConfig } from "./gallery/defaultGalleryWithImageSliderConfig";

export type SectionType = 'book' | 'products' | 'about' | 'hero' | 'menu' | 'bookWithCalendar' | 'order' | 'reviews' | 'footer' | 'gallery';
type VariationType = string;

export const getSectionDefaults = (section: SectionType, variation: VariationType) => {
  const defaults: Record<SectionType, Record<VariationType, any>> = {
    about: {
      second: defaultAboutWithImageNextToTextConfig,
      aboutWithImageNextToText: defaultAboutWithImageNextToTextConfig,
    },
    hero: {
      fourth: defaultFourthStoreHeroConfig,
      heroWithButtonBetweenImages: defaultHeroWithButtonBetweenImages,
      heroWithImageButtonAndBox: defaultHeroWithImageButtonAndBox,
    },
    menu: {
      first: defaultFirstStoreMenuSectionConfig,
    },
    book: {
      basicBookWithOpenCalendar: defaultBasicBookWithOpenCalendarConfig
    },
    bookWithCalendar: {
      first: defaultFirstBookWithCalandarConfig,
    },
    gallery: {
      galleryWithImageSlider: defaultGalleryWithImageSliderConfig,
      galleryWithGroupedImages: defaultGalleryWithGroupedImagesConfig,
    },
    order: {
      first: defaultFirstStoreProductsConfig,
    },
    products: {
      first: defaultFirstStoreProductsConfig,
    },
    reviews: {
      first: defaultFirstStoreReviewsConfig,
    },
    footer: {
      first: defaultFirstFooterConfig,
    },
  };

  if (defaults[section] && defaults[section][variation]) {
    return defaults[section][variation];
  }

  throw new Error(`No default configuration found for section "${section}" with variation "${variation}"`);
};