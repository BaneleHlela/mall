export interface Service {
    _id: string | null;
    name: string;
    description: string;
    price?: number;
    duration: number;
    store: string;
    images?: string[];
    category?: string;
    slug: string;
    performers?: Performer[]; // ObjectId[] as strings
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface ServicesState {
    services: Service[];
    isLoading: boolean;
    error: string | null;
    selectedService?: Service | null;
}

interface Performer {
    _id: string;
    firstName: string;
    lastName: string;
}