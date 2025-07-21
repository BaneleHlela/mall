import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import StoreButton from '../../buttons/StoreButton';

interface TeamCardProps {
    name: string;
    about: string;
    imageUrl: string;
    style: any;
    onClick?: () => void;
}

const PopularTeamCard: React.FC<TeamCardProps> = ({
    name,
    style,
    imageUrl,
    about,
    onClick,
}) => {

    return (
        <div 
            style={{
                ...getBackgroundStyles(style.background),
            }}
            className={`flex min-h-fit overflow-hidden w-full
                ${style.stack.mobile === "column" ? "flex-col" : "flex-row" }
                lg:${style.stack.desktop === "column" ? "flex-col" : "flex-row" }
            hover:scale-102`}
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
                        flex flex-col justify-between overflow-hidden
                        ${style.textAndButton.background.position === "center" && "items-center"}
                        ${style.textAndButton.background.position === "start" && "items-start"}
                        ${style.textAndButton.background.position === "end" && "items-end"}
                    `}
            >
                {/* Name */}
                <h2
                    style={{
                        ...getTextStyles(style.textAndButton.text),
                        ...getTextStyles(style.textAndButton.text.name)
                    }} 
                    className="max-w-full"
                >
                    {name}
                </h2>
                {/* about */}
                <p style={{
                    ...getTextStyles(style.textAndButton.text)
                    }} 
                    className="line-clamp-4"
                >
                    {about}
                </p>
                {style.textAndButton.button.show && (
                    <div 
                        className={`flex flex-row w-full
                            ${style.textAndButton.button.position === "center" && "justify-center"}
                            ${style.textAndButton.button.position === "start" && "justify-start"}
                            ${style.textAndButton.button.position === "end" && "justify-end"}
                        `}
                    >
                        <StoreButton style={style.textAndButton.button} onClick={onClick || (() => {})} />
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default PopularTeamCard;


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