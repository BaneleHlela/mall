import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { mockLayout } from '../../../../../../major_updates/mockLayout';
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';

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
  const config = mockLayout.sections.packages.card;
  const { colors , fonts } = mockLayout;

  return (
    <div
        style={{
           ...getBackgroundStyles(config.background, colors), 
           ...getTextStyles(config.text.details, fonts, colors)
        }}
      className={`border text-center flex flex-col justify-between relative ${
        isHighlighted && 'scale-102'
      }`}
    >
      {label && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1">
          {label}
        </div>
      )}

      <div 
        style={{
            borderBottom: `${config.border.show && '1px'} solid ${colors[config.border.color as keyof typeof colors] || config.border.color}`,
        }}
        className="p-6 border-b border-black">
        <h3 
            style={{
                ...getTextStyles(config.text.name, fonts, colors),
            }}
            className="text-xl font-semibold mb-2 line-clamp-1"
        >
            {title}
        </h3>
        <p 
            style={{
                ...getTextStyles(config.text.price, fonts, colors),
            }}
            className="text-3xl font-bold"
        >R{price}</p>
        <p className="">{frequency}</p>
        <p className="mt-2">{description}</p>
        <p className="text-xs opacity-60">{duration}</p>

        <button
            style={{
                ...getBackgroundStyles(config.button.style.background, colors),
                ...getTextStyles(config.button.style.text, fonts, colors),
            }} 
            className="bg-black text-white px-4 py-2 mt-6 w-full hover:bg-gray-800"
        >
          Select
        </button>
      </div>

      {/* Desktop Benefits */}
      <ul className="hidden md:block  p-4 space-y-2 list-none pl-0">
        {features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>

      {/* Mobile Toggle Benefits */}
      <div className="md:hidden border-t border-black">
        <button
          onClick={() => setShowBenefits((prev) => !prev)}
          className="w-full py-2  flex items-center justify-center"
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
            <ul className="p-4 space-y-2 list-none pl-0">
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
