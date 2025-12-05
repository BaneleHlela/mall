import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';
import StoreButton from '../../../buttons/StoreButton';
import UnderlinedText from '../../../text/UnderlinedText';
import { useAppSelector } from '../../../../../../app/hooks';

interface PriceVariation {
  variation: string;
  amount: number;
}

interface StoreProductCardProps {
  title: string;
  price?: number;
  prices?: PriceVariation[];  
  marking?: string;
  imageUrl: string;
  style: any;
  onClick?: () => void;
}

const SecondProductCard: React.FC<StoreProductCardProps> = ({
  title,
  price,
  prices,
  style,
  imageUrl,
  onClick,
  marking
}) => {

  const colors = useAppSelector((state) => state.layoutSettings.colors);
  const fonts = useAppSelector((state) => state.layoutSettings.fonts);

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
      onClick={onClick}
      style={{
        ...getBackgroundStyles(style.background),
        backgroundColor: "transparent",
      }}
      className={`flex group flex-col hover:scale-101`}
    >
      {/* Image */}
      <div 
        style={{
          ...getBackgroundStyles(style.image.background),
        }}
        className='w-full lg:h-[85%] aspect-square overflow-hidden relative'
      >
        <img 
          src={imageUrl} 
          alt="Product Image" 
          className='w-full  aspect-square object-cover transition-transform duration-500 ease-in-out hover:scale-110'
        />
        {marking && (
          <button
            className="absolute top-[5%] left-[5%] bg-black rounded px-1 text-white"
          >
            {marking || "New"}
          </button>
        )}
      </div>

      {/* Text and button */}
      <div
        style={{
        }} 
        className="px-[1vh] flex flex-col justify-between"
      >
        {/* Name */}
        {/* <UnderlinedText style={style.textAndButton.text.name} input={title}/> */}
        {/* Name */}
        <p 
          style={{
            ...getTextStyles(style.details.name),
          }} 
          className={`text-start`}
        >
          {title}
        </p>

        {/* Price */}
        <p 
          style={{
            ...getTextStyles(style.details.price)
          }} 
          className={`text-start`}
        >
          {displayPrice()}
        </p>

        {/* Button */}
        {/* <div 
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
            <StoreButton 
              style={style.textAndButton.button} 
              onClick={() => {}} 
            />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default SecondProductCard;


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
  