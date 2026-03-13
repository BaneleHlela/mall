import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import HomePageReview from "../HomePageReview";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { getPostReviews, createPostReview } from "../../../../features/posts/postSlice";
import { useNavigate } from "react-router-dom";



interface PostReviewsModalProps {
    onClose: () => void;
    postIdentifier: string;
    postTitle?: string;
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

const PostReviewsModal: React.FC<PostReviewsModalProps> = ({ 
    onClose, 
    postIdentifier,
    postTitle = "Post" 
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user);
    const { isLoading, error, message } = useAppSelector((state) => state.posts);

    const [reviews, setReviews] = useState<any[]>([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [anonymous, setAnonymous] = useState(false);
    const [loadingReviews, setLoadingReviews] = useState(true);

    const postData = useAppSelector((state) => state.posts.posts[postIdentifier]);

    // Fetch post reviews on modal open
    useEffect(() => {
        const fetchReviews = async () => {
            setLoadingReviews(true);
            const resultAction = await dispatch(getPostReviews(postIdentifier));
            if (getPostReviews.fulfilled.match(resultAction)) {
                setReviews(resultAction.payload.data);
            }
            setLoadingReviews(false);
        };
        fetchReviews();
    }, [dispatch, postIdentifier]);

    // Submit new review
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment || rating === 0) return;
        if (!user) {
            navigate('/login');
            return;
        }

        const resultAction = await dispatch(
            createPostReview({ 
                identifier: postIdentifier, 
                rating, 
                comment, 
                anonymous 
            })
        );

        if (createPostReview.fulfilled.match(resultAction)) {
            setReviews((prev) => [resultAction.payload.data, ...prev]);
            setComment("");
            setRating(0);
            setAnonymous(false);
        }
    };

    const avgRating = postData?.rating?.averageRating || 0;
    const numRatings = postData?.rating?.numberOfRatings || 0;

    return (
        <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="fixed inset-0 bg-white z-1000 flex flex-col justify-between lg:px-[30%] maw-w-md"
        >
            {/* Header */}
            <div className="flex justify-between items-center py-4 px-[.8vh] border-b border-gray-300">
                <h2 className="text-[2.5vh] pl-1 font-semibold">Comments & Ratings</h2>
                <button
                    onClick={onClose}
                    className="text-[3vh] text-white bg-black transition border border-gray-700 rounded"
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
                        The post's average rating is{" "}
                        <strong>{avgRating > 0 ? avgRating.toFixed(1) : "N/A"}/5</strong>.
                        Based on <strong>{numRatings}</strong> reviews. 
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
                    <p className="text-center text-gray-500 py-3">No reviews yet. Be the first to review!</p>
                )}
            </div>

            {/* Bottom Review Input */}
            <form
                onSubmit={handleSubmit}
                className="absolute bottom-0 left-0 w-full bg-white border-gray-300 px-2 py-1 lg:px-[20%]"
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
                        disabled={isLoading || !comment || rating === 0}
                        className={`w-full bg-amber-500 text-white rounded-full py-[1vh] font-semibold ${
                            isLoading || !comment || rating === 0 ? "opacity-60 cursor-not-allowed" : "hover:bg-amber-600"
                        }`}
                    >
                        {isLoading ? "Submitting..." : "Submit Review"}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default PostReviewsModal;
