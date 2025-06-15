export interface Review {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    store: string;
    rating: number;
    comment: string;
    anonymous?: boolean;
    createdAt: string;
    updatedAt: string;
}
  