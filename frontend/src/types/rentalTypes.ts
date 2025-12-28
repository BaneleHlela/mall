export interface Rental {
  _id: string;
  name: string;
  description: string;
  price: {
    value: number;
    unit: string;
  };
  duration: {
    value: number;
    unit: string;
  };
  store: string;
  images: string[];
  category?: string;
  slug: string;
  isActive: boolean;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RentalsState {
  rentals: Rental[];
  currentRental: Rental | null;
  loading: boolean;
  error: string | null;
}