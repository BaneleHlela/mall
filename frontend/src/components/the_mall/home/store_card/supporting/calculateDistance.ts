import type { User } from '../../../../../types/userTypes';
import type { Store } from '../../../../../types/storeTypes';
import { Store } from 'lucide-react';

/**
 * Calculate the distance between two points on Earth using the Haversine formula
 * @param lat1 - Latitude of first point
 * @param lng1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lng2 - Longitude of second point
 * @returns Distance in kilometers
 */
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in kilometers
  
  // Convert degrees to radians
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

/**
 * Calculate the distance between user's first location and store location
 * @param user - User object with locations array
 * @param store - Store object with location
 * @returns Distance in kilometers rounded to 2 decimal places, or null if locations are missing
 */
export function calculateDistanceToStore(user: User, store: Store): number | null {
  // Check if user has locations and store has location
  console.log(store, user)
  if (!user.locations || user.locations.length === 0 || !store.location) {
    return null;
  }
  
  const userLocation = user.locations[0];
  const storeLocation = store.location;
  
  // Check if coordinates are valid
  if (
    typeof userLocation.lat !== 'number' || 
    typeof userLocation.lng !== 'number' ||
    typeof storeLocation.lat !== 'number' || 
    typeof storeLocation.lng !== 'number'
  ) {
    return null;
  }
  
  const distance = haversineDistance(
    userLocation.lat,
    userLocation.lng,
    storeLocation.lat,
    storeLocation.lng
  );
  
  // Round to 2 decimal places
  return Math.round(distance * 100) / 100;
}

/**
 * Format distance for display
 * @param distance - Distance in kilometers
 * @returns Formatted string with "km" suffix, or "100+ km" if greater than 100
 */
export function formatDistance(distance: number | null): string {
    if (distance === null) {
      return '? km';
    }
  
    if (distance > 100) {
      return '100+ km';
    }
  
    return `${distance.toFixed(2)} km`;
}
  