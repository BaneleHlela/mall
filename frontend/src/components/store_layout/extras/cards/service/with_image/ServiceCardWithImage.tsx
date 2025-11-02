import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';
import StoreButton from '../../../buttons/StoreButton';
import UnderlinedText from '../../../text/UnderlinedText';

interface StoreServiceCardProps {
    title: string;
    duration: number; // in minutes
    description: string;
    price?: number;
    imageUrl: string;
    style: any;
    onClick?: () => void;
}

const ServiceCardWithImage: React.FC<StoreServiceCardProps> = ({
    title,
    duration,
    price,
    style,
    imageUrl,
    description,
    onClick,
}) => {

    return (
        <div 
            style={{
                ...getBackgroundStyles(style.background),
            }}
            className={`flex min-h-fit overflow-hidden group
                ${style.stack.mobile === "column" ? "flex-col" : "flex-row" }
                lg:${style.stack.desktop === "column" ? "flex-col" : "flex-row" }
            hover:scale-102`}
        >
            {/* Image */}
            <div 
                style={{
                    ...getBackgroundStyles(style.image)
                }}
                className=''
            >
                <img 
                    src={imageUrl} 
                    alt="Service Image" 
                    className='w-full h-full object-cover'
                />
            </div>
            {/* Text and button */}
            <div
                style={{
                    ...getBackgroundStyles(calculateTextDimensions(style.stack, style.image)),
                    ...getBackgroundStyles(style.textAndButton.background)
                }} 
                className={`
                        flex flex-col justify-between overflow-hidden min-h-fit
                        ${style.textAndButton.background?.position === "center" && "items-center"}
                        ${style.textAndButton.background?.position === "start" && "items-start"}
                        ${style.textAndButton.background?.position === "end" && "items-end"}
                    `}
            >
                {/* Name */}
                <UnderlinedText style={style.textAndButton.text.name} input={title}/>
                {/* Description */}
                {style.textAndButton.text.show.description && (
                    <p style={{
                        ...getTextStyles(style.textAndButton.text)
                        }} 
                        className="line-clamp-4"
                    >
                        {description}
                    </p>
                )}
                {/* Duration */}
                {style.textAndButton.text.show.duration && (
                    <p style={{
                        ...getTextStyles(style.textAndButton.text)
                        }} 
                        className=""
                    >
                        {duration} min
                    </p>
                )}
                {/* Price */}
                {style.textAndButton.text.show.price && (
                    <p 
                        style={{
                            ...getTextStyles(style.textAndButton.text)
                        }} 
                        className=""
                    >
                        R{price}
                    </p>
                )}
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
                            onClick={onClick} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceCardWithImage;


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