import React from 'react';
import type { StoreProductCardProps } from '../StoreProductCard';


const FirstStoreProductCard: React.FC<StoreProductCardProps> = ({ image, name, description, price }) => {
  return (
    <div className="overflow-hidden border-1 border-gray-700">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="mt-3 text-right">
          <span className="text-base font-semibold text-gray-800">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default FirstStoreProductCard;
