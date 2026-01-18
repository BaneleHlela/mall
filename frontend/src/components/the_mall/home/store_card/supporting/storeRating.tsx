import React from 'react';
import { IoIosStar } from 'react-icons/io';

export interface StoreRating {
  averageRating: number;
  numberOfRatings: number;
}

/**
 * Format rating for display - returns just the numerical rating
 * @param rating - Store rating object with averageRating and numberOfRatings
 * @returns Formatted rating string or fallback text
 */
export function formatStoreRating(rating?: StoreRating): string {
  if (!rating || rating.numberOfRatings === 0) {
    return 'No ratings';
  }
  
  return `${rating.averageRating} (${rating.numberOfRatings})`;
}

/**
 * Get star icon color based on rating
 * @param rating - Store rating object
 * @returns CSS color class for the star icon
 */
export function getStarIconColor(rating?: StoreRating): string {
  if (!rating || rating.numberOfRatings === 0) {
    return 'text-gray-400';
  }
  
  const avgRating = rating.averageRating;
  
  if (avgRating >= 4.0) {
    return 'text-yellow-500';
  } else if (avgRating >= 3.0) {
    return 'text-yellow-400';
  } else if (avgRating >= 2.0) {
    return 'text-orange-400';
  } else {
    return 'text-red-400';
  }
}

/**
 * Rating display component with IoIosStar icon
 * Format: <IoIosStar /> 4.92 (12)
 * @param rating - Store rating object
 * @param className - Additional CSS classes
 * @returns JSX element with star icon and rating text
 */
export function RatingDisplay({ 
  rating, 
  className = ""
}: { 
  rating?: StoreRating; 
  className?: string;
}) {
  const starColor = getStarIconColor(rating);
  
  if (!rating || rating.numberOfRatings === 0) {
    return (
      <div className={`flex items-center gap-[1px] ${className}`}>
        <IoIosStar className={`w-4 h-4 ${starColor}`} />
        <span className="text-gray-500">(0)</span>
      </div>
    );
  }
  
  return (
    <div className={`flex items-center gap-[1px] ${className}`}>
      <IoIosStar className={`text-[1.8vh] ${starColor}`} />
      <span className="text-gray-800">
        {rating.averageRating} ({rating.numberOfRatings})
      </span>
    </div>
  );
}

/**
 * Simple rating text for inline display
 * @param rating - Store rating object
 * @returns Formatted string for text display
 */
export function getRatingText(rating?: StoreRating): string {
  if (!rating || rating.numberOfRatings === 0) {
    return 'No ratings';
  }
  
  return `${rating.averageRating} (${rating.numberOfRatings})`;
}