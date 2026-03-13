import React, { useEffect, useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { LiaShareSolid } from 'react-icons/lia';
import { BsDoorOpen } from 'react-icons/bs';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import PostReviewsModal from './PostReviewsModal';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getPostStats, togglePostLike, setPostReviewModalOpen } from '../../../../features/posts/postSlice';

interface PostInteractionProps {
    postIdentifier: string;
    postTitle?: string;
    visits?: number;
    showRating?: boolean;
    children?: React.ReactNode;
}

const PostInteraction: React.FC<PostInteractionProps> = ({
    postIdentifier,
    postTitle = "Post",
    visits = 0,
    showRating = true,
    children
}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.user);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const postData = useAppSelector((state) => state.posts.posts[postIdentifier]);
    const loading = useAppSelector((state) => state.posts.isLoading);

    useEffect(() => {
        // Fetch post stats on mount
        dispatch(getPostStats(postIdentifier));
    }, [dispatch, postIdentifier]);

    const handleLike = () => {
        if (!user) {
            alert('Please log in to like posts.');
            return;
        }
        dispatch(togglePostLike(postIdentifier));
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        dispatch(setPostReviewModalOpen(true));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        dispatch(setPostReviewModalOpen(false));
    };

    // Handle share functionality
    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const shareData = {
            title: postTitle,
            text: `Check out this post on The Mall!`,
            url: `${window.location.origin}/?post=${postIdentifier}`,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Share failed:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                console.log("Link copied to clipboard!");
            } catch {
                console.error("Failed to copy link.");
            }
        }
    };
    

    // Check if user has liked the post
    const hasLiked = user && postData?.likes?.users?.includes(user?._id as string);
    const likesCount = postData?.likes?.count || 0;
    const avgRating = postData?.rating?.averageRating || 0;
    const numRatings = postData?.rating?.numberOfRatings || 0;

    return (
        <div className="w-full">
            {/* Content */}
            {children}

            {/* Likes, Visits, or Share */}
            <div className="flex justify-between w-full h-[5vh] px-[.8vh] border-t-[.1vh] border-gray-200 mt-2">
                <div className="flex items-center space-x-[1vh]">
                    {/* Likes */}
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={handleLike}
                            disabled={loading}
                            className="focus:outline-none"
                        >
                            {hasLiked ? (
                                <GoHeartFill className="text-[3.5vh] text-black" />
                            ) : (
                                <GoHeart className="text-[3.5vh] text-black" />
                            )}
                        </button>
                        <p className="font-[500]">{likesCount} likes</p>
                    </div>
                    
                    {/* Visits (optional) */}
                    <div className="flex items-center space-x-1">
                        <BsDoorOpen className="text-[3vh] text-black" />
                        <p className="font-[500]">{visits} visits</p>
                    </div>
                </div>
                
                {/* Share */}
                <div className="flex h-full items-center cursor-pointer" onClick={handleShare}>
                    <LiaShareSolid className="text-[3.8vh]" />
                </div>
            </div>

            {/* Ratings & Reviews */}
            {showRating && (
                <div
                    onClick={handleOpenModal}
                    className="relative flex items-center w-full h-[5vh] p-[.6vh] cursor-pointer mt-1"
                >
                    <div className="w-full h-full bg-black text-white rounded-[.8vh] border-[.2vh] px-[1.5vh] pr-[10vh] flex items-center font-[500]">
                        Reviews & Feedback
                    </div>
                    <div className="absolute right-[1.5vh] px-[.5vh] flex items-center gap-1">
                        {avgRating > 0 ? (
                            <>
                                {[1, 2, 3, 4, 5].map((star) =>
                                    star <= Math.round(avgRating) ? (
                                        <IoIosStar key={star} className="text-[2vh] text-white" />
                                    ) : (
                                        <IoIosStarOutline key={star} className="text-[2vh] text-white" />
                                    )
                                )}
                                <span className="text-white text-[1.4vh] ml-1">({numRatings})</span>
                            </>
                        ) : (
                            <span className="text-white text-[1.4vh]">No reviews yet</span>
                        )}
                    </div>
                </div>
            )}

            {/* Reviews Modal */}
            {isModalOpen && (
                <PostReviewsModal 
                    onClose={handleCloseModal} 
                    postIdentifier={postIdentifier}
                    postTitle={postTitle}
                />
            )}
        </div>
    );
};

export default PostInteraction;
