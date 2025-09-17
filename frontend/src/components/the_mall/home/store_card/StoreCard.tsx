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

interface StoreCardProps {
  store: Store;
  user?: User | null; 
  allowShadow?: boolean;
  onFavoriteClick?: () => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, allowShadow, onFavoriteClick }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user)
  
  const handleClick = () => {
    navigate(`/stores/${store._id}`);
  };

  // Calculate distance if user is provided
  const distance = user ? calculateDistanceToStore(user, store) : null;
  const distanceText = formatDistance(distance);
  
  // Get store status
  const storeStatus = getStoreStatus(store.operationTimes);
  const statusClasses = getStatusClasses(storeStatus);
  
  const isFavorite = user?.favoriteStores?.includes(store._id);

  // Dispatch updateUser directly to toggle favorite
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
    <div
        onClick={handleClick}
        className={`relative aspect-4/3 border-b border-blue-100 bg-white rounded-[2px]  overflow-hidden ${allowShadow && "shadow"} transition-transform transform hover:-translate-y-1 z-0`}
    >
      <div className="flex flex-row justify-end items-center h-[6%] space-x-[.5vh] w-full px-[2%] bg-blue-50 shadow z-1">
        <span className="h-[40%] aspect-square bg-gray-400 rounded-full "></span>
        <span className="h-[40%] aspect-square bg-gray-400 rounded-full "></span>
        <span className="h-[40%] aspect-square bg-gray-400 rounded-full "></span>
      </div>
      {/* Image */}
      <div className="relative h-[72%]">
        <img src={store.thumbnail} alt="store-thumbnail" className="w-full h-full object-cover -z-1" />
        <div className="absolute top-0 w-full h-full bg-[#00000000]"></div>
        {/* Favorite toggle button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute bottom-[1%] right-[1%]"
        >
          {isFavorite ? (
            <GoHeartFill className="text-[4vh] text-red-500" />
          ) : (
            <GoHeart className="text-[4vh] text-gray-400" />
          )}
        </button>
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
      <div className="h-[22%] shadow-md z-1">
        {/* Store name */}
        <h3 className="text-center text-[90%] font-semibold text-gray-900">{store.name}</h3>
        {/* Detials */}
        <div className="flex flex-row justify-between items-center px-[.8vh]">
          {/* Distance */}
          <p className="text-[1.8vh] text-gray-600 min-w-[15%]">{distanceText}</p>
          {/* Open Status */}
          <span className={statusClasses}>
            {storeStatus.message}
          </span>
          {/* Closed status */}
          <RatingDisplay rating={store.rating} className="text-[1.8vh]" />
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
