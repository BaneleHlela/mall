import { defaultAboutWithImageNextToTextConfig } from "./about/defaultAboutWithImageNextToText";
import { defaultFirstBookWithCalandarConfig } from "./book_with_calendar/defaultFirstBookWithCalandarConfig";
import { defaultFirstFooterConfig } from "./footer/defaultFirstFooterConfig";
import { defaultHeroWithReviewCardAndEmailFormConfig } from "./hero/defaultHeroWithReviewCardAndEmailFormConfig";
import { defaultHeroWithButtonBetweenImages } from "./hero/defaultHeroWithButtonBetweenImagesConfig";
import { defaultFirstStoreMenuSectionConfig } from "./menu/defaultFirstStoreMenuSectionConfig";
import { defaultFirstStoreProductsConfig } from "./order_online/defualtFirstStoreProductsConfig";
import { defaultFirstStoreReviewsConfig } from "./reviews/defaultFirstStoreReviewsConfig";
import { defaultHeroWithImageButtonAndBox } from "./hero/defaultHeroWithImagePatternAndBoxConfig";
import { defaultBasicBookWithOpenCalendarConfig } from "./book/defaultBasicBookWithOpenCalenderConfig";
import { defaultGalleryWithGroupedImagesConfig } from "./gallery/defaultGalleryWithGroupedImagesConfig";
import { defaultGalleryWithImageSliderConfig } from "./gallery/defaultGalleryWithImageSliderConfig";
import { defaultHeroWithButtonImageAndTextConfig } from "./hero/defaultHeroWithButtonImageAndTextConfig";
import { store } from "../../../app/store";
import { getLayoutByDemoStore } from "../../../features/layouts/layoutSlice";

export type SectionType = 'book' | 'products' | 'about' | 'hero' | 'menu' | 'bookWithCalendar' | 'order' | 'reviews' | 'footer' | 'gallery';
type VariationType = string;


// Helper function to fetch layout for a demo store
const fetchDemoStoreLayout = async (demoStoreId: string, section: string) => {
  try {
    const resultAction = await store.dispatch(getLayoutByDemoStore(demoStoreId));
    if (getLayoutByDemoStore.fulfilled.match(resultAction)) {
      const layout = resultAction.payload;
      // @ts-ignore
      if (layout && layout[section]) {
        // @ts-ignore
        return layout[section];
      }
    }
    console.warn(`Failed to fetch demo store layout or ${section} section not found. Using default.`);
  } catch (error) {
    console.error('Error fetching demo store layout:', error);
  }
  return null;
};


export const getSectionDefaults = async (section: SectionType, variation: VariationType) => {
  
  // If a demoStoreId is provided and the variation is 'heroWithButtonImageAndText'
  if (section === 'hero' && variation === 'heroWithButtonImageAndText') {
    const demoStoreId = "686e76aa96f14c28650b671d"; // Hard-coded demo store ID
    try {
      // Dispatch the thunk to fetch the layout for the demo store
      const resultAction = await store.dispatch(getLayoutByDemoStore(demoStoreId));
      
      if (getLayoutByDemoStore.fulfilled.match(resultAction)) {
        // If the fetch was successful, extract the hero section from the layout
        const layout = resultAction.payload;
        if (layout && layout.hero) {
          return layout.hero;
        }
      }
      // If the fetch failed or the hero section doesn't exist, fall back to the default
      console.warn('Failed to fetch demo store layout or hero section not found. Using default.');
    } catch (error) {
      console.error('Error fetching demo store layout:', error);
    }
  }

  const defaults: Record<SectionType, Record<VariationType, any>> = {
    hero: {
      fourth: defaultHeroWithReviewCardAndEmailFormConfig,
      heroWithButtonBetweenImages: defaultHeroWithButtonBetweenImages,
      heroWithImageButtonAndBox: defaultHeroWithImageButtonAndBox,
      heroWithButtonImageAndText: async () => {
        const demoStoreId = "686e76aa96f14c28650b671d"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'hero');
        return demoLayout || defaultHeroWithButtonImageAndTextConfig;
      },
    },
    about: {
      second: defaultAboutWithImageNextToTextConfig,
      aboutWithImageNextToText: async () => {
        const demoStoreId = "686e76aa96f14c28650b671d"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'about');
        return demoLayout || defaultAboutWithImageNextToTextConfig;
      }
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
      galleryWithGroupedImages: async () => {
        const demoStoreId = "686e76aa96f14c28650b671d"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'gallery');
        return demoLayout || defaultGalleryWithGroupedImagesConfig;
      },
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