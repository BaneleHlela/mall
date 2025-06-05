export interface Product {
    _id: string;
    name: string;
    price: number;
    stockQuantity: number;
    sold: number;
}

export interface  StockUpdatePayload {
    productId: string;
    quantity: number;
}

export interface ProductsState {
    products: Product[];
    loading: boolean;
    error: string | null;
    selectedProduct: Product | null;
}
