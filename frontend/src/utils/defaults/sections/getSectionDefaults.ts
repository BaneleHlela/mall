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

export type SectionType = 'book' | 'products' | 'about' | 'hero' | 'menu' | 'bookWithCalendar' | 'order' | 'reviews' | 'footer';
type VariationType = string;

export const getSectionDefaults = (section: SectionType, variation: VariationType) => {
  const defaults: Record<SectionType, Record<VariationType, any>> = {
    about: {
      second: defaultAboutWithImageNextToTextConfig,
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