import type { ObjectId } from "mongoose";

export interface User {
    _id: string | ObjectId; 
    firstName: string; 
    lastName: string;
    username: string; 
    email: string; 
    mobile?: string; 
    password: string; 
    role: string; 
    avatar: string;
    stores: string[];
    isBlocked: boolean;
    cart: string[];
    address: string[];
    locations?: Array<{
        nickname: string;   
        lat: number;   
        lng: number  
        address: string; 
    }>;
    wishlist: string[];
    favoriteStore?: string[];
    refreshToken?: string;
    createdAt: string;
    updatedAt: string;
    isVerified?: string;
    favoteStores?: string[] | ObjectId[];
}
  
export interface UserState {
user: User | null;
isAuthenticated: boolean;
isLoading: boolean;
isCheckingAuth: boolean;
error: string | null;
message: string | null;
}
  