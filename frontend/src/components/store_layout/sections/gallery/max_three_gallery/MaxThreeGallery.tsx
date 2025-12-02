import React from 'react'
import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import SimpleGalleryThumbnail from '../shared_gallery_components/SimpleGalleryThumbnail';
import { motion } from 'framer-motion';

const MaxThreeGallery = () => {
    const { colors, fonts } = useAppSelector(state => state.layoutSettings);
    const config = useAppSelector(state => state.layoutSettings.sections.gallery)
    return (
        <div
            id="gallery"
            style={{
                backgroundColor: colors.primary,
                ...getBackgroundStyles(config.background),
                border: "0px",
                borderBottom: `${config.background.border.width} ${config.background.border.style} ${colors[config.background.border.color as keyof typeof colors]}`,
            }}
            className='flex flex-col justify-between' 
        >
            <p 
                style={{
                    fontFamily: fonts.primary,
                    ...getTextStyles(config.heading),
                    color: colors.secondary,
                }} className="text-center">
                {config.heading.input}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:justify-between lg:space-x-[2vh] space-y-[2vh] w-full">
                {config.cards.firstGroup.show && (
                    <SimpleGalleryThumbnail
                        imageUrls={config.cards.firstGroup.imageUrls}
                        title={config.cards.firstGroup.title}
                        description={config.cards.firstGroup.description}
                        style={config.cards.style}
                    />                    
                )}
                {config.cards.secondGroup.show && (
                    <SimpleGalleryThumbnail
                        imageUrls={config.cards.secondGroup.imageUrls}
                        title={config.cards.secondGroup.title}
                        description={config.cards.secondGroup.description}
                        style={config.cards.style}
                    />
                )}
                {config.cards.thirdGroup.show && (
                    <SimpleGalleryThumbnail
                        imageUrls={config.cards.thirdGroup.imageUrls}
                        title={config.cards.thirdGroup.title}
                        description={config.cards.thirdGroup.description}
                        style={config.cards.style}
                    />
                )}
            </div>
        </div>
    )
}

export default MaxThreeGallery;