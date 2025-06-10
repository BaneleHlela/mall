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


export interface Layout {
    footer: any;
    name?: string;
    _id?: string;
    store?: Types.ObjectId | null,
    menubar?: Menubar;
    hero?: any;
    bookWithCalendar?: any;
}

export type SectionProps = {
    id?: string;
};