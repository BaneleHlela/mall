import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import { HiPlus, HiPlusSmall } from 'react-icons/hi2';
import type { Product } from '../../../../types/productTypes.ts';
import { displayPrice } from '../../../../utils/helperFunctions.ts';
import { useAppDispatch } from '../../../../app/hooks.ts';
import { updateProductStats } from '../../../../features/products/productsSlice.ts';

interface ProductsCarouselWithAddToCartButtonCardProps {
  product: Product;
}

const BasicProductCarouselCard = ({ product }: ProductsCarouselWithAddToCartButtonCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = ({product}: {product: Product}) => {
    const storeSlug = typeof product.store === 'string' ? undefined : product.store.slug;
    if (!storeSlug) return;
    // Mark product as viewed (for analytics)
    dispatch(updateProductStats({ productId: product._id, stats: {views: 1} }));
    navigate(`/stores/${storeSlug}/product/${product.slug}`);
  }


  return (
  <div className='w-full' onClick={() => handleClick({ product })}>
      {/* Image */}
      <div className="relative w-full aspect-4/4">
          {/*  */}
          <img 
              src={product.images?.[0] || ''} alt={product.name}
              className="w-full h-full object-cover rounded-lg"
          />
          {/* Favorite */}
          <div
              onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsLiked(prev => !prev); 
              }} 
              className="absolute top-1 left-1">
              {isLiked ? (
                  <IoIosHeart className={`text-[3vh] fill text-white`}/>
              ) : (
                  <IoIosHeartEmpty className='text-[3vh] text-white'/>
              )}   
          </div>
          {/* Add to Cart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle add to cart logic here
            }}
            className="absolute bottom-1 right-1 bg-white text-black p-1.5 rounded-full shadow-lg hover:opacity-100 transition-opacity">
              <HiPlus className="text-lg" />
          </button>
      </div>
      {/* Details */}
      <div className="w-full">
          <p className="text-xl font-semibold mt-1 line-clamp-1">{product.name}</p>
          <p className="text-base text-gray-500 font-semibold line-clamp-1">@{product.store.slug}</p>
          <p className="text-base font-semibold line-clamp-1">{displayPrice(product.prices, { price: product.price })}</p>
      </div>
  </div>
  )
}

export default BasicProductCarouselCard