import type { Store } from "./storeTypes";

export interface PackageDuration {
  expires?: boolean;
  format?: 'days' | 'weeks' | 'months' | 'years';
  count?: number;
}

export interface UserPackage {
  _id: string;
  user: string;
  package: Package;
  store: string;
  sessionsTotal: number;
  sessionsRemaining: number;
  status: 'active' | 'completed' | 'expired' | 'cancelled';
  purchaseDate: string;
  expiryDate: string;
  pricePaid: number;
  createdAt: string;
  updatedAt: string;
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
  createdAt?: string;
  updatedAt?: string;
}
  
export interface PackagesState {
  packages: Package[];
  loading: boolean;
  error: string | null;
}
