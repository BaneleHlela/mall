export const dedaultBasicStoreCarousel = {
  style: {
    text: {
      heading: {
        input: "New Store Carousel"
      }
    },
    content: {
      carousel: {
        slidesPerView: {
          mobile: 1.3,
          desktop: 4.2
        },
        imagesAspectRatio: {
          mobile: "5/3",
          desktop: "5/3"
        },
        viewAllButton: {
          show: true
        }
      }
    }
  },

  stats: {
    clicks: 8,
    likelihoodIndex: 8
  },
  variation: "basicStoreCarousel",
  type: "new-basic-store-carousel", // will return the first four mall products. (create function)

  departments: [
    "no-dep",
    "food"
  ],

  stores: [],
  products: [],
  services: [],

  isActive: true,
  likelihoodIndex: 1,
};

export const defaultSimpleStoreCarousel = {
  style: {
    text: {
      heading: {
        input: ""
      }
    },

    content: {
      carousel: {
        slidesPerView: {
          mobile: 3.3,
          desktop: 5.5
        },

        imagesAspectRatio: {
          mobile: "1/1",
          desktop: "1/1"
        },

        viewAllButton: {
          show: true
        }
      }
    }
  },

  stats: {
    clicks: 0,
    likelihoodIndex: 1
  },

  variation: "simpleStoreCarousel",
  type: "new-simple-store-carousel", // will return the first stores

  departments: [
    "no-dep",
    "food"
  ],

  stores: [],
  products: [],
  services: [],

  isActive: true,
  likelihoodIndex: 1,
};

export const defaultCarouselWithJSXAndProducts = {
  style: {
    text: {
      heading: {
        input: "Delicious Treats"
      },

      subheading: {
        input: "Explore our delives cakes and buscuits"
      }
    },

    content: {
      largeImage: {
        imageUrl: [
          "https://storage.googleapis.com/the-mall-uploads-giza/stores/deneo-mphuthi-bakes/images/muffin.webp"
        ],

        aspectRatio: {
          mobile: "4/5",
          desktop: "4/5"
        },

        borderRadius: "0px"
      },

      carousel: {
        slidesPerView: {
          mobile: 2.15,
          desktop: 5.5
        },

        imagesAspectRatio: {
          mobile: "1/1",
          desktop: "1/1"
        },

        borderRadius: "0px",

        viewAllButton: {
          show: true
        }
      }
    },

    colors: {
      backgroundColor: "#ede7b6",
      accentColor: "#49a0b6",
      carouselBackground: "#cfbd4c",
      carouselBackgroundColor: "#ffffff"
    }
  },

  stats: {
    clicks: 0,
    likelihoodIndex: 1
  },

  variation: "carouselWithJSXAndProducts",
  type: "new-carousel-with-jsx-and-products",

  departments: [
    "no-dep",
    "food",
    "catering"
  ],

  stores: [],
  products: [],
  services: [],

  isActive: true,
  likelihoodIndex: 1,
};

export const defaultBasicProductCarousel = {
  style: {
    text: {
      heading: {
        input: ""
      }
    },

    content: {
      carousel: {
        slidesPerView: {
          mobile: 3.3,
          desktop: 5.5
        },

        imagesAspectRatio: {
          mobile: "1/1",
          desktop: "1/1"
        },

        viewAllButton: {
          show: true
        }
      }
    }
  },

  stats: {
    clicks: 0,
    likelihoodIndex: 1
  },

  variation: "basicProductCarousel",
  type: "new-basic-product-carousel",

  departments: [
    "no-dep",
    "food"
  ],

  stores: [],
  products: [],
  services: [],

  isActive: true,
  likelihoodIndex: 1,
};