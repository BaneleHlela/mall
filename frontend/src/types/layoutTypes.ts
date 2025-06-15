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
    backgroundColor: string | undefined;
    fonts: Fonts;
    footer: any;
    name?: string;
    _id?: string;
    store?: Types.ObjectId | null,
    menubar?: Menubar;
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