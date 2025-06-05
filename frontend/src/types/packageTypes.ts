export interface Package {
    _id: string;
    name: string;
    price: number;
    storeId: string;
    deleted?: boolean;
    // ...any other fields
  }
  
  export interface PackagesState {
    packages: Package[];
    loading: boolean;
    error: string | null;
  }
  