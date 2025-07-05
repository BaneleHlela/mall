import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setCategory } from '../../../../../features/categories/categorySlice';
import type { FirstStoreCategorySelectorProps } from '../CategorySelector';
import { getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';



const FirstStoreCategorySelector: React.FC<FirstStoreCategorySelectorProps> = ({ categories, style }) => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.categories.selectedCategory);
  const screenWidth = window.innerWidth; 
  return (
    <div className="w-full ml-1 mr-1 flex flex-row justify-center">
      <div 
        style={{
          ...getTextStyles(style.text),
          width: getResponsiveDimension(style.width, screenWidth),
        }}
        className="flex justify-between border-b border-gray-300 "
      >
        {categories.map((category) => (
          <button
            key={category}
            style={{
              ...getTextStyles(style.text),
            }}
            onClick={() => dispatch(setCategory(category))}
            className={`relative capitalize pb-2 text-lg font-medium transition-colors duration-300`}
          >
            {category}
            {selectedCategory === category && (
              <span className="absolute left-0 bottom-0 w-full h-[3px] bg-black" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FirstStoreCategorySelector;
