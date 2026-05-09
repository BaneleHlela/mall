import React from 'react';
import type { Service } from '../../../../types/serviceTypes';

interface MallSearchServiceCardProps {
  service: Service;
}

const MallSearchServiceCard: React.FC<MallSearchServiceCardProps> = ({ service }) => {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-base font-semibold text-gray-900 line-clamp-2">{service.name}</p>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-gray-600">
            {service.price !== undefined && service.price !== null
              ? `R${service.price.toFixed(2)}`
              : 'Contact for price'}
          </span>
        </div>
        <p className="mt-3 text-sm leading-5 text-gray-600 line-clamp-3">
          {service.description || 'No description available.'}
        </p>
      </div>
      <button
        type="button"
        className="mt-4 rounded-2xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
      >
        Enquire
      </button>
    </div>
  );
};

export default MallSearchServiceCard;
