import React from 'react';
import { getTextStyles } from '../../../../../../utils/stylingFunctions';

export interface StoreMenuCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  storeCardStyle: {
    itemNameText?: any;
    itemPriceText?: any;
    itemDescriptionText?: any;
  },
}

const FirstStoreMenuCard: React.FC<StoreMenuCardProps> = ({ image, name, description, price, storeCardStyle }) => {
  return (
    <div className="text-center mt-1 mb-1 overflow-hidden hover:scale-105">
      <div className="w-full flex justify-center">
        <img
          src={image}
          alt={name}
          className="w-[100%] h-[37vh] max-w-[375px] max-h-[375px] object-cover"
        />
      </div>
      
      <div className="p-4">
        <h2 
          style={{
            ...getTextStyles(storeCardStyle.itemNameText),
          }}
          className="text-center"
        >
          {name}
        </h2>
        <p
          style={{
            ...getTextStyles(storeCardStyle.itemDescriptionText),
          }} 
          className=""
        >
          {description}
        </p>
        <div className="mt-4 text-center">
          <span
            style={{
              ...getTextStyles(storeCardStyle.itemPriceText),
            }} 
            className="">
              R{price}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default FirstStoreMenuCard;
