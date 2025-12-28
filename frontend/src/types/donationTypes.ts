export interface Donation {
  _id: string;
  store: string;
  name: string;
  description: string;
  slug: string;
  images: string[];
  ratings: string[];
  isActive?: boolean;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DonationsState {
  donations: Donation[];
  isLoading: boolean;
  error: string | null;
  selectedDonation: Donation | null;
}