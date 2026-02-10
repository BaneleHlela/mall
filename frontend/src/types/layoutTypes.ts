import { Types } from 'mongoose';
import type { BackgroundSettings } from './layoutSettingsType';
import type { SectionType } from '../utils/defaults/sections/getSectionDefaults';
import type { defaultStoreIconsConfig } from '../utils/defaults/extras/defaultStoreIconsConfig';


export interface LayoutState {
    layouts: Layout[];
    activeLayout: Layout | null;
    layoutSettings: Layout | null;
    isLoading: boolean;
    error: string | null;
}
  

export interface Menubar {
    topbar?: {},
    sidebar?: {}
}

export interface Border {
    width?: string,
    style?: string,
    color?: string,
    radius?: string,
}


export interface Fonts {
    primary?: string;
    secondary?: string;
    tertiary?: string;
}
  

export interface Layout {
    name: string;
    _id?: string;
    routes: Routes;
    routeOrder: string[];
    screenshot: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        quad: string;
        pent: string;
    },
    //background: BackgroundSettings;
    fonts: Fonts;
    background: BackgroundSettings;
    store?: Types.ObjectId | string |  null | {
        _id: string;
        name: string;
        slug: string;
    };
    floats: {
        floatingIcons: {
            show: boolean;
            position: string;
            icons: typeof defaultStoreIconsConfig;
        };
        floatingButton: any;
    };
    menubar?: any;
    welcomeDiv?: any;
    sections: {
        gallery?: any;
        products?: any;
        services?: any;
        hero?: any;
        book?: any;
        bookWithCalendar?: any;
        team?: any;
        about: any;
        menu: any;
        order: any;
        reviews: any;
        contact: any;
        footer: any;
        singleProduct: any;
        bookService: any;
        FAQs?: any;
        searchResults?: any;
        rentals?: any;
        donations?: any;
        packages: any;
    };
}
  

export type SectionProps = {
    id?: string;
};

export interface Route {
    name: string;
    url: string;
    exact?: boolean; // Optional, as not all routes may require exact matching
    contains: string[],
    inLinks?: [
        {
            name: string;
            section: SectionType;
        }
    ]
}
  
export interface Routes {
    home?: Route;
    about?: Route;
    services?: Route;
    gallery?: Route;
    book?: Route;
    contact?: Route;
    events?: Route;
    menu?: Route;
    reviews?: Route;
    products?: Route;
    packages?: Route;
}

export interface TextProps {
    input?: string;
    fontFamily?: string;
    fontWeight?: string;
    color?: string;
    fontSize?: string | {
      mobile: string;
      desktop: string;
    };
    textShadow?: string;
    lineHeight?: string;
    letterSpacing?: string;
    textDecoration?: string;
    textTransform?: string;
    position?: string;
}