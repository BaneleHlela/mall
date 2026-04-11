import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';
import StoreButton from '../../../buttons/StoreButton';
import StoreTextTag from '../../../../shared_layout_components/StoreTextTag';
import StoreLayoutButton from '../../../../shared_layout_components/StoreLayoutButton';
import { useAppSelector } from '../../../../../../app/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface StoreServiceCardProps {
    title: string;
    duration: number; // in minutes
    description: string;
    price?: number;
    imageUrl: string;
    images?: string[]; // Add support for multiple images
    style: any;
    onClick?: () => void;
}

const ServiceCardWithImage: React.FC<StoreServiceCardProps> = ({
    title,
    duration,
    price,
    style,
    imageUrl,
    images,
    description,
    onClick,
}) => {
    const { colors, fonts } = useAppSelector(state => state.layoutSettings)
    console.log(images)
    return (
        <div 
            style={{
                ...getBackgroundStyles(style.background, colors),
            }}
            className={`flex min-h-fit overflow-hidden group
                ${style.stack.mobile === "column" ? "flex-col" : "flex-row" }
                lg:${style.stack.desktop === "column" ? "flex-col" : "flex-row" }
            hover:scale-102`}
        >
            {/* Image with Swiper for multiple images */}
            <div 
                style={{
                    ...getBackgroundStyles(style.image, colors)
                }}
                className=''
            >
                {images && images.length > 1 ? (
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: true,
                        }}
                        loop={true}
                        className="w-full h-full"
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <img 
                                    src={img} 
                                    alt={`${title} - Image ${index + 1}`} 
                                    className='w-full h-full object-cover'
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <img 
                        src={imageUrl} 
                        alt="Service Image" 
                        className='w-full h-full object-cover'
                    />
                )}
            </div>
            {/* Text and button */}
            <div
                style={{
                    ...getBackgroundStyles(calculateTextDimensions(style.stack, style.image), colors),
                    ...getBackgroundStyles(style.textAndButton.background, colors)
                }} 
                className={`
                        flex flex-col justify-between overflow-hidden min-h-fit
                        ${style.textAndButton.background?.position === "center" && "items-center"}
                        ${style.textAndButton.background?.position === "start" && "items-start"}
                        ${style.textAndButton.background?.position === "end" && "items-end"}
                    `}
            >
                {/* Name */}
                <StoreTextTag style={style.textAndButton.text.name} input={title} className={"line-clamp-1"}/>
                
                {/* Description */}
                {style.textAndButton.text.show.description && (
                    <p style={{
                            ...getTextStyles(style.textAndButton.text, fonts, colors),
                            paddingTop: "0.5rem"
                        }} 
                        className="line-clamp-4 pt-2"
                    >
                        {description}
                    </p>
                )}
                
                {/* Duration */}
                {style.textAndButton.text.show.duration && (
                    <p style={{
                        ...getTextStyles(style.textAndButton.text, fonts, colors)
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
                            ...getTextStyles(style.textAndButton.text, fonts, colors)
                        }} 
                        className=""
                    >
                       {style.textAndButton.text?.show?.from && <span>From </span>} R{price}
                    </p>
                )}
                <div className="mb-2"></div>
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
                            style={style.textAndButton.button} //@ts-ignore-next-line 
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