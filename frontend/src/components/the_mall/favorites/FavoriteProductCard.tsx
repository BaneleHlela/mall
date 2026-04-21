import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../../types/productTypes';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateUser } from '../../../features/user/userSlice';

interface FavoriteProductCardProps {
  product: Product;
}

const FavoriteProductCard: React.FC<FavoriteProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const handleClick = () => {
    navigate(`/stores/${product.store.slug}/products/${product.slug}`);
  };

  const isFavorite = user?.favourites?.products?.includes(product._id!);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Please log in to manage favorites.');
      return;
    }

    dispatch(
      updateUser({ // @ts-ignore-next-line
        user: user._id,
        favoriteProduct: product._id,
      })
    );
  };

  // Determine price to display
  const displayPrice = () => {
    if (product.prices && product.prices.length > 0) {
      const amounts = product.prices.map(p => p.amount);
      const minPrice = Math.min(...amounts);
      const maxPrice = Math.max(...amounts);
      
      if (minPrice === maxPrice) {
        return `$${minPrice}`;
      } else {
        return `$${minPrice} - $${maxPrice}`;
      }
    }
    return product.price ? `$${product.price}` : 'Price not set';
  };

  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://storage.googleapis.com/the-mall-uploads-giza/stores/themall/images/image%20placeholder%20(Card%20(Square)).png';

  return (
    <div
      onClick={handleClick}
      className="group relative w-full cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
    >
      {/* Card Container */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Price Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-lg">
              {displayPrice()}
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
          
          {/* Stock Status */}
          {product.stockQuantity !== undefined && (
            <div className="absolute bottom-2 left-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                product.stockQuantity > 10 
                  ? 'bg-emerald-500 text-white' 
                  : product.stockQuantity > 0 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-rose-500 text-white'
              } shadow-lg`}>
                {product.stockQuantity > 10 
                  ? 'In Stock' 
                  : product.stockQuantity > 0 
                    ? `${product.stockQuantity} left` 
                    : 'Out of Stock'
                }
              </span>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-4 bg-white">
          {/* Store Name */}
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
            {product.store.name}
          </p>
          
          {/* Product Name */}
          <h3 className="font-bold text-gray-900 text-base line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Category */}
          {product.category && (
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                {product.category}
              </span>
            </div>
          )}
          
          {/* Rating Placeholder */}
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400 text-sm">
              {'★'.repeat(4)}{'☆'.repeat(1)}
            </div>
            <span className="text-xs text-gray-500 ml-1">(4.2)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductCard;