import React from 'react'
import StorePosterRatingStars from '../basic_store_post/StorePosterRatingStars'

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
  console.log(review);
  const displayName = review.anonymous ? "Anonymous" : review.user?.username || "Unknown User"
  const avatarSrc = review.anonymous
    ? "https://api.dicebear.com/7.x/initials/svg?seed=Anonymous"
    : review.user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${review.user?.username}`

  return (
    <div className="flex justify-evenly items-start w-full ">
      {/* Avatar */}
      <div className="flex items-start w-[9%] aspect-square overflow-hidden">
        <img
          src={avatarSrc}
          alt={displayName}
          className="w-full aspect-square rounded-full object-cover bg-gray-200"
        />
      </div>

      {/* Review content */}
      <div className="flex flex-col w-[85%] bg-blue-400 rounded p-3">
        {/* Stars and name */}
        <div className="w-full flex justify-between items-center text-white">
          <p className="font-[500]">@{displayName}</p>
          <StorePosterRatingStars rating={review.rating} />
        </div>

        {/* Comment */}
        <div className="w-full text-white mt-1">
          <p>{review.comment}</p>
        </div>
      </div>
    </div>
  )
}

export default HomePageReview
