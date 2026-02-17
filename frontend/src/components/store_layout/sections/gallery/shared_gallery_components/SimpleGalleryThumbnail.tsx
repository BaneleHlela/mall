import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../utils/stylingFunctions';
import { useAppSelector } from '../../../../../app/hooks';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface SimpleGalleryThumbnailProps {
    imageUrls: string[];
    title: string;
    description: string;
    style: any;
}

const SimpleGalleryThumbnail: React.FC<SimpleGalleryThumbnailProps> = ({
    style,
    imageUrls,
    title,
    description,
}) => {
    const { colors } = useAppSelector(state => state.layoutSettings);

    return (
        <div className="flex flex-col justify-between h-[65vh] lg:h-[75vh] min-h-fit">
            
            {/* Image Container must have a fixed height for Swiper */}
            <div
                style={{
                    ...getBackgroundStyles(style.image || {}),
                    borderColor: colors.secondary
                }}
                className="w-full aspect-square overflow-hidden"
            >
                <Swiper
                    modules={[Pagination, Autoplay]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    className="w-full h-full"
                >
                    <>
                        {imageUrls.map((url, index) => (
                            <SwiperSlide key={index} className="w-full h-full">
                                <img
                                    src={url}
                                    alt={`Gallery image ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </SwiperSlide>
                        ))}
                    </>
                </Swiper>
            </div>

            <div className="flex flex-col justify-evenly items-center text-center w-full h-[35%] px-[2vh]">
                <p style={{ ...getTextStyles(style.title) }} className='line-clamp-1'>
                    {title}
                </p>
                <p style={{ ...getTextStyles(style.description) }} className='line-clamp-5'>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default SimpleGalleryThumbnail;
