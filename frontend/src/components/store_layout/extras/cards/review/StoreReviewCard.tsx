import React from 'react';
import FirstStoreReviewCard from './first/FirstStoreReviewCard';

export interface ReviewCardProps {
  reviewerName: string;
  review: string;
  rating: number;
  anonymous: boolean;
  style: any;
}

const StoreReviewCard: React.FC<ReviewCardProps> = ({ reviewerName, review, rating, anonymous, style }) => {
  return (
    <FirstStoreReviewCard 
      reviewerName={reviewerName}
      review={review}
      rating={rating}
      anonymous={anonymous}
      style={style}
    />
  );
};

export default StoreReviewCard;