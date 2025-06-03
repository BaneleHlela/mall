import React from 'react';

interface FirstStoreServiceCardProps {
  title: string;
  duration: string;
  price: string;
}

const FirstStoreServiceCard: React.FC<FirstStoreServiceCardProps> = ({
  title,
  duration,
  price,
}) => {
  return (
    <div className="border border-black bg-[#d1dfc7] px-8 py-6 w-full h-full flex flex-col justify-between lg:min-h-[35vh]">
      <div>
        <h2 className="text-lg font-bold mb-3">{title}</h2>
        <p className="mb-1">{duration}</p>
        <p className="mb-4">{price}</p>
      </div>
      <button className="bg-black text-white text-sm px-4 py-2 hover:bg-gray-800 transition w-fit">
        Make an Appointment
      </button>
    </div>
  );
};

export default FirstStoreServiceCard;
