import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Service } from '../../../types/serviceTypes';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateUser } from '../../../features/user/userSlice';

interface FavoriteServiceCardProps {
  service: Service;
}

const FavoriteServiceCard: React.FC<FavoriteServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleClick = () => {
    navigate(`/stores/${service.store}/services/${service.slug}`);
  };

  const isFavorite = user?.favourites?.services?.includes(service._id!);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Please log in to manage favorites.');
      return;
    }

    dispatch(
      updateUser({ // @ts-ignore-next-line
        user: user._id,
        favoriteService: service._id,
      })
    );
  };

  const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours} hr ${remainingMinutes} min` : `${hours} hr`;
  };

  const mainImage = service.images && service.images.length > 0 
    ? service.images[0] 
    : 'https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/image%20placeholder%20(Card%20(Square)).png';

  return (
    <div
      onClick={handleClick}
      className="group relative w-full cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
    >
      {/* Card Container */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={mainImage}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Price Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-lg">
              {service.price ? `$${service.price}` : 'Price on request'}
            </span>
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-200 hover:bg-white hover:scale-110"
          >
            {isFavorite ? (
              <GoHeartFill className="text-rose-500 text-lg" />
            ) : (
              <GoHeart className="text-gray-600 text-lg" />
            )}
          </button>
          
          {/* Duration Badge */}
          <div className="absolute bottom-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-lg">
              {formatDuration(service.duration)}
            </span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4 bg-white">
          {/* Service Name */}
          <h3 className="font-bold text-gray-900 text-lg line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
            {service.name}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {service.description}
          </p>
          
          {/* Category */}
          {service.category && (
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                {service.category}
              </span>
            </div>
          )}
          
          {/* Rating Placeholder */}
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400 text-sm">
              {'★'.repeat(4)}{'☆'.repeat(1)}
            </div>
            <span className="text-xs text-gray-500 ml-1">(4.1)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteServiceCard;