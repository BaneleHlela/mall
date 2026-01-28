import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FirstStorePackageCardProps {
  label?: string;
  title: string;
  price: number;
  frequency: string;
  description: string;
  duration: string;
  features: string[];
  isHighlighted?: boolean;
}

const FirstStorePackageCard: React.FC<FirstStorePackageCardProps> = ({
  label,
  title,
  price,
  frequency,
  description,
  duration,
  features,
  isHighlighted = false,
}) => {
  const [showBenefits, setShowBenefits] = useState(false);

  return (
    <div
      className={`border text-center flex flex-col justify-between relative ${
        isHighlighted ? 'bg-white' : 'bg-[#e3eddc]'
      }`}
    >
      {label && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1">
          {label}
        </div>
      )}

      <div className="p-6 border-b border-black">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-3xl font-bold">${price}</p>
        <p className="text-sm">{frequency}</p>
        <p className="mt-2 text-sm">{description}</p>
        <p className="text-xs text-gray-600">{duration}</p>

        <button className="bg-black text-white px-4 py-2 mt-6 w-full hover:bg-gray-800">
          Select
        </button>
      </div>

      {/* Desktop Benefits */}
      <ul className="hidden md:block  p-4 space-y-2 text-sm list-none">
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>

      {/* Mobile Toggle Benefits */}
      <div className="md:hidden border-t border-black">
        <button
          onClick={() => setShowBenefits((prev) => !prev)}
          className="w-full py-2 text-sm flex items-center justify-center"
        >
          {showBenefits ? (
            <>
              Hide Benefits <ChevronUp className="ml-2 w-4 h-4" />
            </>
          ) : (
            <>
              Show Benefits <ChevronDown className="ml-2 w-4 h-4" />
            </>
          )}
        </button>
        {showBenefits && (
          <ul className="p-4 space-y-2 text-sm list-decimal">
            {features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FirstStorePackageCard;
