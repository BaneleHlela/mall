export interface ProductStoreInfo {
    _id: string;
    name: string;
    slug: string;
}

export interface ProductStats {
    views: number;
    purchases: number;
    ratingSummary: {
        averageRating: number;
        numberOfRatings: number;
        reviews: string[];
    };
}

export interface Product {
    marking: string | undefined;
    _id: string;
    store: ProductStoreInfo;
    name: string;
    description: string;
    price: number;
    prices: [{
        variation: string;
        amount: number;
    }],
    stockQuantity: number;
    sold: number;
    variations: string[],
    images: string[];
    slug: string;
    category?: string;
    isActive?: boolean;
    tags?: string[];
    stats: ProductStats;
    ratings: string[];
    visits: number;
}

export interface  StockUpdatePayload {
    productId: string;
    quantity: number;
}

export interface ProductsState {
    products: Product[];
    productsByStoreSlug: { [storeSlug: string]: Product[] };
    isLoading: boolean;
    error: string | null;
    selectedProduct: Product | null;
}
