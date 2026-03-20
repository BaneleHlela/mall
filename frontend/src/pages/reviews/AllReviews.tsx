import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import HomePageReview from "../../components/the_mall/home/HomePageReview";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getStoreReviews, createReview, clearReviewError, clearReviewMessage } from "../../features/reviews/reviewSlice";
import { getPostReviews, createPostReview } from "../../features/posts/postSlice";
import { fetchStoreBySlug } from "../../features/stores/storeSlice";
import axios from "axios";

const AllReviews: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get parameters from URL
  const postIdentifier = searchParams.get("post");
  const storeSlug = searchParams.get("store");
  const mallParam = searchParams.get("mall");
  
  // Determine what we're showing reviews for
  const isMall = mallParam === "true" || (!postIdentifier && !storeSlug);
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

  // Handle back navigation
  const handleBack = () => {
    if (isPost && targetPost) {
      // Go back to home with the post visible
      //navigate(`/?post=${postIdentifier}`);
      navigate(-1)
    } else if (isStore && storeSlug) {
      // Go back to the store page
      navigate(`/stores/${storeSlug}`);
    } else {
      // Go back to home
      navigate("/");
    }
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
    
    fetchReviews();
  }, [dispatch, isPost, postIdentifier, isStore, storeSlug, isMall]);

  // Clear Redux messages when unmounting
  useEffect(() => {
    return () => {
      dispatch(clearReviewError());
      dispatch(clearReviewMessage());
    };
  }, [dispatch]);

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

  // Get title based on what's being viewed
  const getTitle = () => {
    if (isPost && targetPost) {
      return targetPost.title || "Post Reviews";
    }
    if (isStore && targetStore) {
      return targetStore.name || "Store Reviews";
    }
    if (isMall) {
      return "The Mall Reviews";
    }
    return "Reviews";
  };

  return (
    <div className="w-full min-h-screen bg-stone-100 flex flex-col items-center py-4">
      {/* Header with Back Button */}
      <div className="w-full max-w-4xl px-4 mb-4 flex items-center">
        <button
          onClick={handleBack}
          className="flex items-center text-black hover:text-amber-600 transition-colors"
        >
          <IoArrowBack className="text-[3vh] mr-2" />
          <span className="text-[2vh]">Back</span>
        </button>
      </div>

      {/* Title */}
      <div className="w-full max-w-4xl px-4 mb-4">
        <h1 className="text-[3vh] font-bold text-center">{getTitle()}</h1>
        <p className="text-center text-gray-500 text-[2vh]">Reviews & Feedback</p>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl px-4">
        {/* Overview */}
        <div className="w-full bg-black text-white rounded-[1vh] py-[1vh] px-[1.5vh] mb-4">
          <p className="font-semibold space-x-1 flex items-center">
            <span>AI Overview</span>
            <TipsAndUpdatesIcon className="text-white ml-1" style={{ fontSize: "2.5vh" }} />
          </p>
          <p className="text-[2vh] py-1">
            Average rating: <strong>{avgRating > 0 ? avgRating.toFixed(1) : "N/A"}/5</strong>.
            Based on <strong>{reviews.length}</strong> reviews.
          </p>
        </div>

        {/* Reviews List */}
        {loading ? (
          <p className="text-center text-gray-500 py-3">Loading reviews...</p>
        ) : reviews.length ? (
          <div className="space-y-2 mb-4">
            {reviews.map((review, i) => (
              <HomePageReview key={i} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-3 mb-4">No reviews yet. Be the first to review!</p>
        )}

        {/* Review Form */}
        {(isPost || isMall || isStore) && (
          <form 
            onSubmit={isPost ? handlePostReviewSubmit : handleStoreReviewSubmit} 
            className="mt-4 bg-white rounded-lg p-4 shadow"
          >
            <p className="font-semibold mb-2">Leave a Review</p>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {message && <p className="text-green-500 text-sm text-center">{message}</p>}

            <div className="flex flex-col space-y-3">
              {/* Star rating */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) =>
                  star <= rating ? (
                    <IoIosStar
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-[3vh] text-amber-500 cursor-pointer"
                    />
                  ) : (
                    <IoIosStarOutline
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-[3vh] text-gray-400 cursor-pointer"
                    />
                  )
                )}
              </div>
              
              {/* Comment input */}
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-[4.5vh] rounded-full border border-gray-500 px-[1.5vh]"
                placeholder="Leave a review..."
              />

              {/* Anonymous option */}
              <label className="flex justify-center items-center text-sm gap-2">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                />
                Post anonymously
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !comment || rating === 0}
                className={`w-full bg-amber-500 text-white rounded-full py-2 font-semibold ${
                  isSubmitting || !comment || rating === 0 ? "opacity-60 cursor-not-allowed" : "hover:bg-amber-600"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AllReviews;
