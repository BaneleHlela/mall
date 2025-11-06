import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import HomePageReview from "./HomePageReview";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getStoreReviews,
  createReview,
  clearReviewError,
  clearReviewMessage,
} from "../../../features/reviews/reviewSlice";
import type { Store } from "../../../types/storeTypes";

// ts-errors
// Form testing
// UI is inconsistent. The comment at the bottom get hidden by the form.

interface HomePageReviewsModalProps {
  onClose: () => void;
  store: Store;
}

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const HomePageReviewsModal: React.FC<HomePageReviewsModalProps> = ({ onClose, store }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error, message } = useAppSelector((state) => state.reviews);

  const [reviews, setReviews] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [anonymous, setAnonymous] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);

  // Fetch store reviews on modal open
  useEffect(() => {
    const fetchReviews = async () => {
      setLoadingReviews(true);
      const resultAction = await dispatch(getStoreReviews(store._id));
      if (getStoreReviews.fulfilled.match(resultAction)) {
        setReviews(resultAction.payload);
      }
      setLoadingReviews(false);
    };
    fetchReviews();
  }, [dispatch, store._id]);

  // Clear Redux messages/errors when modal closes
  useEffect(() => {
    return () => {
      dispatch(clearReviewError());
      dispatch(clearReviewMessage());
    };
  }, [dispatch]);

  // Submit new review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || rating === 0) return;

    const resultAction = await dispatch(
      createReview({ store: store._id, rating, comment, anonymous })
    );

    if (createReview.fulfilled.match(resultAction)) {
      setReviews((prev) => [resultAction.payload, ...prev]); // Append locally
      setComment("");
      setRating(0);
      setAnonymous(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="fixed inset-0 bg-white z-50 flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-[.8vh] border-b border-gray-300">
        <h2 className="text-[2.5vh] pl-1 font-semibold">Comments & Ratings</h2>
        <button
          onClick={onClose}
          className="text-2xl text-gray-700 hover:text-black transition"
        >
          <IoClose />
        </button>
      </div>

      {/* Modal content */}
      <div className="relative flex-1 overflow-y-auto py-[1vh] p-[.8vh] space-y-1">
        {/* Overview */}
        <div className="w-full bg-black text-white rounded-[1vh] py-[1vh] px-[1.5vh]">
          <p className="font-semibold space-x-1 flex items-center">
            <span>AI Overview</span>
            <TipsAndUpdatesIcon
              className="text-white ml-1"
              style={{ fontSize: "2.5vh" }}
            />
          </p>
          <p className="text-[2vh] py-1">
            The store's average rating is{" "}
            <strong>{store.rating?.averageRating ?? "N/A"}/5</strong>.
            Based on <strong>{store.rating?.numberOfRatings ?? 0}</strong> reviews. 
          </p>
        </div>

        {/* Reviews */}
        {loadingReviews ? (
          <p className="text-center text-gray-500 py-3">Loading reviews...</p>
        ) : reviews.length ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-1 pb-[8vh]"
          >
            {reviews.map((review, i) => (
              <motion.div key={i} variants={itemVariants}>
                <HomePageReview review={review} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 py-3">No reviews yet.</p>
        )}
      </div>

      {/* Bottom Review Input */}
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-300 px-2 py-1"
      >
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        {message && <p className="text-green-500 text-center text-sm">{message}</p>}

        <div className="flex flex-col space-y-[.8vh]">
          

          {/* Star rating */}
          <div className="flex justify-center gap-[.5vh]">
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
            disabled={isLoading}
            className={`w-full bg-amber-500 text-white rounded-full py-[1vh] font-semibold ${
              isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-amber-600"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default HomePageReviewsModal;
