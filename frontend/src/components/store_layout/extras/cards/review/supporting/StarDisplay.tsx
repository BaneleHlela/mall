import React from "react";
import {
  FaStar, FaRegStar, FaStarHalfAlt, // Rounded
} from "react-icons/fa";
import {
  TiStarFullOutline, TiStarHalfOutline, TiStarOutline, // Playful
} from "react-icons/ti";
import {
  IoStar, IoStarHalf, IoStarOutline, // Normal
} from "react-icons/io5";
import {
  MdOutlineStar, MdOutlineStarBorder, MdOutlineStarHalf, // Sharp
} from "react-icons/md";

interface StarDisplayProps {
  rating: number;
  style: {
    type: "sharp" | "rounded" | "playful" | "normal";
    color: string;
    size: string | number; // Added size as a prop
  };
}

const StarDisplay: React.FC<StarDisplayProps> = ({ rating, style }) => {
  const iconSet = {
    sharp: { full: MdOutlineStar, half: MdOutlineStarHalf, empty: MdOutlineStarBorder },
    rounded: { full: FaStar, half: FaStarHalfAlt, empty: FaRegStar },
    playful: { full: TiStarFullOutline, half: TiStarHalfOutline, empty: TiStarOutline },
    normal: { full: IoStar, half: IoStarHalf, empty: IoStarOutline },
  }[style.type];

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i + 1 <= Math.floor(rating);
    const hasHalf = i + 1 === Math.ceil(rating) && rating % 1 !== 0;

    return filled ? (
      <iconSet.full key={i} className="text-xl" style={{ color: style.color, fontSize: style.size }}/>
    ) : hasHalf ? (
      <iconSet.half key={i} className="text-xl" style={{ color: style.color, fontSize: style.size }} />
    ) : (
      <iconSet.empty key={i} className="text-xl" style={{ color: style.color, fontSize: style.size }} />
    );
  });

  return <div className="flex space-x-[.5px]">{stars}</div>;
};

export default StarDisplay;
