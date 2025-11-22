import { Types } from "mongoose";

export interface Logo {
  url?: string;
  text?: string;
}

export interface TeamMember {
  _id: Types.ObjectId | string;
  member: string; // user ID
  username: string;
  firstName: string;
  lastName: string;
  about: string;
  image?: string;
  role: "owner" | "manager" | "staff" | "viewer" | "admin";
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
  isVerified: any;
  _id?: string;
  slug: string;
  description: string;
  thumbnail: string;
  thumbnails: {
    storeCard: string;
    profily: string;
  };
  name: string;
  nickname?: string;
  logo: Logo;
  isDemo?: boolean;
  trades: string[];
  slogan: string;
  departments: string[];
  layouts: Types.ObjectId[] | string[];
  categories?: {
    products?: string[];
    services?: string[];
  };
  about: string;
  team: TeamMember[];
  updatedAt?: Date;
  socials?: Socials[];
  contact: {
    phone: string;
    email: string;
  },
  location: {
    type: string;
    coordinates: [number, number]; // [lng, lat]
    nickname?: string;
    address?: string;
  }
  images?: Image[];
  operationTimes?: OperationTimes;
  rating?: {
    averageRating: number;
    numberOfRatings: number;
  };
  likes: {
    count: number;
    users: string[]; 
  }
  flag?: {
    red: boolean;
    level: 1 | 2 | 3 | 4 | 5;
  };
  visits: Number;
  manualStatus?: {
    isOverridden: boolean;
    status: 'open' | 'closed';
    overriddenAt?: Date;
    overriddenBy?: string;
  };
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
