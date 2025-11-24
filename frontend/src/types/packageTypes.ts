export interface Package {
    _id: string;
    name: string;
    price: number;
    storeId: string;
    deleted?: boolean;
    isActive?: boolean;
    duration?: {
      expires: boolean;
      format: 'days' | 'weeks' | 'months' | 'years';
      count: number;
    };
    // ...any other fields
  }
  
  export interface PackagesState {
    packages: Package[];
    loading: boolean;
    error: string | null;
  }
  