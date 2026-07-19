import type { ResponsiveValue } from "./layoutSettingsType";
import type { Store } from "./storeTypes";

export interface SearchPost {
  _id: string;
  variation: string; // Component variation (e.g., "carousel", "grid", "list")
  type: string;
  departments: string[];
  stores: Partial<Store>[]; // ObjectIds as strings after population
  products: string[]; // ObjectIds as strings after population
  services: string[]; // ObjectIds as strings after population
  style: {
    text?: {
      heading?: {
        input?: string;
      };
      subheading?: {
        input?: string;
      };
    };
    colors?: {
      backgroundColor?: string;
      accentColor?: string;
      carouselBackgroundColor?: string;
    };
    content?: {
      largeImage?: {
        imageUrl: string[];
        aspectRatio: ResponsiveValue; // for e.g. { mobile: "4/5", aspect ration is stored in this format)
        borderRadius: string;
      };
      carousel?: {
        viewAllButton?: {
          show?: boolean;
          route?: string;
        };
        imagesAspectRatio?: ResponsiveValue;
        borderRadius?: string;
        slidesPerView?: {
          mobile: number; // for e.g. 1.25
          desktop: number;
        };
      };
    };
    button?: {
      function?: string;
    };
  };
  isActive: boolean;
  stats: {
    clicks: number;
    likelihoodIndex: number;
  }
  likelihoodIndex: number;
}