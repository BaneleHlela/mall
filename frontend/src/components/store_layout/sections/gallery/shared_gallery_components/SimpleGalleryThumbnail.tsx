import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import { useAppSelector } from '../../../../../app/hooks';

interface SimpleGalleryThumbnailProps {
    imageUrl: string;
    title: string;
    description: string;
    style: any;
}

const SimpleGalleryThumbnail: React.FC<SimpleGalleryThumbnailProps> = ({
    style,
    imageUrl,
    title,
    description,
}) => {
    const { colors, fonts } = useAppSelector(state => state.layoutSettings);
    return (
        <div className='flex flex-col justify-between h-[65vh] lg:h-[75vh] min-h-fit lg:max-w-[30%] lg:w-[30%]'>
            {/* Image */}
            <div style={{...getBackgroundStyles(style.image || {}), borderColor: colors.secondary}} 
                className="w-full aspect-square overflow-hidden"
            >
                <img 
                    src={imageUrl} 
                    alt="Product Image" 
                    className='w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105'
                />
            </div>
            <div className="flex flex-col justify-evenly items-center w-full h-[35%] text-center px-[2vh] ">
                <p 
                    style={{
                        fontFamily: fonts.primary,
                        ...getTextStyles(style.title),
                        color: colors.secondary
                    }}
                    className="">{title}</p>
                <p 
                    style={{
                        fontFamily: fonts.primary,
                        ...getTextStyles(style.description),
                        color: colors.secondary
                    }}
                    className=""
                >{description}</p>
            </div>
        </div>
    )
}

export default SimpleGalleryThumbnail