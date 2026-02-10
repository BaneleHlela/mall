export interface BookingItem {
    itemType: 'Service' | 'Package';
    item: string;
    startTime: string;
    endTime: string;
    duration: number;
    staff: string;
    notes?: string;
}

export interface Booking {
    _id: string;
    user: string;
    store: string;
    bookingDate: string;
    items: BookingItem[];
    status: 'Pending' | 'Confirmed' | 'Rejected' | 'Cancelled';
    createdAt: string;
    updatedAt: string;
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
