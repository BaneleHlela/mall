import { Types } from "mongoose";

export interface Logo {
  url?: string;
  text?: string;
}

export interface TeamMember {
  member: Types.ObjectId; 
  role: "owner" | "manager" | "staff" | "viewer"; 
}
export interface Image {
  category?: string; 
  description?: string; 
  url?: string; 
}

export interface Store {
  _id?: string; 
  description: string;
  name: string;
  logo: Logo;
  slogan: string;
  departments: string[]; 
  layouts: Types.ObjectId[]; 
  about: string;
  team: TeamMember[]; 
  updatedAt?: Date; 
  images?: {
    images: Image[];
    hasMore?: boolean;
  }
}