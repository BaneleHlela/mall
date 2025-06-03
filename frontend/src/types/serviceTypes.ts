export interface Service {
    _id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    store: string;
    thumbnail?: string;
    images?: string[];
    category?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ServicesState {
    services: Service[];
    loading: boolean;
    error: string | null;
}