import React from 'react';
import type { StoreProductCardProps } from '../StoreProductCard';
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';

const FirstStoreProductCard: React.FC<StoreProductCardProps> = ({ image, name, description, price, style }) => {
  return (
    <div 
      style={{
        ...getBackgroundStyles(style.background)
      }}
      className="w-full flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <div className="h-1/2 w-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="h-1/2 px-2 py-2 lg:p-4 flex flex-col justify-between">
        <h3 
          style={{
            ...getTextStyles(style.text.productName)
          }}
          className={`runcate
              ${style.text.productName.position === "center" && "text-center"}
              ${style.text.productName.position === "end" && "text-end"}
              ${style.text.productName.position === "start" && "text-start"}
            `}
        >
          {name}
        </h3>

        <p 
          style={{
            ...getTextStyles(style.text.productDescription)
          }}
          className={`text-sm text-gray-600 mt-1 truncate'
            ${style.text.productDescription.position === "center" && "text-center"}
            ${style.text.productDescription.position === "end" && "text-end"}
            ${style.text.productDescription.position === "start" && "text-start"}
            line-clamp-1
          `}
        >
          {description}
        </p>

        <div 
          style={{
            ...getTextStyles(style.text.productPrice)
          }}
          className={`text-sm text-gray-600 mt-1 truncate'
            ${style.text.productPrice.position === "center" && "text-center"}
            ${style.text.productPrice.position === "end" && "text-end"}
            ${style.text.productPrice.position === "start" && "text-start"}
          `}
          >
          <span className="text-base">R{price}</span>
        </div>
      </div>
    </div>
  );
};

export default FirstStoreProductCard;
