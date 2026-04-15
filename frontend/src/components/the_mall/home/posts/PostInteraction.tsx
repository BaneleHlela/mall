import React, { useEffect } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { LiaShareSolid } from 'react-icons/lia';
import { BsDoorOpen } from 'react-icons/bs';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { togglePostLike } from '../../../../features/posts/postSlice';
import { CiShare2 } from 'react-icons/ci';
import { IoShareSocialOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useReviewsModal } from '../../../../App';

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
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.user);
    const { openReviewsModal } = useReviewsModal();

    const postData = useAppSelector((state) => state.posts.posts[postIdentifier]);
    const loading = useAppSelector((state) => state.posts.isLoading);

    // Note: getPostStats is now called only when reviews modal opens for this post
    // This prevents unnecessary API calls for all posts on the page

    const handleLike = () => {
        if (!user) {
            toast.error(`Please log in to manage favorites`, {
                style: {
                  background: '#fef2f2',
                  color: '#991b1b',
                  fontFamily: 'Outfit',
                },
                icon: '❌',
            });
          return;
        }
        dispatch(togglePostLike(postIdentifier));
    };

    const handleReviewsClick = () => {
        openReviewsModal(postIdentifier, '', false);
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
                            onDoubleClick={handleReviewsClick}
                            disabled={loading}
                            className="focus:outline-none"
                        >
                            {hasLiked ? (
                                <GoHeartFill className="text-[3.5vh] text-black" />
                            ) : (
                                <GoHeart className="text-[3.5vh] text-black" />
                            )}
                        </button>
                        <p className="font-[500]">{likesCount + 3} likes</p>
                    </div>
                    
                    {/* Visits (optional) */}
                    <div className="flex items-center space-x-1">
                        <BsDoorOpen className="text-[3vh] text-black" />
                        <p className="font-[500]">{visits} visits</p>
                    </div>
                </div>
                
                {/* Share */}
                <div className="flex h-full items-center cursor-pointer" onClick={handleShare}>
                    <IoShareSocialOutline className="text-[3.4vh]" />
                </div>
            </div>

            {/* Ratings & Reviews */}
            {showRating && (
                <div
                    onClick={handleReviewsClick}
                    className="relative flex items-center w-full px-[.6vh] cursor-pointer"
                >
                    <div className="w-full h-full bg-black py-[.5vh] text-white rounded-[.8vh] border-[.2vh] px-[1.5vh] pr-[10vh] flex items-center font-normal">
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
        </div>
    );
};

export default PostInteraction;
