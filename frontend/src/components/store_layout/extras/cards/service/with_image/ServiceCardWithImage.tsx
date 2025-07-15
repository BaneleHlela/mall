import React from 'react'
import { getBackgroundStyles, getBorderStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';
import StoreButton from '../../../buttons/StoreButton';

interface StoreServiceCardProps {
    title: string;
    duration: number; // in minutes
    description: string;
    price?: number;
    style: any;
    onClick?: () => void;
}

const ServiceCardWithImage: React.FC<StoreServiceCardProps> = ({
    title,
    duration,
    price,
    style,
    description,
    onClick,
}) => {

    console.log(style, title, duration, description)


    return (
        <div 
            style={{
                ...getBackgroundStyles(style.background),
            }}
            className={`flex min-h-fit overflow-hidden
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
                    src={style.image.url} 
                    alt="Service Image" 
                    className='w-full h-full object-cover'
                />
            </div>
            {/* Text and button */}
            <div
                style={{
                    ...getBackgroundStyles(calculateTextDimensions(style.stack, style.image))
                }} 
                className="p-4 flex flex-col justify-between"
            >
                {/* Name */}
                <h2
                    style={{
                        ...getTextStyles(style.textAndButton.text),
                        ...getTextStyles(style.textAndButton.text.name)
                    }} 
                    className=""
                >
                    {title}
                </h2>
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
                <StoreButton style={style.textAndButton.button} onClick={onClick || (() => {})} />
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