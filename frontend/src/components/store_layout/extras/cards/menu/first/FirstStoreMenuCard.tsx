import React from 'react';

interface StoreMenuCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
}

const FirstStoreMenuCard: React.FC<StoreMenuCardProps> = ({ image, name, description, price }) => {
  return (
    <div className="overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-[100%] h-[100%vw] max-w-[375px] max-h-[375px] object-cover"
      />
      <div className="p-4">
        <h2 className="text-center text-xl font-bold text-gray-800 mb-2">{name}</h2>
        <p className="text-center text-gray-600 text-sm">{description}</p>
        <div className="mt-4 text-center">
          <span className="text-lg font-semibold text-gray-900">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default FirstStoreMenuCard;
