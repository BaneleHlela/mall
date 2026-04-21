import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks.ts';
import { updateUser } from '../../../../features/user/userSlice.ts';
import { calculateDistanceToStore, formatDistance } from '../../home/store_card/supporting/calculateDistance.ts';
import { getStoreStatus } from '../../home/store_card/supporting/storeStatus.ts';
import type { Store } from '../../../../types/storeTypes.ts';

interface StoreBundleCarouselCardProps {
  store: Store;
  onRemoveFavorite?: () => void;
  handleCardClick?: () => void;
}

const StoreBundleCarouselCard: React.FC<StoreBundleCarouselCardProps> = ({ store, onRemoveFavorite, handleCardClick }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleClick = () => {
    navigate(`/stores/${store.slug}`);
  };

  const distance = user ? calculateDistanceToStore(user, store) : null;
  const distanceText = formatDistance(distance);
  const storeStatus = getStoreStatus(store.operationTimes, store.manualStatus);
  
  const isFavorite = user?.favourites?.stores?.includes(store._id!);

  // Check if store is less than 2 weeks old
  const isNew = store.createdAt ? (new Date().getTime() - new Date(store.createdAt).getTime()) < (14 * 24 * 60 * 60 * 1000) : false;

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

  const thumbnail =
        store.thumbnails?.profily &&
        store.thumbnails.profily !== '//example.com/images/thumbnails/product5.jpg'
            ? store.thumbnails.profily
            : 'https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/image%20placeholder%20(Card%20(Square)).png'

  return (
    <div
      onClick={handleCardClick}
      className="group relative w-full cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1"
    >
      {/* Card Container */}
      <div className="relative bg-white rounded-2xl overflow-hidden  hover:shadow-2xl transition-shadow duration-300">
        {/* Image Section - Portrait aspect ratio */}
        <div className="relative flex items-center justify-center aspect-square rounded-full border-2 border-gray-200">
          <img 
            src={thumbnail} 
            alt={store.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-full"
          />

          {/* New */}
          {isNew && (
            <div className="absolute -bottom-2 shadow-lg bg-white text-green-600 px-2 rounded text-md">New</div>
          )}
          
          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" /> */}
          
          {/* Distance Badge */}
          {/* <div className="absolute bottom-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 shadow-lg">
              {distanceText}
            </span>
          </div> */}
        </div>
        
        {/* Content Section */}
        <div className="py-2 bg-white text-center">
          {/* Store Name */}
          <h3 style={{lineHeight: '1.1'}} className="font-semibold text-[15px] text-gray-900 line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors mt-1">
            {store.nickname || store.name}
          </h3>
          <p style={{lineHeight: '1'}} className="text-gray-500 mt-2 text-sm">{distanceText}</p>
          
          {/* Slogan */}
          {/* {store.slogan && (
            <p className="text-gray-500 text-xs line-clamp-1 mb-2">
              {store.slogan}
            </p>
          )} */}

        </div>
      </div>
    </div>
  );
};

export default StoreBundleCarouselCard;
