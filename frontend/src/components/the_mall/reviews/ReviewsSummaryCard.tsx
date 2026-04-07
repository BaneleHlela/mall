import React from 'react'
import { FaStar } from 'react-icons/fa';

interface ReviewsSummaryCardProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: number[]; // [5-star count, 4-star count, ..., 1-star count]
}

const ReviewsSummaryCard: React.FC<ReviewsSummaryCardProps> = ({ averageRating, totalReviews, ratingDistribution }) => {
  return (
    <div className='flex items-center w-full p-3 bg-gray-100 rounded-lg'>
        {/* Overall Rating & Number of Reviews */}
        <div className="flex flex-col items-center justify-around w-[35%] h-full">
            {/* Star and Rating */}
            <div className="flex items-center justify-center w-full space-x-2">
                <FaStar className="text-amber-500 text-[3.5vh] mr-2" />
                <span className="text-[3.2vh] font-semibold">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-[2vh] text-gray-500">{totalReviews} Reviews</p>
        </div>
        {/* Rating Distribution */}
        <div className="w-[65%] h-full">
            <div className="flex flex-col ml-2">
                {[...Array(5)].map((_, i) => {
                    const count = ratingDistribution[i];
                    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                    return (
                        <div key={i} className='flex items-center'>
                            <div className="w-full h-2 bg-gray-200 rounded mr-2">
                                <div className="h-2 bg-amber-500 rounded" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <div className="flex flex-row text-[1.5vh] text-gray-500 line">
                                <p className="">{5 - i}</p> 
                                <p className="line-clamp-1">({count})</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  )
}

export default ReviewsSummaryCard;