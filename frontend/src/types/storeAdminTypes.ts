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
    analytics: Analyitics | null;
    isLoading: boolean;
    error: string | null;
}