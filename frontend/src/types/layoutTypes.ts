import { Types } from 'mongoose';


export interface LayoutState {
    layouts: Layout[];
    activeLayout: Layout | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}
  

export interface Menubar {
    topbar?: {},
    sidebar?: {}
}
export interface Layout {
    name?: string;
    _id?: string;
    store?: Types.ObjectId | null,
    menubar?: Menubar;
}

export type SectionProps = {
    id?: string;
};