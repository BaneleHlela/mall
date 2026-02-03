import React, { useState, useEffect } from 'react';
import { HiLightBulb, HiOutlineLightBulb } from 'react-icons/hi2';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { LiaShareSolid } from 'react-icons/lia';
import { BsDoorOpen } from 'react-icons/bs';
import HomePageReviewsModal from './HomePageReviewsModal';
import StorePosterRatingStars from '../basic_store_post/StorePosterRatingStars';
import { fetchStore } from '../../../features/store_admin/storeAdminSlice';
import { useNavbar } from '../../../utils/context/NavBarContext';
import { fetchStoreBySlug, setLoading } from '../../../features/stores/storeSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../../features/user/userSlice';

interface StorePostJSXProps {
    tipFor?: string;
    jsx?: React.ReactNode;
    color?: string;
    showTipsIcon?: boolean;
}

const StorePostJSX: React.FC<StorePostJSXProps> = ({ tipFor = "Tips for Vendors", jsx, color = "text-orange-400", showTipsIcon = true }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [store, setStore] = useState<any>(null);
    const { hideNavbar, showNavbar } = useNavbar();
    const [loading, setLoading] = useState(true);

    const user = useAppSelector((state) => state.user.user);


    useEffect(() => {
        const getStore = async () => {
        try {
            setLoading(true);
            const resultAction = await dispatch(fetchStoreBySlug("themall"));
            if (fetchStoreBySlug.fulfilled.match(resultAction)) {
            setStore(resultAction.payload);
            } else {
            console.error('Failed to fetch store:', resultAction);
            }
        } catch (error) {
            console.error('Error fetching store:', error);
        } finally {
            setLoading(false);
        }
        };

        if ("themall") getStore();
    }, [dispatch, "themall"]);

    useEffect(() => {
        if (isModalOpen) hideNavbar();
        else showNavbar();
    }, [isModalOpen]);

    // If store is not loaded yet, return null
    if (!store) {
        return null;
    }

    // Handle share functionality
    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();

        // Construct share data
        const shareData = {
        title: store?.name || "Store on The Mall",
        text: `Check out ${store?.name} on The Mall!`,
        url: `${window.location.origin}/stores/${store?._id}`,
        };

        // Share API logic
        if (navigator.share) {
        try {
            await navigator.share(shareData);
            console.log("Shared successfully!");
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

    const isFavorite = user?.favourites?.stores?.includes(store._id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigating when clicking the heart

        if (!user) {
          alert('Please log in to manage favorites.');
          return;
        }

        dispatch(
          updateUser({
              user: user._id, // userId
              favoriteStore: store._id, // storeId
            })
        );
    };

    return (
        <div className='flex flex-col items-center bg-white px-[.5vh] py-[1vh] h-fit rounded-[1.5vh]'>
            {/* Image and text */}
            <div className="flex justify-between items-center w-full h-[5vh] max-h-[5vh] lg:h-[6vh] lg:max-h-[6vh] overflow-hidden">
                <div className="flex items-center h-full space-x-1">
                {/* Thumbnail */}
                <div className={`h-full aspect-square bg-gradient-to-r from-orange-500 via-orange-400 to-orange-700 rounded-full p-[.25vh]`}>
                    <img
                        src="https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/main.webp"
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                {/* Text */}
                <div onClick={() => navigate(`/stores/${store?._id}`)} className="flex flex-col justify-center h-full space-y-1">
                    <div style={{ lineHeight: "1"}}  className={`font-semibold capitalize ${color}`}>{tipFor}</div>
                    <div style={{ lineHeight: "1"}} className="text-[1.8vh] text-gray-300">@themall</div>
                </div>
                </div>
                {/* Icon */}
                <div className="">
                {showTipsIcon ? (
                    <TipsAndUpdatesIcon className='text-orange-400'/>
                ) : (
                    <BiDotsHorizontalRounded className='text-[2.8vh] cursor-pointer' />
                )}
                </div>
            </div>
            {/* JSX Content */}
            <div
                style={{
                fontFamily: "Momo Trust Sans",
                lineHeight: "1.1",
                }}
                className="w-full text-[2.2vh] my-1 py-1 font-[500] px-[.6vh] "
            >
                {jsx}
            </div>
            {/* Likes, Visits, or Share */}
            <div className="flex justify-between w-full h-[5vh] px-[.8vh] border-t-[.1vh] border-gray-200">
                <div className="flex items-center space-x-[1vh]">
                    {/* Likes */}
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={handleFavoriteClick}
                            className=""
                        >
                            {/* <p style={{lineHeight: "1"}} className="text-white text-[3.4vh] font-light">{store.likes.count}</p> */}
                            {isFavorite ? (
                                <GoHeartFill className="text-[3.5vh] text-black" />
                                ) : (
                                <GoHeart className="text-[3.5vh] text-black" />
                            )}
                        </button>
                        <p className="font-[500]">{store.likes.count + Math.floor(Math.random() * 100) + 10} likes</p>
                    </div>
                    {/* Visits */}
                    <div className="flex items-center space-x-1">
                        <BsDoorOpen className="text-[3vh] text-black" />
                        <p className="font-[500]">{store.visits} visits</p>
                    </div>
                </div>
                {/* Share */}
                <div className="flex h-full items-center cursor-pointer" onClick={handleShare}>
                <LiaShareSolid className="text-[3.8vh]" />
                </div>
            </div>

            {/* Ratings & Reviews */}
            <div
                onClick={() => setIsModalOpen(true)}
                className="relative flex items-center w-full h-[5vh] p-[.6vh] cursor-pointer"
            >
                <div className="w-full h-full bg-black text-white rounded-[.8vh] border-[.2vh] px-[1.5vh] pr-[10vh] flex items-center font-[500]">
                Ratings & Reviews
                </div>
                <div className="absolute right-[1.5vh] px-[.5vh]">
                <StorePosterRatingStars rating={store.rating.averageRating} color='text-white'/>
                </div>
            </div>

            {/* Reviews Modal */}
            {isModalOpen && (
                <HomePageReviewsModal onClose={() => setIsModalOpen(false)} store={store}/>
            )}
        </div>
    );
};

export default StorePostJSX;