import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { IoArrowBack, IoSend, IoClose } from "react-icons/io5";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import HomePageReview from "../../components/the_mall/home/HomePageReview";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getStoreReviews, createReview, clearReviewError, clearReviewMessage } from "../../features/reviews/reviewSlice";
import { getPostReviews, createPostReview, getPostStats, setPostReviewModalOpen } from "../../features/posts/postSlice";
import { fetchStoreBySlug } from "../../features/stores/storeSlice";
import axios from "axios";
import ReviewsSummaryCard from "../../components/the_mall/reviews/ReviewsSummaryCard";

interface AllReviewsProps {
  isOpen: boolean;
  onClose: () => void;
  postIdentifier?: string;
  storeSlug?: string;
  isMall?: boolean;
}

const AllReviews: React.FC<AllReviewsProps> = ({
  isOpen,
  onClose,
  postIdentifier,
  storeSlug,
  isMall = false
}) => {
  const dispatch = useAppDispatch();
  
  // Determine what we're showing reviews for
  const isPost = !!postIdentifier;
  const isStore = !!storeSlug && !isMall;
  
  // State
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [targetStore, setTargetStore] = useState<any>(null);
  const [targetPost, setTargetPost] = useState<any>(null);
  
  // Form state
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [anonymous, setAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const user = useAppSelector((state) => state.user.user);
  const { isLoading: reviewLoading, error, message } = useAppSelector((state) => state.reviews);

  // Handle close modal
  const handleClose = () => {
    onClose();
  };

  // Fetch reviews based on URL params
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setReviews([]);
      
      try {
        if (isPost && postIdentifier) {
          // Fetch reviews for a specific post
          const resultAction = await dispatch(getPostReviews(postIdentifier));
          if (getPostReviews.fulfilled.match(resultAction)) {
            setReviews(resultAction.payload.data || []);
          }
          
          // Also get post details
          try {
            const postResponse = await axios.get(`/api/posts/${postIdentifier}`);
            setTargetPost(postResponse.data);
          } catch (err) {
            console.error("Error fetching post:", err);
          }
          
        } else if (isStore && storeSlug) {
          // Fetch reviews for a specific store
          const storeResult = await dispatch(fetchStoreBySlug(storeSlug));
          if (fetchStoreBySlug.fulfilled.match(storeResult)) {
            const store = storeResult.payload;
            setTargetStore(store);
            
            const storeId = store._id;
            if (storeId) {
              const reviewsResult = await dispatch(getStoreReviews(storeId));
              if (getStoreReviews.fulfilled.match(reviewsResult)) {
                setReviews(reviewsResult.payload || []);
              }
            }
          }
          
        } else if (isMall) {
          // Fetch reviews for "themall" store
          const storeResult = await dispatch(fetchStoreBySlug("themall"));
          if (fetchStoreBySlug.fulfilled.match(storeResult)) {
            const store = storeResult.payload;
            setTargetStore(store);
            
            const storeId = store._id;
            if (storeId) {
              const reviewsResult = await dispatch(getStoreReviews(storeId));
              if (getStoreReviews.fulfilled.match(reviewsResult)) {
                setReviews(reviewsResult.payload || []);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (isOpen) {
      fetchReviews();
    }
  }, [dispatch, isPost, postIdentifier, isStore, storeSlug, isMall, isOpen]);

  // Clear Redux messages when unmounting
  useEffect(() => {
    return () => {
      dispatch(clearReviewError());
      dispatch(clearReviewMessage());
    };
  }, [dispatch]);

  // Update post review modal state and fetch stats when modal opens for a post
  useEffect(() => {
    if (isOpen && isPost && postIdentifier) {
      dispatch(setPostReviewModalOpen(true));
      dispatch(getPostStats(postIdentifier));
    }
  }, [dispatch, isOpen, isPost, postIdentifier]);

  // Reset post review modal state when modal closes
  useEffect(() => {
    if (!isOpen) {
      dispatch(setPostReviewModalOpen(false));
    }
  }, [dispatch, isOpen]);

  // Submit review for store (themall or specific store)
  const handleStoreReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || rating === 0 || !targetStore) return;
    
    setIsSubmitting(true);
    try {
      const resultAction = await dispatch(
        createReview({ store: targetStore._id, rating, comment, anonymous })
      );
      
      if (createReview.fulfilled.match(resultAction)) {
        setReviews((prev) => [resultAction.payload, ...prev]);
        setComment("");
        setRating(0);
        setAnonymous(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit review for post
  const handlePostReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || rating === 0 || !postIdentifier) return;
    
    setIsSubmitting(true);
    try {
      const resultAction = await dispatch(
        createPostReview({ identifier: postIdentifier, rating, comment, anonymous })
      );
      
      if (createPostReview.fulfilled.match(resultAction)) {
        setReviews((prev) => [resultAction.payload.data, ...prev]);
        setComment("");
        setRating(0);
        setAnonymous(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
    : 0;

  // Calculate rating distribution [5-star count, 4-star count, ..., 1-star count]
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    const rating = Math.floor(review.rating || 0);
    if (rating >= 1 && rating <= 5) {
      ratingDistribution[5 - rating]++; // 5 stars at index 0, 1 star at index 4
    }
  });

  // Get title based on what's being viewed
  const getTitle = () => {
    if (isPost && targetPost) {
      return "Post Reviews";
    }
    if (isStore && targetStore) {
      return "Store Reviews";
    }
    if (isMall) {
      return "The Mall Reviews";
    }
    return "Reviews";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl h-[85vh] max-h-[85vh] overflow-hidden flex flex-col max-w-[400px] lg:left-10"
        >
          {/* Header with Close Button */}
          <div className="relative w-full max-w-4xl p-2 mb-4 flex items-center justify-center shadow">
            <button
              onClick={handleClose}
              className="absolute left-2 flex items-center text-black hover:text-amber-600 transition-colors"
            >
              <IoClose className="text-[3vh] mr-2" />
            </button>

            <p className="text-[2.2vh] font-[500]">{getTitle()}</p>
          </div>

      {/* Reviews Summary Component */}
      <div className="p-2 w-full">
        <ReviewsSummaryCard
          averageRating={avgRating}
          totalReviews={reviews.length}
          ratingDistribution={ratingDistribution}
        />
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl px-3">
        {/* Overview */}
        {/* <div className="w-full bg-black text-white rounded-[1vh] py-[1vh] px-[1.5vh] mb-4">
          <p className="font-semibold space-x-1 flex items-center">
            <span>MayI Overview</span>
            <TipsAndUpdatesIcon className="text-white ml-1" style={{ fontSize: "2.5vh" }} />
          </p>
          <p className="text-[2vh] py-1">
            Hi there! I'm MayI, the mall's AI agent. Here to help you with all your AI needs, including giving you a quick summary of the reviews for this &nbsp;
            {isPost ? "post" : isStore ? "store" : "mall"}! I'll start cooking as soon as the comments start rolling.
          </p>
        </div> */}

        {/* Reviews List */}
        {loading ? (
          <p className="text-center text-gray-500 py-3">Loading reviews...</p>
        ) : reviews.length ? (
          <div className="space-y-2 mb-4 mt-2">
            {reviews.map((review, i) => (
              <HomePageReview key={i} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-3 mb-4">No reviews yet. Be the first to review!</p>
        )}
        {/* {loading ? (
          <p className="text-center text-gray-500 py-3">Loading reviews...</p>
        ) : reviews.length ? (
          <div className="space-y-2 mb-4">
            {reviews.map((review, i) => (
              <HomePageReview key={i} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-3 mb-4">No reviews yet. Be the first to review!</p>
        )} */}
        {/* Review Form */}
        {(isPost || isMall || isStore) && (
          <form
            onSubmit={isPost ? handlePostReviewSubmit : handleStoreReviewSubmit}
            className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 rounded-t px-3.5 py-2.5 flex flex-col gap-2 shadow-md"
          >
            {error && <p className="text-red-500 text-xs text-center -mb-1">{error}</p>}
            {message && <p className="text-green-500 text-xs text-center -mb-1">{message}</p>}
            <p className="text-[14px] font-medium text-gray-500 whitespace-nowrap text-center">Leave a review</p>

            {/* Row 1: label + stars + anon */}
            <div className="flex items-center gap-2.5">

              <div className="flex gap-0.5 items-center">
                {[1, 2, 3, 4, 5].map((star) =>
                  star <= rating ? (
                    <IoIosStar key={star} onClick={() => setRating(star)} className="text-[20px] text-amber-400 cursor-pointer" />
                  ) : (
                    <IoIosStarOutline key={star} onClick={() => setRating(star)} className="text-[20px] text-gray-300 cursor-pointer" />
                  )
                )}
              </div>

              <label className="flex items-center gap-1 text-[14px] text-gray-500 whitespace-nowrap ml-auto cursor-pointer">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="w-3 h-3"
                />
                Anonymous
              </label>
            </div>

            {/* Row 2: input + send button inside */}
            <div className="relative flex items-center">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a review..."
                className="w-full h-[38px] rounded-full border border-gray-300 bg-gray-50 pl-3.5 pr-11 text-sm focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={isSubmitting || !comment || rating === 0}
                className={`absolute right-1.5 w-[30px] h-[30px] rounded-full bg-amber-400 flex items-center justify-center transition-opacity
                  ${isSubmitting || !comment || rating === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-amber-500 cursor-pointer"}`}
              >
                <IoSend className="text-white text-[13px]" />
              </button>
            </div>
          </form>
        )}
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AllReviews;
