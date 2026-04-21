export interface OrderItem {
  product: {
    _id: string;
    name: string;
    slug?: string;
    images?: string[];
    price?: number;
    prices?: { amount: number; label?: string }[];
  };
  variation?: string;
  specialRequest?: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  nickname?: string;
  lat?: number;
  lng?: number;
  address?: string;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  }; // Populated user
  store: string | {
    _id: string;
    name: string;
    slug: string;
    thumbnails: any;
  }; // Store ID
  orderId: string;
  items: OrderItem[];
  totalPrice: number;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  paymentMethod: 'cash' | 'online' | 'card';
  deliveryStatus: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Collected';
  deliveryOption: 'Delivery' | 'Pick Up';
  shippingAddress?: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersState {
  orders: Order[];
  orderAnalytics: {
    totalOrders: number;
    totalOrderedItems: number;
    completedOrders: number;
    returnedOrders: number;
    cancelledOrders: number;
    percentages?: {
      totalOrders: number;
      totalOrderedItems: number;
      completedOrders: number;
      cancelledOrders: number;
    };
  };
  isLoading: boolean;
  error: string | null;
  selectedOrder: Order | null;
}

export type TimeframeType = 'today' | 'week' | 'month' | 'all-time';