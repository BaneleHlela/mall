import { defaultPupularStoreMenubarConfig } from "./menubars/defaultPopularStoreMenubarConfig";
import { defaultSecondStoreAboutConfig } from "./sections/about/defaultSecondStoreAboutSectionConfig";
import { defaultFirstBookWithCalandarConfig } from "./sections/book_with_calendar/defaultFirstBookWithCalandarConfig";
import { defaultFirstFooterConfig } from "./sections/footer/defaultFirstFooterConfig";
import { defaultFourthStoreHeroConfig } from "./sections/hero/defaultFourthStoreHeroConfig";
import { defaultHeroWithButtonBetweenImages } from "./sections/hero/defaultHeroWithButtonBetweenImagesConfig";
import { defaultFirstStoreMenuSectionConfig } from "./sections/menu/defaultFirstStoreMenuSectionConfig";
import { defaultFirstStoreOrderOnlineCongig } from "./sections/order_online/defualtFirstStoreOrderOnlineConfig";
import { defaultFirstStoreReviewsConfig } from "./sections/reviews/defaultFirstStoreReviewsConfig";



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
    routeOrder: ["home", "about", "menu", "products", "reviews"],
    routes: {
      home: {
        name: "Home",
        url: "/",
        exact: true,
        contains: ["hero", "about", "order", "reviews", "footer"],
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
        name: "Order Online",
        url: "/products",
        contains: [ "products", "footer"],
      },
      reviews: {
        name: "Reviews",
        url: "/reviews",
        contains: [ "reviews", "footer" ],
      },
    },
    description: "",
    background: {
      color: "white",
      width: {
        desktop: "95vw",
        mobile: "100vw",
      },
    },
    fonts: {
      primary: "Open Sans",
      secondary: "Patrick Hand",
      tertiary: "Knewave"
    },
    image: {
      url: "",
      text: "",
    },
    practice: defaultFourthStoreHeroConfig,
    about: defaultSecondStoreAboutConfig,
    menubar: defaultPupularStoreMenubarConfig,
    menu: defaultFirstStoreMenuSectionConfig,
    hero: defaultHeroWithButtonBetweenImages,
    bookWithCalendar: defaultFirstBookWithCalandarConfig,
    order: defaultFirstStoreOrderOnlineCongig,
    reviews: defaultFirstStoreReviewsConfig,
    footer: defaultFirstFooterConfig,
};
  