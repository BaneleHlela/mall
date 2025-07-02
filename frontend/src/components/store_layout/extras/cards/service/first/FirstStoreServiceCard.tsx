import React from 'react';
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';
import StoreButton from '../../../buttons/StoreButton';
import { formatDuration } from '../StoreServiceCard';

interface FirstStoreServiceCardProps {
  title: string;
  duration: number; //in minutes
  price: number;
  style: any;
  onClick?: () => void; 
}

const FirstStoreServiceCard: React.FC<FirstStoreServiceCardProps> = ({
  title,
  duration,
  price,
  style,
  onClick,
}) => {
  return (
    <div 
      style={{
        ...getBackgroundStyles(style.background),
      }}
      className="border border-black bg-[#d1dfc7] flex flex-col justify-between lg:min-h-[35vh]">
      {/* Service name */}
      <div
        className='w-full'
      >
        <h2 
          style={{
            ...getTextStyles(style.text.serviceName),
          }}
          className={`
            ${style.text.serviceName.position === "center" && "text-center"}
            ${style.text.serviceName.position === "end" && "text-end"}
            ${style.text.serviceName.position === "start" && "text-start"}
          `}>{title}</h2>
      </div>
      {/* Service Details */}
      <div
        style={{
          ...getTextStyles(style.text.serviceDetails),
        }}
        className={`space-y-1 mb-4
          ${style.text.serviceDetails.position === "center" && "text-center"}
          ${style.text.serviceDetails.position === "end" && "text-end"}
          ${style.text.serviceDetails.position === "start" && "text-start"}
        `} 
        >
        <p className="">{formatDuration(duration)}</p>
        <p className="">R{price}</p>
      </div>
      <div className={`flex flex-row 
          ${style.bookButton.position === "center" && "justify-center"}
          ${style.bookButton.position === "end" && "justify-end"}
          ${style.bookButton.position === "start" && "justify-start"}
        `}>
        <StoreButton style={style.bookButton} onClick={onClick || (() => {})}/>
      </div>
      
    </div>
  );
};

export default FirstStoreServiceCard;
