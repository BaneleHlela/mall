// Define types for cart items and cart state
export interface CartItem {
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
    store: string;
    items: CartItem[];
    totalPrice: number;
}
  
export interface CartState {
    cart: Cart[];
    loading: boolean;
    error: string | null;
}
  