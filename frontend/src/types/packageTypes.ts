import type { Store } from "./storeTypes";

export interface PackageDuration {
  expires?: boolean;
  format?: 'days' | 'weeks' | 'months' | 'years';
  count?: number;
}

export interface PackageSessions {
  amount: number;
  duration: number; // in minutes
}

export interface Package {
  _id: string;
  name: string;
  price: number;
  store: string;
  category?: string;
  description?: string;
  duration?: PackageDuration;
  isHighlighted?: boolean;
  label?: string;
  frequency?: 'once' | 'monthly' | 'yearly' | 'custom';
  sessions?: PackageSessions;
  features?: string[];
  discountPercentage?: number;
  isActive?: boolean;
  deleted?: boolean;
  staff: string[]; // Staff members who can perform this package
  purchaseCount?: number; // Total purchases of this package
  likesCount?: number; // Total likes on this package
  createdAt?: string;
  updatedAt?: string;
}

export interface StoreInfo {
  _id: string;
  name: string;
}

export interface UserPackage {
  _id: string;
  user: string;
  package: Package | string;
  store: string | StoreInfo;
  sessionsTotal: number;
  sessionsRemaining: number;
  status: 'active' | 'completed' | 'expired' | 'cancelled';
  purchaseDate: string;
  expiryDate: string;
  pricePaid: number;
  createdAt: string;
  updatedAt: string;
}
  
export interface PackagesState {
  packages: Package[];
  storePackages: Package[];
  userPackages: UserPackage[];
  loading: boolean;
  error: string | null;
}
