import { type User } from "./userTypes";

export interface AdminState {
    users: User[];
    selectedUser: User | null;
    isLoading: boolean;
    error: string | null;
    message: string | null;
}
  