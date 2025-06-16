import { defaultFirstStoreMenubarConfig } from "./menubars/defaultFirstStoreMenubarConfig";
import { defaultSecondStoreAboutConfig } from "./sections/about/defaultSecondStoreAboutSectionConfig";
import { defaultFirstBookWithCalandarConfig } from "./sections/book_with_calendar/defaultFirstBookWithCalandarConfig";
import { defaultFirstFooterConfig } from "./sections/footer/defaultFirstFooterConfig";
import { defaultSecondHeroConfig } from "./sections/hero/defaultSecondHeroConfig";
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
    description: "",
    backgroundColor: "#f9d195",
    fonts: {
      primary: "Open Sans",
      secondary: "Patrick Hand",
      tertiary: "Knewave"
    },
    image: {
      url: "",
      text: "",
    },
    about: defaultSecondStoreAboutConfig,
    menubar: defaultFirstStoreMenubarConfig,
    menu: defaultFirstStoreMenuSectionConfig,
    hero: defaultSecondHeroConfig,
    bookWithCalendar: defaultFirstBookWithCalandarConfig,
    order: defaultFirstStoreOrderOnlineCongig,
    reviews: defaultFirstStoreReviewsConfig,
    footer: defaultFirstFooterConfig,
};
  