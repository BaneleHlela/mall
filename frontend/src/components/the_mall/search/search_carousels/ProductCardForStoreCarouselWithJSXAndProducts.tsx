import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import type { Product } from '../../../../types/productTypes.ts';
import { displayPrice } from '../../../../utils/helperFunctions.ts';
import type { ResponsiveValue } from '../../../../types/layoutSettingsType.ts';

interface StoreCarouselWithJSXAndProductsProps {
    product: Product;
    style: {
        accentColor?: string;
        aspectRatio?: ResponsiveValue;
        borderRadius?: string;
    }
}

const ProductCardForStoreCarouselWithJSXAndProducts = ({ product, style }: StoreCarouselWithJSXAndProductsProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        const storeSlug = typeof product.store === 'string' ? undefined : product.store.slug;
        if (!storeSlug) return;
        navigate(`/stores/${storeSlug}/product/${product.slug}`);
    }


    return (
    <div className='w-full' onClick={handleClick}>
        {/* Image */}
        <div className="relative w-full aspect-3/4">
            {/*  */}
            <img
                style={{
                    borderRadius: style.borderRadius ? `${style.borderRadius}` : '0px',
                    aspectRatio: window.innerWidth < 768 ? style.aspectRatio?.mobile || '4/5' : style.aspectRatio?.desktop || '5/3'
                }} 
                src={product.images?.[0] || ''} alt={product.name}
                className="w-full h-full object-cover rounded"
            />
            {product.marking && (
                <button style={{backgroundColor: style.accentColor || 'black'}} className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-sm">
                    {product.marking}
                </button>
            )}
            {/* Favorite */}
            <div
                onClick={(e) => { 
                    e.stopPropagation(); 
                    setIsLiked(prev => !prev); 
                }} 
                className="absolute bottom-2 right-2">
                {isLiked ? (
                    <IoIosHeart className={`text-[3vh] fill`}/>
                ) : (
                    <IoIosHeartEmpty className='text-[3vh]'/>
                )}   
            </div>
        </div>
        {/* Details */}
        <div className="w-full">
            <p className="text-xl font-semibold mt-1 line-clamp-2">{product.name}</p>
            <p className="text-base text-gray-500 font-semibold line-clamp-1">@{product.store.slug}</p>
            <p className="text-base font-semibold">{displayPrice(product.prices, { price: product.price })}</p>
        </div>
    </div>
    )
}

export default ProductCardForStoreCarouselWithJSXAndProducts