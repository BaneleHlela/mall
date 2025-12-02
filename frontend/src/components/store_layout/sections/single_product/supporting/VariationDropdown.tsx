import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';

const VariationDropdown: React.FC<{
  variations: string[];
  selectedVariation: string | null;
  onVariationChange: (variation: string) => void;
  style: any;
  colors: any;
  fonts: any;
}> = ({ variations, selectedVariation, onVariationChange, style, colors, fonts }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        ...getTextStyles(style.text.dropdown, fonts, colors),
      }}
      className="w-full relative capitalize"
    >
      <button
        style={{
          ...getBackgroundStyles(style.background.button, colors)
        }}
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex justify-between items-center border p-[.8vh] bg-[#0000000e] focus:bg-[#00000030] focus:outline-none capitalize"
      >
        {selectedVariation || 'Select Variation'}
        <MdOutlineKeyboardArrowDown className='text-[150%]'/>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            style={{
              ...getBackgroundStyles(style.background.dropdown, colors),
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full bg-white border rounded shadow max-h-[250px] overflow-y-auto z-10"
          >
            {variations.map((variation) => (
              <li
                key={variation}
                onClick={() => {
                  onVariationChange(variation);
                  setIsOpen(false);
                }}
                className={`p-[.8vh] hover:bg-gray-100 cursor-pointer ${selectedVariation === variation ? 'bg-gray-200' : ''}`}
              >
                {variation}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VariationDropdown;