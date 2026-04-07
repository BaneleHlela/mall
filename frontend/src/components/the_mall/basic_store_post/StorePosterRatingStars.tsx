import React from "react";
import { FaRegStar, FaStar, FaStarHalf } from "react-icons/fa";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

interface StorePosterRatingStarsProps {
  rating: number; // Example: 4.5
  size?: string;  // Optional size (e.g. "2.2vh" or "20px")
  color?: string; // Optional color (e.g. "text-yellow-400")
}

const StorePosterRatingStars: React.FC<StorePosterRatingStarsProps> = ({ rating, size = "2.2vh", color = "text-amber-500" }) => {
  // Clamp rating between 0–5
  const safeRating = Math.min(Math.max(rating, 0), 5);

  // Calculate how many full, half, and empty stars
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex gap-[.3vh] ${color}`}>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className={`text-[${size}]`} />
      ))}
      {hasHalfStar && <FaStarHalf key="half" className={`text-[${size}]`} />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className={`text-[${size}]`} />
      ))}
    </div>
  );
};

export default StorePosterRatingStars;
