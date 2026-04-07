import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Store } from '../../../../types/storeTypes';
import type { User } from '../../../../types/userTypes';
import { calculateDistanceToStore, formatDistance } from './supporting/calculateDistance';
import { getStoreStatus, getStatusClasses } from './supporting/storeStatus';
import { RatingDisplay } from './supporting/storeRating.tsx';
import { MdVerified } from 'react-icons/md';
import { updateUser} from '../../../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { GoHeartFill, GoHeart } from "react-icons/go";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface StoreCardProps {
  store: Store;
  user?: User | null; 
  allowShadow?: boolean;
  onFavoriteClick?: () => void;
  mini?: boolean;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, allowShadow, onFavoriteClick, mini = false }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user)
  const mysweetalert = withReactContent(Swal);
  const storeNotReadyThumbnail = "https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/store_not_ready_thumbnail.jpg"

  // Check if store has a website
  const hasWebsite = store.website && (
    store.website.layoutId || 
    store.website.source === 'custom' || 
    store.website.websiteUrl
  );

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent triggering when clicking the heart

    // Navigate to get-started if storeSlug is "themall" or if store has no website
    if (store.slug === "themall") {
      navigate("/get-started");
      return;
    }
    
    if (!hasWebsite) {
    const result = await mysweetalert.fire({
      title: 'Store not ready',
      text: 'Store has no website. If you are the owner of the store, go to dashboard to add a website/layout.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Go to Dashboard',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (result.isConfirmed) {
      navigate(`/dashboard/${store.slug}/settings`);
    }
      return;
    }
    
    navigate(`/stores/${store.slug}`);
  };

  // Calculate distance if user is provided
  const distance = user ? calculateDistanceToStore(user, store) : null;
  const distanceText = formatDistance(distance);
  
  // Get store status
  const storeStatus = getStoreStatus(store.operationTimes);
  const statusClasses = getStatusClasses(storeStatus);
  
  const isFavorite = user?.favourites?.stores?.includes(store._id!);

  // Dispatch updateUser directly to toggle favorite
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating when clicking the heart

    if (!user) {
      alert('Please log in to manage favorites.');
      return;
    }

    dispatch(
      updateUser({ // @ts-ignore-next-line
          user: user._id, // userId
          favoriteStore: store._id, // storeId
        })
    );
  };
  
  return (
    <div
        onClick={handleClick}
        onDoubleClick={handleFavoriteClick}
        className={`relative aspect-4/3 border-1 border-gray-200  overflow-hidden ${allowShadow && "shadow-[0px_0px_12px_0px_rgba(0,_0,_0,_0.1)]"} absolute inset-0 bg-white/10 backdrop-blur-md transition-transform transform hover:-translate-y-1 z-0 rounded-[1.2vh] lg:rounded-[1.7vh] overflow-hidden`}
    >
      
      {/* Image */}
      <div className={`relative ${mini ? "h-[65%]": "h-[72%]"} `}>
        <img src={hasWebsite ? store.thumbnails.storeCard : storeNotReadyThumbnail } alt="store-thumbnail" className="w-full h-full object-cover -z-1" />
        <div className="absolute top-0 w-full h-full bg-[#00000000]"></div>
        {/* Favorite toggle button
        <button
          onClick={handleFavoriteClick}
          className="absolute bottom-[1%] left-[1%] flex items-center justify-evenly w-[20%] scale-90 space-x-[.6vh] bg-[#0000005d] px-[.3vh] border-[.3vh] border-white rounded-[.3vh] shadow "
        >
          <p style={{lineHeight: "1"}} className="text-white text-[3.4vh] font-light">{store.likes.count}</p>
          {isFavorite ? (
            <GoHeartFill className="text-[3.5vh] text-red-400" />
          ) : (
            <GoHeart className="text-[3.5vh] text-white" />
          )}
          
          
        </button> */}
        {/* Distance */}
        <p 
          className={`absolute left-[1%] bg-white 
            ${mini ? 'text-[1.3vh] rounded-xs bottom-0' : 'text-[1.8vh] rounded bottom-[2%] '} text-center text-black min-w-[15%] px-[1%]`}>{distanceText}</p>
        {/* Store State */}
        {store.storeState && (
          <p className={`absolute right-[1%] ${
                (store as any).storeState === 'demo' ? 'bg-red-500 text-white' : 
                (store as any).storeState === 'idle' ? 'bg-yellow-500 text-white' : 
                (store as any).storeState === 'live' ? 'bg-green-500 text-white' : ''
              }
              round
            ${mini ? 'text-[1.3vh] rounded-xs bottom-0' : 'text-[1.8vh] rounded bottom-[2%]'}
            text-center text-black min-w-[15%] px-[1%] capitalize`}>
            {store.storeState}
          </p>
        )}
        {/* Red flag */}
        {/* <div className="absolute top-1/2 left-1/2 text-red">
          <button className="text-red-600 z-10 h-full">
            <BsFlagFill className='h-full'/>
          </button>
        </div> */}
        {/* verification status */}
        <div className="">
          {store.isVerified && (
            <button className="absolute top-[.5vh] right-[.5vh] text-[2.5vh] text-blue-600">
              <MdVerified />
            </button>
          )}
        </div>
      </div>
      <div className={`flex flex-col justify-center ${mini ? "h-[40%]" : "h-[28%]"} shadow-md z-1 `}>
        {/* Store name */}
        <h3 className={`text-center font-semibold text-gray-900
          ${mini ? "text-[1.5vh]": "text-[90%]"} line-clamp-1`}>{store.nickname || store.name}</h3>
        {/* Details */}
        <div className="flex flex-row justify-between items-center px-[.8vh] mb-[.25vh]">
          <button
            onClick={handleFavoriteClick}
            className=""
          >
            {/* <p style={{lineHeight: "1"}} className="text-white text-[3.4vh] font-light">{store.likes.count}</p> */}
            {isFavorite ? (
              <GoHeartFill className={`${mini ? "text-[2vh]" : "text-[3.8vh]"}  text-gray-700`} />
            ) : (
              <GoHeart className={`${mini ? "text-[2vh]" : "text-[3.8vh]"} text-gray-700`} />
            )}
          </button>
          
          {/* Open Status */}
          <span className={`${statusClasses} line-clamp-1 max-w-[60%]`}>
            {storeStatus.message}
          </span>
          {/* Closed status */}
          <RatingDisplay rating={store.rating} className={`${mini ? "text-[1.3vh]" : "text-[1.8vh]"} `} />
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
