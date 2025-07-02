import { defaultPupularStoreMenubarConfig } from "./menubars/defaultPopularStoreMenubarConfig";
import { defaultSecondStoreAboutConfig } from "./sections/about/defaultSecondStoreAboutSectionConfig";
import { defaultFirstBookWithCalandarConfig } from "./sections/book_with_calendar/defaultFirstBookWithCalandarConfig";
import { defaultFirstFooterConfig } from "./sections/footer/defaultFirstFooterConfig";
import { defaultFourthStoreHeroConfig } from "./sections/hero/defaultFourthStoreHeroConfig";
import { defaultHeroWithButtonBetweenImages } from "./sections/hero/defaultHeroWithButtonBetweenImagesConfig";
import { defaultFirstStoreMenuSectionConfig } from "./sections/menu/defaultFirstStoreMenuSectionConfig";
import { defaultFirstStoreProductsConfig } from "./sections/order_online/defualtFirstStoreProductsConfig";
import { defaultFirstStoreReviewsConfig } from "./sections/reviews/defaultFirstStoreReviewsConfig";
import { defaultHeroWithImageButtonAndBox } from "./sections/hero/defaultHeroWithImagePatternAndBoxConfig";
import { defaultHeroWithButtonImageAndTextConfig } from "./sections/hero/defaultHeroWithButtonImageAndTextConfig";
import { defaultGalleryWithImageSliderConfig } from "./sections/gallery/defaultGalleryWithImageSliderConfig";
import { defaultFirstStoreServicesConfig } from "./sections/services/defaultFirstStoreServicesConfig";

export const defaultMenubarConfig = {
  topbar: {
    isSticky: true,
    background: {
      height: 10,
    },
    links: {
      text: {
        fontFamily: "AR One Sans",
      },
    },
  },
  sidebar: {
    coverHeader: true,
    layoutStyle: ["logo", "links", "extras"],
    links: {
      text: {
        fontFamily: "AR One Sans",
      },
    },
  },
}


export const defaultLayoutConfig = {
    name: "Default Store Layout",
    routeOrder: ["home", "about", "services", "menu", "products", "reviews"],
    routes: {
      home: {
        name: "Home",
        url: "/",
        exact: true,
        contains: ["hero", "about", "order", "gallery", "reviews", "footer",],
      },
      about: {
        name: "About Us",
        url: "/about",
        contains: ["about", "footer"],
      },
      menu: {
        name: "Menu",
        url: "/menu",
        contains: ["menu", "footer"],
      },
      products: {
        name: "Products",
        url: "/products",
        contains: [ "products", "footer"],
      },
      reviews: {
        name: "Reviews",
        url: "/reviews",
        contains: [ "reviews", "footer" ],
      },
      services: {
        name: "Services",
        url: "/services",
        contains: [ "services", "footer" ],
      },
    },
    description: "",
    background: {
      color: "white",
      width: {
        desktop: "100vw",
        mobile: "100vw",
      },
    },
    fonts: {
      primary: "Open Sans",
      secondary: "Patrick Hand",
      tertiary: "Bitcount Grid Double"
    },
    image: {
      url: "",
      text: "",
    },
    practice: defaultFourthStoreHeroConfig,
    services: defaultFirstStoreServicesConfig,
    about: defaultSecondStoreAboutConfig,
    menubar: defaultPupularStoreMenubarConfig,
    gallery: defaultGalleryWithImageSliderConfig,
    menu: defaultFirstStoreMenuSectionConfig,
    hero: defaultHeroWithButtonImageAndTextConfig,
    bookWithCalendar: defaultFirstBookWithCalandarConfig,
    products: defaultFirstStoreProductsConfig,
    order: defaultFirstStoreProductsConfig,
    reviews: defaultFirstStoreReviewsConfig,
    footer: defaultFirstFooterConfig,
};
  