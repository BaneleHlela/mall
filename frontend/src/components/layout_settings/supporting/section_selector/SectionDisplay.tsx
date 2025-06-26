import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import type { Section } from '../../../../features/sections/sectionSlice';

interface SectionDisplayProps {
  section: Section;
  onDelete: (id: string) => void;
  onVariationSelect: (url: string) => void;
}

const SectionDisplay: React.FC<SectionDisplayProps> = ({
  section,
  onVariationSelect,
  onDelete
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const link = window.location.href;

  const formatVariation = (camelCaseString: string) => {
    return camelCaseString
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div
      className="flex flex-col shadow-xl font-[Outfit] relative rounded-t w-full"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className="relative w-full aspect-[4/3] flex flex-row justify-center items-center">
        {/* Desktop image */}
        <div className="absolute top-[10%] w-[90%] h-[60%] shadow-2xl">
          <img
            src={section.images.desktop}
            alt={section.variation}
            className="object-cover w-full h-full rounded-sm"
          />
        </div>

        {/* Mobile image */}
        <div className="absolute top-[40%] w-[25%] h-[50%] shadow-2xl">
          <img
            src={section.images.mobile}
            alt={section.variation}
            className="object-cover w-full h-full rounded-sm"
          />
        </div>

        {/* Overlay */}
        {showOptions && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-15 z-10 rounded" />
        )}

        {/* Action Buttons */}
        {showOptions && (
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center space-y-2 py-5 z-20">
            {link.includes('layouts') && (
              <button
                onClick={() => onVariationSelect(section.variation)}
                className="w-[55%] border border-black text-white bg-gray-800 px-2 py-2 rounded-[22px] hover:scale-102"
              >
                Select
              </button>
            )}
            {link.includes('dashboard') && (
              <button
                onClick={() => onDelete(section.variation)}
                className="w-[55%] border border-black text-white bg-gray-800 hover:bg-gray-700 px-2 py-2 rounded-[22px] hover:scale-102"
              >
                Delete
              </button>
            )}
            <button
              onClick={() => setShowPopup(true)}
              className="w-[55%] border border-black text-black px-2 py-2 rounded-[22px] hover:scale-102 hover:bg-gray-700 hover:text-stone-200"
            >
              View
            </button>
          </div>
        )}
      </div>

      {/* Footer with variation name */}
      <div className="h-[45px] w-full rounded-b bg-white z-10 flex justify-center items-center">
        {formatVariation(section.variation)}
      </div>

      {/* Fullscreen popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="relative bg-white rounded-md p-4 shadow-lg max-w-[90vw] max-h-[90vh] overflow-auto">
            <button
              className="absolute top-2 right-2 text-black shadow-md p-1 rounded-full hover:scale-102"
              onClick={() => setShowPopup(false)}
            >
              <IoMdClose size={28} />
            </button>
            <div className="flex flex-col gap-4">
              <img
                src={section.images.desktop}
                alt="Desktop"
                className="max-w-full max-h-[60vh] object-contain"
              />
              <img
                src={section.images.mobile}
                alt="Mobile"
                className="max-w-[300px] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionDisplay;
