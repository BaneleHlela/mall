import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';
import StoreButton from '../../../buttons/StoreButton';

interface StoreProductCardProps {
    title: string;
    price?: number;
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
}) => {

    return (
        <div 
            onClick={onClick}
            style={{
                ...getBackgroundStyles(style.background),
            }}
            className={`flex min-h-fit
                ${style.stack.mobile === "column" ? "flex-col" : "flex-row" }
                lg:${style.stack.desktop === "column" ? "flex-col" : "flex-row" }
            hover:scale-101`}
        >
            {/* Image */}
            <div 
                style={{
                    ...getBackgroundStyles(style.image)
                }}
                className='overflow-hidden'
            >
                <img 
                    src={imageUrl} 
                    alt="Product Image" 
                    className='w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110'
                />
            </div>
            {/* Text and button */}
            <div
                style={{
                    ...getBackgroundStyles(calculateTextDimensions(style.stack, style.image))
                }} 
                className="px-[1.3vh] flex flex-col justify-evenly min-h-fit"
            >
                {/* Name */}
                <h2
                    style={{
                        ...getTextStyles(style.textAndButton.text.name)
                    }} 
                    className={`
                        ${style.textAndButton.text.name.position === "center" && "text-center"}
                        ${style.textAndButton.text.name.position === "start" && "text-start"}
                        ${style.textAndButton.text.name.position === "end" && "text-end"}
                    `}
                >
                    {title}
                </h2>
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
                    className={`flex flex-row 
                        ${style.textAndButton.button.position === "center" && "justify-center"}
                        ${style.textAndButton.button.position === "start" && "justify-start"}
                        ${style.textAndButton.button.position === "end" && "justify-end"}
                    `}
                >
                    <StoreButton style={style.textAndButton.button} onClick={() => {}} />
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