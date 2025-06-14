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
  trades: number;
  slogan: string;
  departments: string[]; 
  layouts: Types.ObjectId[]; 
  categories: {
    products: string[]; 
    services: string[]; 
  };
  about: string;
  team: TeamMember[]; 
  updatedAt?: Date; 
  locations?: Array<{
    nickname: string;   
    lat: number;   
    lng: number  
    address: string; 
  }>;
  images?: {
    images: Image[];
    hasMore?: boolean;
  }
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
