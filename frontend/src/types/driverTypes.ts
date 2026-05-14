export interface Vehicle {
  type: 'bicycle' | 'motorbike' | 'car' | 'van' | 'truck';
  images: string[];
  truckCategory?: 'sand_and_blocks' | 'general' | 'both' | null;
  registrationNumber?: string;
}

export interface OperationTimes {
  alwaysOpen: boolean;
  sunday: { start: string; end: string; closed: boolean };
  monday: { start: string; end: string; closed: boolean };
  tuesday: { start: string; end: string; closed: boolean };
  wednesday: { start: string; end: string; closed: boolean };
  thursday: { start: string; end: string; closed: boolean };
  friday: { start: string; end: string; closed: boolean };
  saturday: { start: string; end: string; closed: boolean };
}

export interface Driver {
  _id: string;
  userId: string;
  accountStatus: 'pending' | 'active' | 'suspended' | 'banned';
  isLive: boolean;
  lastSeenAt?: Date;
  vehicle: Vehicle;
  alcoholDelivery: boolean;
  collectionZones: any[]; // GeoJSON zones
  deliveryZones: any[]; // GeoJSON zones
  documents: {
    idOrPassport?: any;
    criminalClearance?: any;
    driversLicence?: any;
    vehicleRegistration?: any;
  };
  rating: {
    average: number;
    count: number;
  };
  operationTimes: OperationTimes;
  earnings: any;
  createdAt: string;
  updatedAt: string;
}

export interface DriverState {
  driver: Driver | null;
  isLoading: boolean;
  error: string | null;
  message: string | null;
}