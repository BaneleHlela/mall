export interface StoreRating {
  averageRating: number;
  numberOfRatings: number;
}

/**
 * Format rating for display with star icon and numerical rating
 * @param rating - Store rating object with averageRating and numberOfRatings
 * @returns Formatted rating string or fallback text
 */
export function formatStoreRating(rating?: StoreRating): string {
  if (!rating || rating.numberOfRatings === 0) {
    return 'No ratings';
  }
  
  return `${rating.averageRating}/5`;
}

/**
 * Get star icon component props based on rating
 * @param rating - Store rating object
 * @returns Object with star color and fill properties
 */
export function getStarIconProps(rating?: StoreRating): {
  color: string;
  filled: boolean;
} {
  if (!rating || rating.numberOfRatings === 0) {
    return {
      color: 'text-gray-400',
      filled: false
    };
  }
  
  const avgRating = rating.averageRating;
  
  if (avgRating >= 4.0) {
    return {
      color: 'text-yellow-500',
      filled: true
    };
  } else if (avgRating >= 3.0) {
    return {
      color: 'text-yellow-400',
      filled: true
    };
  } else if (avgRating >= 2.0) {
    return {
      color: 'text-orange-400',
      filled: true
    };
  } else {
    return {
      color: 'text-red-400',
      filled: true
    };
  }
}

/**
 * Get rating text with star emoji for simple display
 * @param rating - Store rating object
 * @returns Formatted string with star emoji and rating
 */
export function getRatingWithStar(rating?: StoreRating): string {
  if (!rating || rating.numberOfRatings === 0) {
    return '⭐ No ratings';
  }
  
  return `⭐ (${rating.averageRating}/5)`;
}