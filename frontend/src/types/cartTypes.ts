import type { Store } from "./storeTypes";

// Define types for cart items and cart state
export interface CartItem {
    _id: string | null | undefined;
    product: {
      _id: string;
      name: string;
      price: number;
    };
    quantity: number;
    specialRequest?: string;
}
  
export  interface Cart {
    _id: string;
    user: string;
    store: Partial<Store>;
    items: CartItem[];
    totalPrice: number;
}
  
export interface CartState {
    cart: Cart[];
    isLoading: boolean;
    error: string | null;
}
  