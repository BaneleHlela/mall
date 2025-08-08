export interface BackgroundImage {
    url: string;
    height?: string;
    width?: string;
    opacity?: string;
  }
  
  export interface Background {
    image: BackgroundImage;
    color?: string;
  }
  
  export interface ImageSourceConfig {
    capture: boolean;
    page: string;
    section?: string;
  }
  
  export interface Poster {
    _id?: string;
    type: "digital" | "physical";
    layout: string;
    store: string;
    variation: "mobileOnly" | "allDevices" | "mobileAndPC" | "default";
    background: Background;
    images: {
      mobile: string[];
      desktop?: string;
      tablet?: string;
    };
    imageSource?: {
      desktop?: ImageSourceConfig;
      tablet?: ImageSourceConfig;
      mobile?: ImageSourceConfig[];
    };
    createdAt?: string;
    updatedAt?: string;
  }