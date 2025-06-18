import { Types } from 'mongoose';


export interface LayoutState {
    layouts: Layout[];
    activeLayout: Layout | null;
    layoutSettings: Layout | null;
    status: "idle" | "loading" | "succeeded" | "failed";
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
    routes: Routes;
    practice: any;
    backgroundColor: string | undefined;
    fonts: Fonts;
    footer: any;
    name?: string;
    _id?: string;
    store?: Types.ObjectId | null,
    menubar?: any;
    hero?: any;
    bookWithCalendar?: any;
    about: any;
    menu: any;
    order: any;
    reviews: any;
}

export type SectionProps = {
    id?: string;
};

export interface Route {
    name: string;
    url: string;
    exact?: boolean; // Optional, as not all routes may require exact matching
    contains: Array<
      | "hero"
      | "about"
      | "services"
      | "gallery"
      | "book"
      | "contact"
      | "events"
      | "menu"
      | "reviews"
      | "products"
      | "packages"
      | "footer"
    >; 
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