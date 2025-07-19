export interface Service {
    _id: string | null;
    name: string;
    description: string;
    price: number;
    duration: number;
    store: string;
    thumbnail?: string;
    images?: string[];
    category?: string;
    performers?: Performer[]; // Added performers field
    createdAt?: string;
    updatedAt?: string;
}

export interface Performer {
    user: string; // ObjectId as a string
    name: string;
}

export interface ServicesState {
    services: Service[];
    isLoading: boolean;
    error: string | null;
    selectedService?: Service | null;
}