import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setCategory } from '../../../../../features/categories/categorySlice';
import type { FirstStoreCategorySelectorProps } from '../CategorySelector';
import { getResponsiveDimension, getTextStyles, getBackgroundStyles, getBorderStyles } from '../../../../../utils/stylingFunctions';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';



const FirstStoreCategorySelector: React.FC<FirstStoreCategorySelectorProps> = ({ categories, style }) => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(state => state.categories.selectedCategory);
  const { colors, fonts } = useAppSelector((state) => state.layoutSettings);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerStyle = {
    width: getResponsiveDimension(style.width),
  };

  const buttonStyle = (isSelected: boolean) => ({
    color: isSelected ? colors[style.selectedColor as keyof typeof colors] : colors[style.text.color as keyof typeof colors],
  });


  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      dispatch(setCategory('all'));
    } else {
      dispatch(setCategory(category));
    }
  };

  return (
    <div className="w-full m-1 flex flex-row justify-center">
      <style dangerouslySetInnerHTML={{
        __html: `
          .swiper-button-next, .swiper-button-prev {
            color: ${colors[style.text.color as keyof typeof colors]} !important;
          }
        `
      }} />
      {isMobile ? (
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          modules={[Navigation]}
          navigation={true}
          style={{
            ...containerStyle,
            borderColor: colors[style.text.color as keyof typeof colors],
          }}
          className="border-b"
        >
          {categories.map((category) => (
            <SwiperSlide key={category}>
              <button
                style={{
                  ...getTextStyles(style.text, fonts),
                  ...buttonStyle(selectedCategory === category),
                }}
                onClick={() => handleCategoryClick(category)}
                className="relative capitalize pb-1 text-lg font-medium transition-fonts duration-300 w-full text-center"
              >
                {category}
                {selectedCategory === category && (
                  <span
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-500"
                    style={{
                      backgroundColor: colors[style.text.color as keyof typeof colors],
                    }}
                  />
                )}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div
          className="flex flex-row justify-between overflow-x-auto border-b"
          style={{
            ...containerStyle,
            borderColor: colors[style.text.color as keyof typeof colors],
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              style={{
                ...getTextStyles(style.text, fonts),
                ...buttonStyle(selectedCategory === category),
              }}
              onClick={() => handleCategoryClick(category)}
              className="relative capitalize text-lg font-medium transition-fonts duration-300 flex-shrink-0"
            >
              {category}
              {selectedCategory === category && (
                <span
                  className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-500"
                  style={{
                    backgroundColor: colors[style.text.color as keyof typeof colors],
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FirstStoreCategorySelector;
