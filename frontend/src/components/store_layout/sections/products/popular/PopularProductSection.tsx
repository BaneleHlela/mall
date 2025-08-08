import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { getGridColumnClasses } from '../../gallery/gallery_with_grouped_images/SingleGroupImages';
import CategorySelector from '../../../extras/category_selector/CategorySelector';
import PopularProductCard from '../../../extras/cards/product/popular/PopularProductCard';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import UnderlinedText from '../../../extras/text/UnderlinedText';

const PopularProductsSection = () => {
  const settings = useAppSelector((state) => state.layoutSettings.products);
  const products = useAppSelector((state) => state.products.products);
  const store = useAppSelector((state) => state.stores.currentStore);
  const navigate = useNavigate();

  console.log(products)

  const isMobile = window.innerWidth < 768;
  const isHorizontal =
    (isMobile && settings.stack.mobile === 'horizontal') ||
    (!isMobile && settings.stack.desktop === 'horizontal');

  const visibleCount = isMobile ? settings.grid.columns.mobile : settings.grid.columns.desktop;
  const totalGroups = Math.ceil(products.length / visibleCount);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const handleProductClick = (productId: string) => {
    const currentUrl = window.location.href;
  
    if (currentUrl.includes('layouts')) {
      navigate(`/layouts/${store?._id}/preview/product/${productId}`);
    } else if (store && store._id) {
      navigate(`/stores/${store._id}/product/${productId}`);
    } else {
      console.error('Store ID is not available');
    }
  };
  

  // Slice products into visible group
  const startIdx = activeGroupIndex * visibleCount;
  let currentGroup = products.slice(startIdx, startIdx + visibleCount);

  if (currentGroup.length < visibleCount && products.length > 0) {
    const needed = visibleCount - currentGroup.length;
    const padding = products.slice(0, needed);
    currentGroup = [...currentGroup, ...padding];
  }

  const handleNext = () => {
    setDirection('right');
    setActiveGroupIndex((prev) => (prev + 1) % totalGroups);
  };

  const handlePrev = () => {
    setDirection('left');
    setActiveGroupIndex((prev) => (prev === 0 ? totalGroups - 1 : prev - 1));
  };

  return (
    <div
      style={{
        ...getBackgroundStyles(settings.background),
      }}
      className="flex flex-col justify-between min-h-fit"
    >
      {/* Heading + Subheading */}
      <div className="w-full">
        <UnderlinedText style={settings.text.heading} />
        
        {settings.text.subheading.input && (
          <UnderlinedText style={settings.text.subheading} />
        )}
      </div>

      {/* Category Selector */}
      {store?.categories.products && settings.categorySelector.show && (
        <div className="w-full pb-4 flex flex-row justify-center">
          <CategorySelector
            categories={store?.categories.products || []}
            style={settings.categorySelector}
          />
        </div>
      )}

      {/* Horizontal (carousel) */}
      {isHorizontal ? (
        <div className="w-full relative flex flex-col items-center overflow-hidden">
          {/* Toggle Buttons */}
          <div className="flex justify-between absolute top-1/2 w-full z-2">
            <button
              style={{
                ...getTextStyles(settings.grid.container.toggleButtons),
                ...getBackgroundStyles(settings.grid.container.toggleButtons.background),
              }}
              onClick={handlePrev}
            >
              <MdOutlineKeyboardArrowLeft />
            </button>
            <button
              style={{
                ...getTextStyles(settings.grid.container.toggleButtons),
                ...getBackgroundStyles(settings.grid.container.toggleButtons.background),
              }}
              onClick={handleNext}
            >
              <MdOutlineKeyboardArrowRight />
            </button>
          </div>

          {/* Slide Container */}
          <div className="w-full flex h-fit justify-center items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeGroupIndex}
                custom={direction}
                initial={{ x: direction === 'right' ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction === 'right' ? -100 : 100, opacity: 0 }}
                transition={{ type: 'keyframes', stiffness: 300, damping: 30, duration: 0.5 }}
                className="w-full flex gap-4 justify-center"
                style={{
                  gap: getResponsiveDimension(settings.grid.gap),
                  ...getBackgroundStyles(settings.grid.container.background),
                }}
              >
                {currentGroup.map((product) => (
                  <PopularProductCard
                    key={product._id}
                    title={product.name}
                    imageUrl={product.images[0]}
                    marking={product.marking}
                    price={product.price}
                    style={settings.card}
                    onClick={() => handleProductClick(product._id)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step Indicator - Digits */}
          {settings.grid.container.stepIndicator.use === 'digits' && (
            <div style={{ ...getTextStyles(settings.grid.container.stepIndicator.text) }} className="mt-4 text-sm text-black">
              {products.length > 0 &&
                (() => {
                  const start = activeGroupIndex * visibleCount + 1;
                  const end = Math.min(start + visibleCount - 1, products.length);
                  return start === end
                    ? `${start} / ${products.length}`
                    : `${start}–${end} / ${products.length}`;
                })()}
            </div>
          )}

          {/* Step Indicator - Dots */}
          {settings.grid.container.stepIndicator.use === 'dots' && (
            <div className="mt-4 flex gap-2">
              {Array.from({ length: totalGroups }).map((_, index) => (
                <span
                  key={index}
                  style={{
                    ...getBackgroundStyles(settings.grid.container.stepIndicator.background),
                    width: getResponsiveDimension(settings.grid.container.stepIndicator.background.height),
                    backgroundColor:
                      index === activeGroupIndex
                        ? settings.grid.container.stepIndicator.background.color
                        : 'transparent',
                  }}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === activeGroupIndex ? 'scale-105' : ''
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        // Vertical Grid
        <div
          className={`w-full flex flex-row ${
            settings.grid.container.background.position === 'center'
              ? 'justify-center'
              : settings.grid.container.background.position === 'start'
              ? 'justify-start'
              : 'justify-end'
          }`}
        >
          <div
            style={{
              ...getBackgroundStyles(settings.grid.container.background),
              gap: getResponsiveDimension(settings.grid.gap),
              gridAutoRows: "1fr"
            }}
            className={`grid px-1 items-stretch ${getGridColumnClasses({
              mobile: settings.grid.columns.mobile,
              desktop: settings.grid.columns.desktop,
            })}`}
          >
            {products.map((product) => (
              <PopularProductCard
                key={product._id}
                title={product.name}
                imageUrl={product.images[0]}
                price={product.prices[0].amount}
                marking={product.marking}
                style={settings.card}
                onClick={() => handleProductClick(product._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularProductsSection;
