import React from 'react'
import { mockLayout } from '../../../../../major_updates/mockLayout';
import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import SimpleGalleryThumbnail from '../shared_gallery_components/SimpleGalleryThumbnail';

const MaxThreeGallery = () => {
    const { colors, fonts } = useAppSelector(state => state.layoutSettings);
    const galleryStyle = mockLayout.sections.gallery
    
    return (
        <div
            style={{
                backgroundColor: colors.primary,
                ...getBackgroundStyles(galleryStyle.background),
                borderBottom: `${galleryStyle.background.smallBorder.width} ${galleryStyle.background.smallBorder.style} ${colors.secondary}`
            }}
            className='flex flex-col justify-between' 
        >
            <p 
                style={{
                    fontFamily: fonts.primary,
                    ...getTextStyles(galleryStyle.heading),
                    color: colors.secondary,
                }} className="text-center">
                {galleryStyle.heading.input}
            </p>
            <div className="flex flex-col items-center lg:justify-between lg:space-x-[2vh] space-y-[2vh] lg:flex-row w-full">
                <SimpleGalleryThumbnail 
                    imageUrl={galleryStyle.cards.firstGroup.imageUrl}
                    title={galleryStyle.cards.firstGroup.title}
                    description={galleryStyle.cards.firstGroup.description}
                    style={galleryStyle.cards.style}
                />
                <SimpleGalleryThumbnail 
                    imageUrl={galleryStyle.cards.secondGroup.imageUrl}
                    title={galleryStyle.cards.secondGroup.title}
                    description={galleryStyle.cards.secondGroup.description}
                    style={galleryStyle.cards.style}
                />
                <SimpleGalleryThumbnail 
                    imageUrl={galleryStyle.cards.thirdGroup.imageUrl}
                    title={galleryStyle.cards.thirdGroup.title}
                    description={galleryStyle.cards.thirdGroup.description}
                    style={galleryStyle.cards.style}
                />
            </div>
        </div>
    )
}

export default MaxThreeGallery;