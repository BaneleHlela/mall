import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Store } from '../../../types/storeTypes';

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/stores/${store._id}`);
    };  
  
    return (
    <div
        onClick={handleClick}
        className="bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg transition-transform transform hover:-translate-y-1"
    >
        <h3 className="text-lg font-semibold mb-2">{store.name}</h3>
        <p className="text-gray-600 text-sm">{store.description}</p>
        <p>Distance</p>
        <p>Closes 5pm</p>
        <p>flag</p>
    </div>
  );
};

export default StoreCard;
