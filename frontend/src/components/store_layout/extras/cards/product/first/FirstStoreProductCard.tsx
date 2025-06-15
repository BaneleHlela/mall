import React from 'react';
import type { StoreProductCardProps } from '../StoreProductCard';
import { getBorderStyles } from '../../../../../../utils/stylingFunctions';


const FirstStoreProductCard: React.FC<StoreProductCardProps> = ({ image, name, description, price, style }) => {
  return (
    <div 
      style={{
        fontFamily: style.fontFamily,
        ...getBorderStyles(style.border)
      }}
      className="overflow-hidden hover:scale-102">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 
          className={`text-lg font-bold text-gray-900
            ${style.textCenter ? "text-center" : ""}
        `}
        >{name}</h3>
        <p 
          className={`text-sm text-gray-600 mt-1
          ${style.textCenter ? "text-center" : ""}`} 
        >{description}</p>
        <div className={`mt-3 ${style.textCenter ? "text-center" : "text-right"} `}>
          <span className="text-base font-semibold text-gray-800">R{price}</span>
        </div>
      </div>
    </div>
  );
};

export default FirstStoreProductCard;
