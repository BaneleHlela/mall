import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdVerified } from 'react-icons/md';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { updateUser } from '../../../../features/user/userSlice.ts';
import { calculateDistanceToStore, formatDistance } from '../../home/store_card/supporting/calculateDistance.ts';
import { RatingDisplay } from '../../home/store_card/supporting/storeRating.tsx';
import { getStoreStatus } from '../../home/store_card/supporting/storeStatus.ts';
import type { Store } from '../../../../types/storeTypes.ts';
import { useDevice } from '../../../../utils/DeviceContext.tsx';
import { responsiveDimensionControl } from '../../../../utils/helperFunctions.ts';

interface StoreBundleCarouselCardProps {
  store: Store;
  onRemoveFavorite?: () => void;
  imagesAspectRatio: {
    mobile: string;
    desktop: string;
  };
  handleCardClick?: () => void;
}

const StoreBundleCarouselCard: React.FC<StoreBundleCarouselCardProps> = ({ store, onRemoveFavorite, imagesAspectRatio, handleCardClick }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { isMobileOrTablet } = useDevice();

  const handleClick = () => {
    if (store.slug){}
    navigate(`/stores/${store.slug}`);
  };

  const distance = user ? calculateDistanceToStore(user, store) : null;
  const distanceText = formatDistance(distance);
  const storeStatus = getStoreStatus(store.operationTimes, store.manualStatus);
  
  const isFavorite = user?.favourites?.stores?.includes(store._id!);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Please log in to manage favorites.');
      return;
    }

    dispatch(
      updateUser({ // @ts-ignore-next-line
        user: user._id,
        favoriteStore: store._id,
      })
    );
    
    if (onRemoveFavorite) {
      onRemoveFavorite();
    }
  };

  // Get status color classes
  const getStatusColorClasses = () => {
    switch (storeStatus.color) {
      case 'green':
        return 'bg-emerald-500';
      case 'red':
        return 'bg-rose-500';
      case 'orange':
        return 'bg-amber-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative w-full cursor-pointer transition-all duration-300 ease-out"
    >
      {/* Card Container */}
      <div className="relative bg-white rounded-2xl overflow-hidden">
        {/* Image Section - Dynamic aspect ratio */}
        <div
          className="relative overflow-hidden rounded-2xl border border-gray-200"
          style={{
            aspectRatio: responsiveDimensionControl(isMobileOrTablet, imagesAspectRatio)
          }}
        >
          <img 
            src={store.thumbnails?.storeCard || store.thumbnails?.reely || store.thumbnail} 
            alt={store.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /> */}
          
          {/* Top Badges */}
          <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
            {/* Status Badge */}
            <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColorClasses()} shadow-lg`}>
              {storeStatus.isOpen ? 'Open' : 'Closed'}
            </span>
            
            {/* Verified Badge */}
            {store.isVerified && (
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg">
                <MdVerified className="text-blue-500 text-sm" />
              </div>
            )}
          </div>
          
          {/* Distance Badge */}
          <div className="absolute bottom-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 shadow-lg">
              {distanceText}
            </span>
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-200 hover:bg-white hover:scale-110"
          >
            {isFavorite ? (
              <GoHeartFill className="text-rose-500 text-lg" />
            ) : (
              <GoHeart className="text-gray-600 text-lg" />
            )}
          </button>
        </div>
        
        {/* Content Section */}
        <div className="py-2 bg-white">
          {/* Store Name */}
          <h3 style={{lineHeight: '1.1'}} className="font-semibold text-[20px] text-gray-900 line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors mt-1">
            {store.nickname || store.name}
          </h3>
          <p style={{lineHeight: '1'}} className="text-gray-500 my-1 text-sm">Free Delivery</p>
          
          {/* Slogan */}
          {/* {store.slogan && (
            <p className="text-gray-500 text-xs line-clamp-1 mb-2">
              {store.slogan}
            </p>
          )} */}
          
          {/* Rating and Status Row */}
          <div className="flex items-center justify-between">
            <RatingDisplay rating={store.rating} className="text-[15px]" />
            
            {/* Status Text */}
            {/* <span className={`text-xs font-medium ${
              storeStatus.color === 'green' ? 'text-emerald-600' :
              storeStatus.color === 'red' ? 'text-rose-600' :
              'text-amber-600'
            }`}>
              {storeStatus.message}
            </span> */}
            {store.departments && store.departments.length > 0 && (
              <div className="flex flex-wrap gap-1  bg-white">
                {store.departments.slice(0, 2).map((dept, index) => (
                  <span 
                    key={index}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-full"
                  >
                    {dept}
                  </span>
                ))}
                {store.departments.length > 2 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-full">
                    +{store.departments.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreBundleCarouselCard;
