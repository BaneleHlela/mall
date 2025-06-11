import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setCategory } from '../../../../../features/categories/categorySlice';
import type { FirstStoreCategorySelectorProps } from '../CategorySelector';



const FirstStoreCategorySelector: React.FC<FirstStoreCategorySelectorProps> = ({ categories }) => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.categories.selectedCategory);

  return (
    <div className="">
      <div className="flex justify-center space-x-10 border-b border-gray-300">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => dispatch(setCategory(category))}
            className={`relative capitalize pb-2 text-lg font-medium transition-colors duration-300 ${
              selectedCategory === category
                ? 'text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            {category}
            {selectedCategory === category && (
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FirstStoreCategorySelector;
