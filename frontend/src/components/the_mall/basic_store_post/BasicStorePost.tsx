import React, { useEffect, useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BsCalendarDate, BsDoorOpen, BsFlagFill } from 'react-icons/bs';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { IoIosStarOutline, IoMdClose } from 'react-icons/io';
import { LiaShareSolid } from 'react-icons/lia';
import { MdOutlineDeliveryDining, MdVerified } from 'react-icons/md';
import HomePageReviewsModal from '../home/HomePageReviewsModal';
import { fetchStoreById } from '../../../features/stores/storeSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RiPinDistanceLine } from 'react-icons/ri';
import { IoLocationOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { formatDateToNormal, formatNumber, getPositionStyle, isUserInDeliveryRange } from '../../../utils/helperFunctions';
import { calculateDistanceToStore, formatDistance } from '../home/store_card/supporting/calculateDistance';
import { updateUser } from '../../../features/user/userSlice';
import toast from 'react-hot-toast';
import StorePosterRatingStars from './StorePosterRatingStars';
import { useNavbar } from '../../../utils/context/NavBarContext';
import StorePosterSlideshow from './types/StorePosterSlideshow';


export interface PostData {
  storeId: string;
  status: string;
  poster: {
    url: string;
    type: 'single' | 'rowDouble' | 'columnDouble' | 'triple' | 'slideshow';
    images: string[];
    button: {
        url: string;
        show: boolean;
        position: Number;
        style: {
            text: {
                input: string;
                color: string;
                size: string;
                bold: boolean;
                italic: boolean;
                underline: boolean;
            },
            background: {
                color: string;
                padding: {
                    x: string;
                    y: string;
                },
                border: {
                    color: string;
                };
            };
        }
    }
  }
}
export type Poster = PostData['poster'];

const BasicStorePost: React.FC<PostData> = ({ storeId, status, poster }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCenterModalOpen, setIsCenterModalOpen] = useState(false);
    const [modalContentType, setModalContentType] = useState<'flag' | 'verification' | 'details' | null>(null);
    const [store, setStore] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { hideNavbar, showNavbar } = useNavbar();


    const user = useAppSelector((state) => state.user.user);

    useEffect(() => {
        if (isModalOpen) hideNavbar();
        else showNavbar();
    }, [isModalOpen]);
    

    useEffect(() => {
        const getStore = async () => {
        try {
            setLoading(true);
            const resultAction = await dispatch(fetchStoreById(storeId));
            if (fetchStoreById.fulfilled.match(resultAction)) {
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

        if (storeId) getStore();
    }, [dispatch, storeId]);

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        // Construct share data
        const shareData = {
            title: store?.name || "Store on The Mall",
            text: `Check out ${store?.name} on The Mall!`,
            url: `${window.location.origin}/stores/${store?._id}`,
        };
        
        // ✅ If the browser supports native share (mobile + modern browsers)
        if (navigator.share) {
            try {
            await navigator.share(shareData);
            console.log("✅ Shared successfully!");
            } catch (err) {
            console.error("❌ Share failed:", err);
            }
        } 
        // ⚙️ Fallback for browsers that don't support navigator.share
        else {
            try {
              await navigator.clipboard.writeText(shareData.url);
              toast.success("Link copied to clipboard!");
            } catch {
              toast.error("Failed to copy link.");
            }
        }
    };
      

    if (loading) {
        return (
        <div className="flex items-center justify-center h-[30vh] text-gray-500">
            Loading store...
        </div>
        );
    }

    if (!store) {
        return (
        <div className="flex items-center justify-center h-[30vh] text-red-500">
            Failed to load store
        </div>
        );
    }
    // Determine if the store can deliver to the user
    const canDeliver = isUserInDeliveryRange(user?.locations[0], store.location, store.delivers);

    // Helper to open the correct modal type
    const openModalWithContent = (type: 'flag' | 'verification' | 'details') => {
        setModalContentType(type);
        setIsCenterModalOpen(true);
    };

    // Calculate distance if user is provided
    const distance = user ? calculateDistanceToStore(user, store) : null;
    const distanceText = formatDistance(distance);

    const isFavorite = user?.favoriteStores?.includes(store._id);

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
    <div className="bg-white pb-1">
      {/* Profile Thumbnail and Three dots */}
      <div className="flex justify-between w-full h-[5vh] px-[.5vh]">
            <div className="flex items-center w-[90%] space-x-[1%]">
                {/* Thumbnail — shows FLAG modal */}
                <div
                onClick={() => openModalWithContent('flag')}
                className={`w-[10%] aspect-square rounded-full p-[.25vh] cursor-pointer
                    ${store?.flag?.red
                    ? 'bg-gradient-to-r from-red-600 via-red-500 to-red-700'
                    : 'bg-gradient-to-r from-green-500 via-green-400 to-green-700'
                    }`}
                >
                <img
                    src="https://storage.googleapis.com/the-mall-uploads-giza/stores/686e76aa96f14c28650b671d/images/main.webp"
                    alt={`${store?.name || 'store'} thumbnail`}
                    className="w-full h-full object-cover rounded-full"
                />
            </div>

            {/* Store Name */}
            <div 
                className="flex flex-col justify-center cursor-pointer"
                onClick={() => navigate(`/stores/${store?._id}`)}
            >
                <p className="font-semibold text-[2.2vh] hover:underline">
                    {store?.name}
                </p>
            </div>

            {store.isVerified && (
                <button
                    className="text-[2vh] text-blue-600"
                    onClick={() => openModalWithContent('verification')}
                >
                    <MdVerified />
                </button>
            )}
        </div>

        {/* Three dots — shows DETAILS modal */}
        <div
          className="flex h-full items-center text-[2.8vh] cursor-pointer"
          onClick={() => openModalWithContent('details')}
        >
          <BiDotsHorizontalRounded />
        </div>
      </div>

      {/* Comment */}
      <div style={{lineHeight: "1.1"}} className="w-full px-[.5vh] text-[2.2vh] pt-[.8vh]">
        {status}
      </div>

      {/* Post Image */}
      {poster.type === "single" && (
        <div className="relative flex items-center justify-center p-[.4vh] h-fit">
            <img
                src={poster.images[0]}
                alt="post-image"
                className="w-full h-auto object-cover"
            />
            {/* Optional Button */}
            {poster.button?.show && ( 
                <button 
                    style={{
                        position: 'absolute',
                        ...getPositionStyle(poster.button.position),
                        borderWidth: '2px',
                        borderColor: "white",
                        color: poster?.button?.style?.text?.color,
                        fontSize: poster?.button?.style?.text?.size,
                        fontWeight: poster?.button?.style?.text?.bold ? 'bold' : 'normal',
                        fontStyle: poster?.button?.style?.text?.italic ? 'italic' : 'normal',
                        textDecoration: poster?.button?.style?.text?.underline ? 'underline' : 'none',
                        backgroundColor: poster?.button?.style?.background?.color,
                        padding: `${poster?.button?.style?.background?.padding?.y} ${poster?.button?.style?.background?.padding?.x}`,
                    }}
                    onClick={() => window.open(poster.url, '_blank')}
                    className="absolute border"
                >
                    {poster.button.style.text.input}
                </button>
            )}
        </div>
      )}
      {poster.type === 'slideshow' && (
            <StorePosterSlideshow poster={poster} />
      )}
      {/* Likes, Visits, Share */}
      <div className="flex justify-between w-full h-[5vh] px-[.8vh]">
        <div className="flex items-center space-x-[1vh]">
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
          <div className="flex items-center space-x-1">
            <BsDoorOpen className="text-[3vh] text-black" />
            <p className="font-[500]">{formatNumber(store.visits)} visits</p>
          </div>
        </div>
        {/* Share */}
        <div
            className="flex h-full items-center cursor-pointer"
            onClick={handleShare}
        >
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

      {/* Center Modal (dynamic content) */}
      {isCenterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000060] z-50">
          <div className="bg-white rounded-lg shadow-lg w-[70%] max-w-[600px] p-[1.5vh] relative">
            {/* Header */}
            <div className="flex justify-between items-center w-full h-[10%] border-b border-gray-400 pb-2">
              <h2 className="text-xl font-semibold w-full">
                {modalContentType === 'flag'
                  ? `${store?.name}: Flag Status`
                  : modalContentType === 'verification'
                  ? `${store?.name}: Verification`
                  : `${store?.name}: Details`}
              </h2>
              <button
                onClick={() => setIsCenterModalOpen(false)}
                className="absolute right-3 text-black text-[3vh]"
              >
                <IoMdClose />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col justify-evenly h-[85%] text-center w-full rounded">
                {/* Flag */}
                {modalContentType === 'flag' && (
                    <>
                        {store?.flag?.red ? (
                        // 🔴 Red flag content
                        <div className="flex flex-col justify-center items-center text-red-600 rounded py-[2vh]">
                            <BsFlagFill className="text-[10vh] text-red-600" />
                            <p className="font-[500] text-[2.8vh]">Red Flag</p>
                        </div>
                        ) : (
                        // 🟢 Green flag content
                        <div className="flex flex-col justify-center items-center text-green-500 rounded py-[2vh]">
                            <BsFlagFill className="text-[10vh] text-green-500" />
                            <p className="font-[500] text-[2.8vh]">Green Flag</p>
                        </div>
                        )}

                        {/* Reason / Message */}
                        <p className="px-[2vh] text-[2vh] leading-tight">
                        {store?.flag?.red ? (
                            store?.flag?.reason ? (
                            <>
                                <strong>{store.name}</strong> has been flagged for the following reason:
                                <br />
                                <span className="italic text-red-600">"{store.flag.reason}"</span>
                            </>
                            ) : (
                            <>
                                <strong>{store.name}</strong> has been flagged for suspicious activity.
                            </>
                            )
                        ) : (
                            <>
                            <strong>{store.name}</strong> has not displayed any signs of suspicious activity.
                            </>
                        )}
                        </p>
                    </>
                )}

                {modalContentType === 'verification' && (
                    <>
                    <div className="flex flex-col justify-center items-center text-blue-600 rounded py-[2vh]">
                        <MdVerified className="text-[10vh]" />
                        <p className="font-[500] text-[2.8vh]">Verified</p>
                    </div>
                    <p>
                        <strong>{store.name}</strong> is verified for selling
                        authentic and safe products.
                    </p>
                    </>
                )}
                
                {/* Details */}
                {modalContentType === 'details' && (
                    <ul className="flex flex-col gap-3 text-left py-[2vh]">
                        {/* Delivery */}
                        <li className="flex items-center gap-2">
                            <span className="p-1 text-[2.5vh] border-2 rounded bg-black text-white">
                            <MdOutlineDeliveryDining />
                            </span>
                            <span style={{ lineHeight: '1.1' }} className={`font-[500] ${canDeliver ? "text-green-500" : "text-red-500"}`}>
                                {canDeliver
                                ? `Delivers to your current location`
                                : "Does not deliver to your area"
                                }
                            </span>
                        </li>

                        {/* Distance */}
                        <li className="flex items-center gap-2">
                            <span className="p-1 text-[2.5vh] border-2 rounded bg-black text-white">
                            <RiPinDistanceLine />
                            </span>
                            <span style={{ lineHeight: '1.1' }}>
                                {user ? (
                                    <>
                                        <span className="font-[500]">{store.name}</span> is{' '}
                                        <span className="font-[500]">{distanceText}</span> away from you.
                                    </>
                                    ) : (
                                    <>
                                        Please{' '}
                                        <span
                                        className="font-bold text-blue-600 cursor-pointer hover:underline"
                                        onClick={() => navigate('/login')}
                                        >
                                            login
                                        </span>{' '}
                                        to see how far the store is from you.
                                    </>
                                )}
                            </span>
                        </li>

                        {/* Address */}
                        <li className="flex items-center gap-2">
                            <span className="p-1 text-[2.5vh] border-2 rounded bg-black text-white">
                            <IoLocationOutline />
                            </span>
                            <span 
                                style={{ lineHeight: '1.1' }} 
                                className='line-clamp-2 font-[500]'
                            >
                                {store.location?.address}
                            </span>
                        </li>

                        <li className="flex items-center gap-2">
                            <span className="p-1 text-[2.5vh] border-2 rounded bg-black text-white">
                            <BsCalendarDate />
                            </span>
                            <span style={{ lineHeight: '1.1' }}>
                                Store created on <span className="font-[500]">{formatDateToNormal(store?.createdAt)}</span>
                            </span>
                        </li>
                    </ul>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicStorePost;
