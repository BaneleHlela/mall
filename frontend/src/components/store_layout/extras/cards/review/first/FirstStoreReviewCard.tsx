import React from "react";
import StarDisplay from "../supporting/StarDisplay";
import type { ReviewCardProps } from "../StoreReviewCard";
import { getBackgroundStyles, getTextStyles } from "../../../../../../utils/stylingFunctions";

const FirstStoreReviewCard: React.FC<ReviewCardProps> = ({ reviewerName, review, rating, anonymous, style }) => {
  console.log(reviewerName)
  return (
    <div 
        style={{
            backgroundColor: style.background.color,
            ...getBackgroundStyles(style.background),
        }}
        className={`flex max-h-[250px] overflow-clip hide-scrollbar lg:max-h-[400px]  flex-col justify-between hover:scale-102 p-4 bg-white
            ${style.background.shadow && `shadow-md`}`}
    >
      {/* Top left - Stars */}
      <div className="">
        <StarDisplay rating={rating} style={{...style.stars}} />
      </div>
      {/* Middle - Review */}
      <p
        style={{
          ...getTextStyles(style.text.comment),
        }} 
        className={`mt-2 text-sm text-gray-600`}
      >
        "{review}"
      </p>

      {/* Bottom right - Reviewer name */}
      <div 
        style={{
          ...getTextStyles(style.text.name),
        }} 
        className={`capitalize mt-3
          ${style.text.name.position === 'start' && 'text-start'}
          ${style.text.name.position === 'center' && 'text-center'}
          ${style.text.name.position === 'end' && 'text-end'}
        `}>
         {anonymous ? "Anonymous Mbumbulu" : reviewerName}
      </div>
    </div>
  );
};

export default FirstStoreReviewCard;