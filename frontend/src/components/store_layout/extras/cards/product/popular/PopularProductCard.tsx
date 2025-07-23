import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';
import StoreButton from '../../../buttons/StoreButton';
import UnderlinedText from '../../../text/UnderlinedText';

interface StoreProductCardProps {
    title: string;
    price?: number;
    marking?: string;
    imageUrl: string;
    style: any;
    onClick?: () => void;
}

const PopularProductCard: React.FC<StoreProductCardProps> = ({
    title,
    price,
    style,
    imageUrl,
    onClick,
    marking
}) => {

    return (
        <div 
            onClick={onClick}
            style={{
                ...getBackgroundStyles(style.background),
            }}
            className={`flex group w-full h-full
                ${style.stack.mobile === "column" ? "flex-col" : "flex-row" }
                lg:${style.stack.desktop === "column" ? "flex-col" : "flex-row" }
            hover:scale-101`}
        >
            {/* Image */}
            <div 
                style={{
                    ...getBackgroundStyles(style.image)
                }}
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
            </div>
            {/* Text and button */}
            <div
                style={{
                    ...getBackgroundStyles(calculateTextDimensions(style.stack, style.image))
                }} 
                className="px-[1.3vh] flex flex-col justify-evenly min-h-fit"
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
                    R{price}
                </p>
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
                        <StoreButton 
                            style={style.textAndButton.button} 
                            onClick={() => {}} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularProductCard;


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