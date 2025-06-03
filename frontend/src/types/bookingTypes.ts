export interface Booking {
    _id: string;
    user: string;
    store: string;
    service: string;
    staff: string;
    date: string; // ISO format
    time: string; // HH:mm
    status?: string;
    [key: string]: any; // for any extra dynamic fields
}
  
export interface AvailableTimes {
    [key: string]: string[]; // e.g., { "2025-06-03": ["09:00", "10:00"] }
}
  
export interface BookingsState {
    bookings: Booking[];
    availableTimes: AvailableTimes;
    loading: boolean;
    error: string | null;
}
