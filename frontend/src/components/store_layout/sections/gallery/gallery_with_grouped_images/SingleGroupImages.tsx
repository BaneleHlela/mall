import React, { useState } from 'react';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { IoMdClose } from 'react-icons/io';

interface SingleGroupImagesProps {
    groupName: string;
    groupDescrition: string;
    thumbnail: string[];
    images: string[];
    textStyle: any;
    style: any;
}
export function getGridColumnClasses({
    mobile,
    desktop,
}: {
    mobile?: number;
    desktop?: number;
}): string {
    const mobileClass = mobile ? `grid-cols-${mobile}` : '';
    const desktopClass = desktop ? `lg:grid-cols-${desktop}` : '';
    
    return [mobileClass, 'sm:grid-cols-1', desktopClass,].join(' ').trim();
}

const SingleGroupImages: React.FC<SingleGroupImagesProps> = ({ groupName, groupDescrition, thumbnail, images, style, textStyle }) => {
    const [showGrid, setShowGrid] = useState(false);

    return (
        <div 
            style={{
                ...getBackgroundStyles(style.background.thumbnail),
                height: "fit-content",
            }}
            className="relative h-fit"
        >
            <div className="text-center h-fit">
                <img
                    style={{
                        ...getBackgroundStyles(style.background.image),
                    }}
                    src={thumbnail[0]}
                    alt="Thumbnail"
                    className="w-full object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300"
                    onClick={() => setShowGrid(true)}
                />
                <p style={getTextStyles(textStyle)} className='mb-5'>{groupName}</p>
            </div>

            {showGrid && (
                <div 
                    style={{
                        ...getBackgroundStyles(style.background.modal),
                    }}
                    className="fixed inset-0 overflow-auto z-50 hide-scrollbar">
                    <div className="flex justify-end">
                        <button
                            className="mt-4 mr-4 p-1 shadow bg-white text-white rounded-full hover:scale-102"
                            onClick={() => setShowGrid(false)}
                        >
                            <IoMdClose className='text-3xl text-black'/>
                        </button>
                    </div>

                    <div className="flex flex-col items-center text-center my-4">
                        <p style={getTextStyles(textStyle)}>{groupName}</p>
                        <p style={{...getTextStyles(style.text.description)}} className='px-2 md:w-[50%]'>{groupDescrition}</p>
                    </div>

                    <div
                        style={{
                            gap: getResponsiveDimension(style.grids.modal.gap)
                        }} 
                        className={`grid px-1 ${getGridColumnClasses({
                            mobile: style.grids.modal.columns.mobile,
                            desktop: style.grids.modal.columns.desktop
                          })}`}
                    >
                        {images.map((imageUrl, index) => (
                            <img
                                
                                key={index}
                                src={imageUrl}
                                alt={`Image ${index + 1}`}
                                style={{
                                    ...getBackgroundStyles(style.background.modalImage),
                                }}
                                className="w-full h-auto object-cover hover:opacity-80 transition-opacity duration-300"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleGroupImages;
