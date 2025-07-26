import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Store } from '../../../../types/storeTypes';
import type { User } from '../../../../types/userTypes';
import { calculateDistanceToStore, formatDistance } from './supporting/calculateDistance';
import { getStoreStatus, getStatusClasses } from './supporting/storeStatus';
import { RatingDisplay } from './supporting/storeRating.tsx';
import { MdVerified } from 'react-icons/md';
import { BsFlagFill } from 'react-icons/bs';

interface StoreCardProps {
  store: Store;
  user?: User | null; 
}

const StoreCard: React.FC<StoreCardProps> = ({ store, user }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/stores/${store._id}`);
    };

    // Calculate distance if user is provided
    const distance = user ? calculateDistanceToStore(user, store) : null;
    const distanceText = formatDistance(distance);
    
    // Get store status
    const storeStatus = getStoreStatus(store.operationTimes);
    const statusClasses = getStatusClasses(storeStatus);
  
    return (
    <div
        onClick={handleClick}
        className="aspect-4/3 bg-white  overflow-hidden shadow-lg shadow-[#dd9c5121] hover:shadow-lg transition-transform transform hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-[75%]">
        <img src={store.thumbnail} alt="store-thumbnail" className="w-full h-full object-cover" />
        <div className="absolute top-0 w-full h-full bg-[#00000000]"></div>
        {/* Red flag */}
        {/* <div className="absolute top-1/2 left-1/2 text-red">
          <button className="text-red-600 z-10 h-full">
            <BsFlagFill className='h-full'/>
          </button>
        </div> */}
        {/* verification status */}
        <div className="">
          {store.isVerified && (
            <button className="absolute top-[.5vh] right-[.5vh] text-[2.5vh] text-blue-600">
              <MdVerified />
            </button>
          )}
        </div>
      </div>
      <div className="h-[25%] shadow-xl">
        {/* Store name */}
        <h3 className="text-center mb-2 font-[Ubuntu] font-semibold">{store.name}</h3>
        {/* Detials */}
        <div className="flex flex-row justify-between items-center px-[.8vh]">
          {/* Distance */}
          <p className="text-[1.8vh] text-gray-600 min-w-[15%]">{distanceText}</p>
          {/* Open Status */}
          <span className={statusClasses}>
            {storeStatus.message}
          </span>
          {/* Closed status */}
          <RatingDisplay rating={store.rating} className="text-[1.8vh]" />
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
