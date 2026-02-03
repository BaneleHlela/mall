export interface PackageDuration {
  expires?: boolean;
  format?: 'days' | 'weeks' | 'months' | 'years';
  count?: number;
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
  sessions?: number;
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
