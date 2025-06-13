import { defaultSecondStoreAboutConfig } from "./sections/about/defaultSecondStoreAboutSectionConfig";
import { defaultFirstBookWithCalandarConfig } from "./sections/book_with_calendar/defaultFirstBookWithCalandarConfig";
import { defaultFirstFooterConfig } from "./sections/footer/defaultFirstFooterConfig";
import { defaultFirstHeroConfig } from "./sections/hero/defaultFirstHeroConfig";
import { defaultSecondHeroConfig } from "./sections/hero/defaultSecondHeroConfig";
import { defaultFirstStoreMenuSectionConfig } from "./sections/menu/defaultFirstStoreMenuSectionConfig";
import { defaultFirstStoreOrderOnlineCongig } from "./sections/order_online/defualtFirstStoreOrderOnlineConfig";



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
    image: {
      url: "",
      text: "",
    },
    fontFamilies: {
      primary: "Open Sans",
      secondary: "Roboto",
      accent: "Savate"
    },
    about: defaultSecondStoreAboutConfig,
    menubar: defaultMenubarConfig,
    menu: defaultFirstStoreMenuSectionConfig,
    hero: defaultSecondHeroConfig,
    bookWithCalendar: defaultFirstBookWithCalandarConfig,
    order: defaultFirstStoreOrderOnlineCongig,
    footer: defaultFirstFooterConfig,
};
  