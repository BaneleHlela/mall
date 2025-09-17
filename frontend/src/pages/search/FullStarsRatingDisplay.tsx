import React from "react";
import { IoStar, IoStarHalf } from "react-icons/io5";

interface FullStarsRatingDisplayProps {
  rating: number; // e.g., 4.3
}

const FullStarsRatingDisplay: React.FC<FullStarsRatingDisplayProps> = ({ rating }) => {
  // Make sure rating is between 0 and 5
  const normalizedRating = Math.max(0, Math.min(5, rating));
  
  // Generate array of 5 elements (positions 1 through 5)
  const stars = Array.from({ length: 5 }, (_, i) => {
    const starNumber = i + 1;
    if (normalizedRating >= starNumber) {
      // Full star
      return <IoStar key={i} className="text-black text-xl" />;
    } else if (normalizedRating >= starNumber - 0.5) {
      // Half star
      return <IoStarHalf key={i} className="text-black text-xl" />;
    } else {
      // Empty star
      return <IoStar key={i} className="text-gray-300 text-xl" />;
    }
  });

  return (
    <div className="flex items-center space-x-1">
      {stars}
      <span className="ml-2 text-gray-700 text-sm font-medium">
        {normalizedRating.toFixed(1)}
      </span>
    </div>
  );
};

export default FullStarsRatingDisplay;
