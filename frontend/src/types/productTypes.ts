export interface Product {
    marking: string | undefined;
    _id: string;
    store: string;
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
}

export interface  StockUpdatePayload {
    productId: string;
    quantity: number;
}

export interface ProductsState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
    selectedProduct: Product | null;
}
