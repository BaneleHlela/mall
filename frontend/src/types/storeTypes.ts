import { Types } from "mongoose";

export interface Logo {
  url?: string;
  text?: string;
}

export interface TeamMember {
  member: Types.ObjectId | string; 
  role: "owner" | "manager" | "staff" | "viewer"; 
}
export interface Image {
  _id: string;
  category?: string; 
  description?: string; 
  url: string; 
  hasMore?: boolean;
}
export interface Socials {
  platform: "facebook" | "twitter" | "instagram" | "linkedin" | "pinterest" | "youtube" | "whatsapp" | "phone";
  url: string;
}

export interface Store {
  _id?: string; 
  description: string;
  name: string;
  logo: Logo;
  isDemo?: boolean;
  trades: string[];
  slogan: string;
  departments: string[]; 
  layouts: Types.ObjectId[] | string[];  
  categories: {
    products: string[]; 
    services: string[]; 
  };
  about: string;
  team: TeamMember[]; 
  updatedAt?: Date; 
  socials?: Socials[]; 
  contact: {
    phone: string;
    email: string;
  }, 
  locations: Array<{
    nickname: string;   
    lat: number;   
    lng: number  
    address: string; 
  }>;
  location: {
    nickname: string;   
    lat: number;   
    lng: number  
    address: string;
  }
  images?: Image[];
  operationTimes?: OperationTimes;
}

export interface OperationTimes {
  alwaysOpen: boolean;
  sunday: {
    start: string;
    end: string;
    closed: boolean;
  };
  monday: {
    start: string;
    end: string;
    closed: boolean;
  };
  tuesday: {
    start: string;
    end: string;
    closed: boolean;
  };
  wednesday: {
    start: string;
    end: string;
    closed: boolean;
  };
  thursday: {
    start: string;
    end: string;
    closed: boolean;
  };
  friday: {
    start: string;
    end: string;
    closed: boolean;
  };
  saturday: {
    start: string;
    end: string;
    closed: boolean;
  };
}
