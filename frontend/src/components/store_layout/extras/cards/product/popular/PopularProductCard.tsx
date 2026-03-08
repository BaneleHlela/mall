import React, { useState } from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';
import StoreButton from '../../../buttons/StoreButton';
import UnderlinedText from '../../../text/UnderlinedText';
import StoreLayoutButton from '../../../../shared_layout_components/StoreLayoutButton';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { useAppSelector } from '../../../../../../app/hooks';

interface PriceVariation {
  variation: string;
  amount: number;
}

interface StoreProductCardProps {
  title: string;
  price?: number;
  prices?: PriceVariation[];  // <-- new
  marking?: string;
  imageUrl: string;
  style: any;
  onClick?: () => void;
}

const PopularProductCard: React.FC<StoreProductCardProps> = ({
  title,
  price,
  prices,
  style,
  imageUrl,
  onClick,
  marking
}) => {
  const [showInteractions, setShowInteractions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { fonts, colors } = useAppSelector((state) => state.layoutSettings);
  // --- Determine what price to show ---
  const displayPrice = () => {
    if (prices && prices.length > 0) {
      const amounts = prices.map(p => p.amount);
      const minPrice = Math.min(...amounts);
      const maxPrice = Math.max(...amounts);

      // If all variation prices are the same
      if (minPrice === maxPrice) {
        return `R${formatPriceWithSpaces(minPrice)}${minPrice % 1 === 0 ? '.00' : ''}`;
      }
      return `R${formatPriceWithSpaces(minPrice)}${minPrice % 1 === 0 ? '.00' : ''} - R${formatPriceWithSpaces(maxPrice)}${maxPrice % 1 === 0 ? '.00' : ''}`;
    } 
    if (typeof price === 'number') {
      return `R${formatPriceWithSpaces(price)}${price % 1 === 0 ? '.00' : ''}`;
    }
    return '';
  };
  

  return (
    <div 
      onClick={() => {}}
      style={{
        ...getBackgroundStyles(style.background),
      }}
      className={`flex group w-full h-fit
          ${style.stack.mobile === "column" ? "flex-col" : "flex-row" }
          lg:${style.stack.desktop === "column" ? "flex-col" : "flex-row" }
      hover:scale-101`}
    >
      {/* Image */}
      <div 
        style={{
          ...getBackgroundStyles(style.image)
        }}
        onClick={onClick}
        className='overflow-hidden relative'
      >
        <img 
          src={imageUrl} 
          alt="Product Image" 
          className='w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110'
        />
        {marking && (
          <button
            style={{
              ...getTextStyles(style.markingButton.text),
              ...getBackgroundStyles(style.markingButton.background)
            }} 
            className="absolute top-[.5vh] left-[.5vh] bg-black text-white"
          >
            {marking || "New"}
          </button>
        )}
        {/* Heart */}
        <div
          style={{
            color: colors[style.textAndButton.text.name.color as keyof typeof colors] || '#fff',
          }}
          className="absolute bottom-2 left-2 text-white z-2 cursor-pointer opacity-100"
          onClick={(e) => { 
            e.stopPropagation(); 
            setIsLiked(prev => !prev); 
          }}
        >
            {isLiked ? (
                <IoIosHeart className={`text-[4vh] fill-[${colors[style.textAndButton.text.name.color as keyof typeof colors]}]`}/>
            ) : (
                <IoIosHeartEmpty className='text-[4vh]'/>
            )}
        </div>
      </div>

      {/* Text and button */}
      <div
        style={{
          ...getBackgroundStyles(calculateTextDimensions(style.stack, style.image)),
          ...getBackgroundStyles(style.textAndButton.background),
        }} 
        className="px-[1.3vh] flex flex-col justify-between min-h-fit"
      >
        {/* Name */}
        <UnderlinedText style={style.textAndButton.text.name} input={title}/>

        {/* Price */}
        <p 
          style={{
            ...getTextStyles(style.textAndButton.text)
          }} 
          className={`
            ${style.textAndButton.text.position === "center" && "text-center"}
            ${style.textAndButton.text.position === "start" && "text-start"}
            ${style.textAndButton.text.position === "end" && "text-end"}
          `}
        >
          {displayPrice()}
        </p>

        {/* Button */}
        <div 
          className={`flex-row w-full
              ${style.textAndButton.button.show.desktop === "never" && "lg:hidden"}
              ${style.textAndButton.button.show.mobile === "never" && "hidden"}
              ${style.textAndButton.button.show.desktop !== "never"  && "lg:flex"}
              ${style.textAndButton.button.show.mobile !== "never" && "flex"}
          `}
        >
          <div 
            className={`w-full flex flex-row
                ${style.textAndButton.button.show.desktop === "on-hover" && "lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-300" }
                ${style.textAndButton.button.show.mobile === "on-hover" && "opacity-0 group-hover:opacity-100 transition-opacity duration-300" }
                ${style.textAndButton.button.position === "center" && "justify-center"}
                ${style.textAndButton.button.position === "start" && "justify-start"}
                ${style.textAndButton.button.position === "end" && "justify-end"} 
            `}
          >
            <StoreLayoutButton 
              style={style.textAndButton.button} 
              onClick={() => {}} 
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end w-full">
        <button
          onClick={() => setShowInteractions(prev => !prev)}
          className={`flex py-2 items-center justify-center
            ${!showInteractions ? '' : ''}`}
        >
          {showInteractions ? (
            <>
              <SlArrowUp className="ml-2 text-[2vh] opacity-0" />
            </>
          ) : (
            <>
            <SlArrowDown className="ml-2 text-[2vh] opacity-0" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default PopularProductCard;


// Helper Functions (unchanged)
interface StackConfig {
  mobile: 'column' | 'row';
  desktop: 'column' | 'row';
}

interface DimensionConfig {
  mobile: string;
  desktop: string;
}

interface ImageConfig {
  url: string[];
  height: DimensionConfig;
  width: DimensionConfig;
}

interface TextDimensions {
  height: DimensionConfig;
  width: DimensionConfig;
}

function calculateTextDimensions(stack: StackConfig, image: ImageConfig): TextDimensions {
const calculateDimension = (value: string): string => {
    const numValue = parseInt(value);
    return isNaN(numValue) ? '100%' : `${100 - numValue}%`;
};

return {
    height: {
    mobile: stack.mobile === 'column' ? calculateDimension(image.height.mobile) : image.height.mobile,
    desktop: stack.desktop === 'column' ? calculateDimension(image.height.desktop) : image.height.desktop,
    },
    width: {
    mobile: stack.mobile === 'row' ? calculateDimension(image.width.mobile) : image.width.mobile,
    desktop: stack.desktop === 'row' ? calculateDimension(image.width.desktop) : image.width.desktop,
    },
};
}

export function formatPriceWithSpaces(price?: number): string {
    if (typeof price !== 'number') return '';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
  