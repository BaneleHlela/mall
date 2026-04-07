import React from 'react'
import StorePosterRatingStars from '../basic_store_post/StorePosterRatingStars'
import { BsThreeDotsVertical } from 'react-icons/bs'

interface HomePageReviewProps {
  review: {
    anonymous: boolean
    user: {
      username: string
      avatar: string
    }
    rating: number
    comment: string
  }
}

const HomePageReview: React.FC<HomePageReviewProps> = ({ review }) => {
  const displayName = review.anonymous ? "Anonymous" : review.user?.username || "Anonymous User"
  const avatarSrc = review.anonymous
    ? "https://api.dicebear.com/7.x/initials/svg?seed=Anonymous"
    : review.user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${review.user?.username}`

  return (
    <div className="flex flex-col w-full border-gray-300 pb-2">
      {/* Avatar, Name and Surname */}
      <div className="flex w-full">
        {/* Avatar */}
        <div className="flex items-start w-[12%] max-w-[30px] aspect-square overflow-hidden">
          <img
            src={avatarSrc}
            alt={displayName}
            className="w-full aspect-square rounded-full object-cover bg-gray-200"
          />
        </div>
        {/* Name, Surname & Username*/}
        <div className="flex items-center justify-between mb-1 w-[88%] ml-1 text-[2.2vh]">
          <p className="">@{displayName}</p>
          <BsThreeDotsVertical />
        </div>
      </div>
      {/* Date & Rating */}
      <div className="flex items-center text-[1.6vh] text-gray-800 space-x-2">
        <StorePosterRatingStars 
          rating={review.rating} 
          size="1.6vh"
        />
        <span>24 May 2026</span>
      </div>

      {/* Comment */}
      <p className='mt-1'>{review.comment}</p>
    </div>
  )
}

export default HomePageReview
