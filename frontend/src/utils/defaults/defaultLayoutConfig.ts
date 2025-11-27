import { defaultPupularStoreMenubarConfig } from "./menubars/defaultPopularStoreMenubarConfig";
import { defaultAboutWithImageNextToTextConfig } from "./sections/about/defaultAboutWithImageNextToText";
import { defaultFirstBookWithCalandarConfig } from "./sections/book_with_calendar/defaultFirstBookWithCalandarConfig";
import { defaultHeroWithReviewCardAndEmailFormConfig } from "./sections/hero/defaultHeroWithReviewCardAndEmailFormConfig";
import { defaultHeroWithButtonBetweenImages } from "./sections/hero/defaultHeroWithButtonBetweenImagesConfig";
import { defaultFirstStoreMenuSectionConfig } from "./sections/menu/defaultFirstStoreMenuSectionConfig";
import { defaultFirstStoreProductsConfig } from "./sections/order_online/defualtFirstStoreProductsConfig";
import { defaultFirstStoreReviewsConfig } from "./sections/reviews/defaultFirstStoreReviewsConfig";
import { defaultHeroWithImageButtonAndBox } from "./sections/hero/defaultHeroWithImagePatternAndBoxConfig";
import { defaultHeroWithButtonImageAndTextConfig } from "./sections/hero/defaultHeroWithButtonImageAndTextConfig";
import { defaultGalleryWithImageSliderConfig } from "./sections/gallery/defaultGalleryWithImageSliderConfig";
import { defaultFirstStoreServicesConfig } from "./sections/services/defaultFirstStoreServicesConfig";
import { defaultBasicBookWithOpenCalendarConfig } from "./sections/book/defaultBasicBookWithOpenCalenderConfig";
import { defaultGalleryWithGroupedImagesConfig } from "./sections/gallery/defaultGalleryWithGroupedImagesConfig";
import { defaultContactWithBackgroundImageTextAndSocialsConfig } from "./sections/contact/defaultContactWithBackgroundImageTextAndSocialsConfig";
import { defaultReviewsWithBackgroungImageAndCardConfig } from "./sections/reviews/defaultReviewsWithBackgroundImageAndCardConfig";
import { simpleServicesSectionConfig } from "./sections/services/defaultSimpleStoreServicesConfig";
import { defaultFooterWithStoreDetailsButtonAndFormOrLocationConfig } from "./sections/footer/defaultFooterWithStoreDetailsButtonAndFormOrLocationConfig";
import { defaultPopularProductsSectionConfig } from "./sections/order_online/defaultPopularProductsSectionConfig";
import { defaultSingleProductSectionConfig } from "./sections/single_product/defaultSingleProductSectionConfig";
import { defaultPopularTeamSectionConfig } from "./sections/team/defaultPopularTeamSectionConfig";
import { defaultStoreIconsConfig } from "./extras/defaultStoreIconsConfig";
import { defaultHeroWithBoxConfig } from "./sections/hero/defaultHeroWithBox";
import { defaultBookServiceSectionConfig } from "./sections/book_service/defaultBookServiceSectionConfig";
import { defaultHeroWithDivAndImageConfig } from "./sections/hero/defaultHeroWithDivAndImageConfig";

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
        contains: ["hero", "about", "gallery", "reviews", "footer",],
        inLinks: [{
          section: 'about',
          name: "About Us",
        }],
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
    floats: {
        floatingIcons: {
          show: true,
          icons: defaultStoreIconsConfig,
        },
        floatingButton: {
          show: "chat",
          style: {
            position: "left",
            icon: {
              size: "3vh",
              color: "pink"
            },
            background: {
              color: "orange",
              padding: {
                y: "10px",
                x: "10px"
              },
              border: {}
            }
          }
        }
    },
    menubar: defaultPupularStoreMenubarConfig,
    hero: defaultHeroWithDivAndImageConfig,
    practice: defaultHeroWithDivAndImageConfig,
    services: simpleServicesSectionConfig,
    about: defaultAboutWithImageNextToTextConfig,
    team: defaultPopularTeamSectionConfig,
    gallery: defaultGalleryWithGroupedImagesConfig,
    menu: defaultFirstStoreMenuSectionConfig,
    book: defaultBasicBookWithOpenCalendarConfig,
    bookWithCalendar: defaultFirstBookWithCalandarConfig,
    products: defaultPopularProductsSectionConfig,
    order: defaultFirstStoreProductsConfig,
    reviews: defaultReviewsWithBackgroungImageAndCardConfig,
    contact: defaultContactWithBackgroundImageTextAndSocialsConfig,
    footer: defaultFooterWithStoreDetailsButtonAndFormOrLocationConfig,
    singleProduct: defaultSingleProductSectionConfig,
    bookService: defaultBookServiceSectionConfig,
};
  