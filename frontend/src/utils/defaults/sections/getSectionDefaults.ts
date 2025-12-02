import { defaultAboutWithImageNextToTextConfig } from "./about/defaultAboutWithImageNextToText";
import { defaultFirstBookWithCalandarConfig } from "./book_with_calendar/defaultFirstBookWithCalandarConfig";
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
import { simpleServicesSectionConfig } from "./services/defaultSimpleStoreServicesConfig";
import { defaultFooterWithStoreDetailsButtonAndFormOrLocationConfig } from "./footer/defaultFooterWithStoreDetailsButtonAndFormOrLocationConfig";
import { defaultGalleryWithHorizontalImagesConfig } from "./gallery/defaultGalleryWithHorizontalImages";
import { defaultPopularProductsSectionConfig } from "./order_online/defaultPopularProductsSectionConfig";
import ContactWithBackgroundImageTextAndSocials from "../../../components/store_layout/sections/contact/with_bg_image_text_and_socials/ContactWithBackgroundImageTextAndSocials";
import { defaultHeroWithDivAndImageConfig } from "./hero/defaultHeroWithDivAndImageConfig";
import { defaultSingleProductSectionConfig } from "./single_product/defaultSingleProductSectionConfig";
import HeroWithBox from "../../../components/store_layout/sections/hero/hero_with_box/HeroWithBox";
import { defaultHeroWithBoxConfig } from "./hero/defaultHeroWithBox";

export type SectionType = 'book' | 'products' | 'services' | 'about' | 'hero' | 'menu' | 'bookWithCalendar' | 'order' | 'reviews' | 'footer' | 'gallery' | 'contact' | 'singleProduct' | 'FAQs';
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
  

  const defaults: Record<SectionType, Record<VariationType, any>> = {
    hero: {
      fourth: defaultHeroWithReviewCardAndEmailFormConfig,
      heroWithButtonBetweenImages: async () => {
        const demoStoreId = "6883116947fc791fc7b89df9"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'hero');
        return demoLayout || defaultHeroWithButtonBetweenImages;
      },
      heroWithImageButtonAndBox: defaultHeroWithImageButtonAndBox,
      heroWithButtonImageAndText: async () => {
        const demoStoreId = "686e76aa96f14c28650b671d"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'hero');
        return demoLayout || defaultHeroWithButtonImageAndTextConfig;
      },
      heroWithDivAndImages: async () => {
        const demoStoreId = "6895c4d6a50d393f431b9d47"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'hero');
        return demoLayout || defaultHeroWithDivAndImageConfig;
      },
      heroWithBox:  async () => {
        const demoStoreId = "6895c4d6a50d393f431b9d47"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'hero');
        return demoLayout || defaultHeroWithBoxConfig;
      }
    },
    about: {
      second: defaultAboutWithImageNextToTextConfig,
      aboutWithImageNextToText: async () => {
        const demoStoreId = "689095a2adb5d26b9b845d01"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'about');
        return demoLayout || defaultAboutWithImageNextToTextConfig;
      }
    },
    
    menu: {
      first: defaultFirstStoreMenuSectionConfig,
    },
    book: {
      basicBookWithOpenCalendar: defaultBasicBookWithOpenCalendarConfig,
      bookBook: defaultBasicBookWithOpenCalendarConfig,
    },
    bookWithCalendar: {
      first: defaultFirstBookWithCalandarConfig,
    },
    gallery: {
      galleryWithImageSlider: async () => {
        const demoStoreId = "6883116947fc791fc7b89df9"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'gallery');
        return demoLayout || defaultGalleryWithImageSliderConfig;
      },
      galleryWithGroupedImages: async () => {
        const demoStoreId = "686e76aa96f14c28650b671d"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'gallery');
        return demoLayout || defaultGalleryWithGroupedImagesConfig;
      },
      galleryWithHorizontalImages: defaultGalleryWithHorizontalImagesConfig,
    },
    order: {
      first: defaultFirstStoreProductsConfig,
    },
    products: {
      first: defaultFirstStoreProductsConfig,
      productsSectionPopular: async () => {
        const demoStoreId = "6895c4cfa50d393f431b9d40"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'products');
        return demoLayout || defaultPopularProductsSectionConfig;
      },
    },
    services: {
      servicesSectionSimple: simpleServicesSectionConfig,
      servicesSectionPopular:  async () => {
        const demoStoreId = "689095a2adb5d26b9b845d01"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'services');
        return demoLayout || simpleServicesSectionConfig;
      }
    },
    reviews: {
      first: defaultFirstStoreReviewsConfig,
      reviewsSectionPopular: async () => {
        const demoStoreId = "6883116947fc791fc7b89df9"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'reviews');
        return demoLayout || defaultGalleryWithGroupedImagesConfig;
      },
      
    },
    contact: {
      contactWithBackgroundImageTextAndSocials: async () => {
        const demoStoreId = "686e76aa96f14c28650b671d"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'contact');
        return demoLayout || defaultGalleryWithGroupedImagesConfig;
      },
    },
    footer: {
      footerWithStoreDetailsButtonAndFormOrLocation: async () => {
        const demoStoreId = "6895c4d6a50d393f431b9d47"; 
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'footer');
        return demoLayout || defaultFooterWithStoreDetailsButtonAndFormOrLocationConfig;
      }
    },
    singleProduct: {
      singleProductPopular: async () => {
        const demoStoreId = "6895c4cfa50d393f431b9d40";
        const demoLayout = await fetchDemoStoreLayout(demoStoreId, 'singleProduct');
        return demoLayout || defaultSingleProductSectionConfig;
      },
    },
    FAQs: {
      firstFAQs: {
        variation: "firstFAQs",
        background: {
          color: "primary",
        },
        text: {
          header: {
            color: "secondary",
            input: "FAQs",
            fontSize: {
              mobile: "4vh",
              desktop: "6vh",
            },
          },
          QnAs: {
            inputs: {
              first: {
                title: "Shipping & Returns",
                paragraph: "Our shipping is fast and reliable, and we offer hassle-free returns to ensure you're completely satisfied with your purchase."
              },
              second: {
                title: "Hat Care Instructions",
                paragraph: "To maintain the quality of your hat, we recommend spot cleaning with a damp cloth. Avoid submerging in water or using harsh chemicals."
              },
              third: {
                title: "Customization Options",
                paragraph: "We provide customized fittings to ensure your hat fits perfectly. Contact us for personalized options and bespoke hat designs."
              }
            },
            style: {
              title: {
                color: "secondary",
                fontFamily: "primary",
                fontSize: {
                  mobile: "3vh",
                  desktop: "3.5vh"
                }
              },
              paragraph: {
                color: "secondary",
                fontFamily: "primary",
                fontSize: {
                  mobile: "2.4vh",
                  desktop: "2.8vh"
                },
                padding: {
                  y: {
                    mobile: "3vh",
                    desktop: "5vh"
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  if (defaults[section] && defaults[section][variation]) {
    return defaults[section][variation];
  }

  throw new Error(`No default configuration found for section "${section}" with variation "${variation}"`);
};