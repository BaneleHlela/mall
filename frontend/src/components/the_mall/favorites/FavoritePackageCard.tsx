import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Package } from '../../../types/packageTypes';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateUser } from '../../../features/user/userSlice';

interface FavoritePackageCardProps {
  package: Package;
}

const FavoritePackageCard: React.FC<FavoritePackageCardProps> = ({ package: pkg }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleClick = () => {
    navigate(`/stores/${pkg.store}`);
  };

  const isFavorite = user?.favourites?.packages?.includes(pkg._id!);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Please log in to manage favorites.');
      return;
    }

    dispatch(
      updateUser({ // @ts-ignore-next-line
        user: user._id,
        favoritePackage: pkg._id,
      })
    );
  };

  const formatFrequency = (freq?: string) => {
    switch (freq) {
      case 'monthly': return 'per month';
      case 'yearly': return 'per year';
      case 'once': return 'one-time';
      case 'custom': return '';
      default: return '';
    }
  };

  const formatDuration = (duration?: Package['duration']) => {
    if (!duration || !duration.expires) return 'No expiration';
    
    const { count, format } = duration;
    if (!count || !format) return 'No expiration';
    
    return `${count} ${format}`;
  };

  return (
    <div
      onClick={handleClick}
      className="group relative w-full cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
    >
      {/* Card Container */}
      <div className={`relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ${
        pkg.isHighlighted ? 'ring-2 ring-indigo-500' : ''
      }`}>
        {/* Header Badge */}
        {pkg.isHighlighted && (
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-1 text-xs font-semibold">
            MOST POPULAR
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 bg-white">
          {/* Package Name */}
          <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-indigo-600 transition-colors">
            {pkg.name}
          </h3>
          
          {/* Label */}
          {pkg.label && (
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold rounded-full">
                {pkg.label}
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
              {pkg.frequency && pkg.frequency !== 'once' && (
                <span className="text-gray-500 text-sm">{formatFrequency(pkg.frequency)}</span>
              )}
            </div>
            {pkg.discountPercentage && pkg.discountPercentage > 0 && (
              <div className="mt-1">
                <span className="text-sm text-green-600 font-medium">
                  Save {pkg.discountPercentage}%
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {pkg.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {pkg.description}
            </p>
          )}

          {/* Duration */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-500">Duration:</span>
            <span className="text-xs font-medium text-gray-700">{formatDuration(pkg.duration)}</span>
          </div>

          {/* Sessions */}
          {pkg.sessions && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-500">Sessions:</span>
              <span className="text-xs font-medium text-gray-700">
                {pkg.sessions.amount} × {pkg.sessions.duration}min
              </span>
            </div>
          )}

          {/* Features */}
          {pkg.features && pkg.features.length > 0 && (
            <div className="mb-4">
              <ul className="space-y-1">
                {pkg.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span className="line-clamp-1">{feature}</span>
                  </li>
                ))}
                {pkg.features.length > 3 && (
                  <li className="text-xs text-gray-500">
                    +{pkg.features.length - 3} more features
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Category */}
          {pkg.category && (
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                {pkg.category}
              </span>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              {pkg.purchaseCount !== undefined && (
                <span>{pkg.purchaseCount} purchased</span>
              )}
              {pkg.likesCount !== undefined && (
                <span>{pkg.likesCount} likes</span>
              )}
            </div>

            {/* Rating Placeholder */}
            <div className="flex items-center gap-1">
              <div className="flex text-amber-400 text-sm">
                {'★'.repeat(4)}{'☆'.repeat(1)}
              </div>
              <span className="text-xs text-gray-500">(4.3)</span>
            </div>
          </div>

          {/* Favorite Button */}
          <div className="flex justify-end">
            <button
              onClick={handleFavoriteClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isFavorite ? (
                <GoHeartFill className="text-rose-500 text-xl" />
              ) : (
                <GoHeart className="text-gray-600 text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePackageCard;