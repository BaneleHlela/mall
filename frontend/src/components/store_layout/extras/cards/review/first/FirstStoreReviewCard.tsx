import React from "react";
import StarDisplay from "../supporting/StarDisplay";
import type { ReviewCardProps } from "../StoreReviewCard";
import { getBorderStyles } from "../../../../../../utils/stylingFunctions";

const FirstStoreReviewCard: React.FC<ReviewCardProps> = ({ reviewerName, review, rating, anonymous, style }) => {
  return (
    <div 
        style={{
            backgroundColor: style.backgroundColor,
            ...getBorderStyles(style.border),
        }}
        className={`max-w-[500px] overflow-hidden hover:scale-102 p-4 bg-white
            ${style.shadow && `shadow-md`}`}
    >
      {/* Top left - Stars */}
      <div className="">
        <StarDisplay rating={rating} style={{ type: "sharp", color: "black" }} />
      </div>
      {/* Middle - Review */}
      <p className={`mt-2 text-sm text-gray-600`}>
        "{review}"
      </p>

      {/* Bottom right - Reviewer name */}
      <div className={`capitalize mt-3 text-right text-sm font-medium text-gray-800`}>
        - {anonymous ? "Anonymous Mbumbulu" : reviewerName}
      </div>
    </div>
  );
};

export default FirstStoreReviewCard;