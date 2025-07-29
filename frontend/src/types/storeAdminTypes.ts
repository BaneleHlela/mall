import type { Store } from "./storeTypes";

export interface Analyitics {
    totalVisits: Number;
    totalProducts?: Number;
    totalServices?: Number;
    totalSales?: Number;
    totalRevenue?: Number;
}

// Initial state for store settings
export interface StoreAdmin {
    store: Store | null;
    analytics: any; // or proper type
    isLoading: boolean;
    error: string | null;
    recommendedStoreDesigns: Store[] | null;
    searchResults: Array<{
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
    }>;
  }
  