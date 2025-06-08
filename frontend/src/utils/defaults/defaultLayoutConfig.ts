import { defaultFirstBookWithCalandarConfig } from "./sections/book_with_calendar/defaultFirstBookWithCalandarConfig";
import { defaultFirstHeroConfig } from "./sections/hero/defaultFirstHeroConfig"

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
    image: {
      url: "",
      text: "",
    },
    menubar: defaultMenubarConfig,
    hero: defaultFirstHeroConfig,
    bookWithCalendar: defaultFirstBookWithCalandarConfig,
    footer: {
      // You can define structure here if needed later
    },
};
  