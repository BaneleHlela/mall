import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setCategory } from '../../../../../features/categories/categorySlice';
import type { FirstStoreCategorySelectorProps } from '../CategorySelector';
import { getResponsiveDimension, getTextStyles, getBackgroundStyles, getBorderStyles } from '../../../../../utils/stylingFunctions';



const FirstStoreCategorySelector: React.FC<FirstStoreCategorySelectorProps> = ({ categories, style }) => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.categories.selectedCategory);

  const backgroundStyles = getBackgroundStyles({
    width: style.width,
    color: style.color,
    padding: style.padding as any,
  });

  const borderStyles = getBorderStyles(style.border || {});

  const containerStyle = {
    ...backgroundStyles,
    ...borderStyles,
  };

  const buttonStyle = (isSelected: boolean) => ({
    color: isSelected ? (style.selectedColor?.color || (style.text as any)?.color || 'inherit') : (style.unselectedColor?.color || (style.text as any)?.color || 'inherit'),
    marginRight: getResponsiveDimension((style.spacing as any)?.x || { mobile: '0', desktop: '0' }),
  });

  const underlineStyle = {
    backgroundColor: style.underlineColor?.color || '#000000',
  };

  const justifyClass = style.alignment === 'center' ? 'justify-center' :
                      style.alignment === 'start' ? 'justify-start' :
                      style.alignment === 'end' ? 'justify-end' :
                      'justify-between';

  console.log(style.selectedColor)

  return (
    <div className="w-full ml-1 mr-1 flex flex-row justify-center">
      <div
        style={containerStyle}
        className={`flex ${justifyClass} border-b`}
      >
        {categories.map((category) => (
          <button
            key={category}
            style={{
              ...getTextStyles(style.text as any),
              ...buttonStyle(selectedCategory === category),
            }}
            onClick={() => dispatch(setCategory(category))}
            className={`relative capitalize pb-2 text-lg font-medium transition-colors duration-300`}
          >
            {category}
            {selectedCategory === category && (
              <span
                className="absolute left-0 bottom-0 w-full h-[3px]"
                style={underlineStyle}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FirstStoreCategorySelector;
