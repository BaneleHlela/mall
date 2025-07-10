import React from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import SingleGroupImages, { getGridColumnClasses } from './SingleGroupImages';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';

interface GalleryGroup {
    input: string;
    description: string;
    thumbnail: string[];
    images: string[];
}

const GalleryWithGroupedImages = () => {
    const settings = useAppSelector((state) => state.layoutSettings.gallery);
    const groups: Record<string, GalleryGroup> = settings.imagesModal.images;

    return (
        <div 
            style={{ ...getBackgroundStyles(settings.background) }}
            className='min-h-[100vh]'
        >
            <h1
                style={getTextStyles(settings.text.title)}
                className="w-full text-center"
            >
                {settings.text.title.input}
            </h1>
            <div
                style={{
                    gap: getResponsiveDimension(settings.imagesModal.grids.thumbnail.gap),
                }} 
                className={`grid px-1 ${getGridColumnClasses({
                    mobile: settings.imagesModal.grids.thumbnail.columns.mobile,
                    desktop: settings.imagesModal.grids.thumbnail.columns.desktop
                  })}`}
            >
                {Object.entries(groups).map(([groupKey, groupData]) => (
                    <SingleGroupImages
                        key={groupKey}
                        groupName={groupData.input}
                        groupDescrition={groupData.description}
                        thumbnail={groupData.thumbnail}
                        images={groupData.images}
                        textStyle={settings.text.groupName}
                        style={settings.imagesModal}
                    />
                ))}
            </div>
        </div>
    );
};

export default GalleryWithGroupedImages;
