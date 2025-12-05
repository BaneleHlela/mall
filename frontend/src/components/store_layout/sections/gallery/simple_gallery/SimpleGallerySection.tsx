import React, { useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import UnderlinedText from '../../../extras/text/UnderlinedText';
import { IoIosHeartEmpty, IoIosHeart, IoMdClose } from 'react-icons/io';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SimpleGallerySection = () => {
    const settings = useAppSelector((state) => state.layoutSettings.sections.gallery);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [likedImages, setLikedImages] = useState<Set<string>>(new Set());


    const isMobile = window.innerWidth < 768;
    const stack = settings.images.stack;
    const isHorizontal = (isMobile && stack.mobile === 'horizontal') || (!isMobile && stack.desktop === 'horizontal');

    const columns = isMobile ? settings.images.columns.mobile : settings.images.columns.desktop;
    const gap = getResponsiveDimension(settings.images.gap);
    const imageBackgroundStyles = getBackgroundStyles(settings.images.background);

    const handleImageClick = (url: string) => {
        setSelectedImage(url);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const toggleLike = (url: string) => {
        setLikedImages(prev => {
            const newSet = new Set(prev);
            if (newSet.has(url)) {
                newSet.delete(url);
            } else {
                newSet.add(url);
            }
            return newSet;
        });
    };

    return (
        <div id="gallery" style={getBackgroundStyles(settings.background)} className='min-h-fit'>
            {/* Heading & Subheading */}
            {(settings.text.heading.input || settings.text.subheading.input) && (
                <div className='w-full'>
                    <div className="w-full">
                        <UnderlinedText style={settings.text.heading} />
                        {settings.text.subheading.input && (
                            <UnderlinedText style={settings.text.subheading} />
                        )}
                    </div>
                </div>
            )}

            {/* Images Grid */}
            {isHorizontal ? (
                <div className="w-full">
                    <Swiper
                        modules={[Pagination, Navigation]}
                        spaceBetween={parseFloat(gap)}
                        slidesPerView={columns}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-full"
                    >
                        {settings.images.urls.map((url: string, index: number) => (
                            <SwiperSlide key={index}>
                                <div
                                    style={{
                                        ...imageBackgroundStyles,
                                        cursor: 'pointer',
                                    }}
                                    className="relative overflow-hidden hover:opacity-80 transition-opacity duration-300"
                                    onClick={() => handleImageClick(url)}
                                >
                                    <img
                                        src={url}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        style={{
                                            height: getResponsiveDimension(settings.images.background.height),
                                        }}
                                    />
                                    {/* Heart */}
                                    <div
                                        className="absolute bottom-2 left-2 text-white z-2 cursor-pointer opacity-70"
                                        onClick={(e) => { e.stopPropagation(); toggleLike(url); }}
                                    >
                                        {likedImages.has(url) ? (
                                            <IoIosHeart className='text-[2vh] fill-red-500'/>
                                        ) : (
                                            <IoIosHeartEmpty className='text-[2vh]'/>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div
                    className={`grid grid-cols-${columns} lg:grid-cols-${columns}`}
                    style={{
                        gap: gap,
                    }}
                >
                    {settings.images.urls.map((url: string, index: number) => (
                        <div
                            key={index}
                            style={{
                                ...imageBackgroundStyles,
                                cursor: 'pointer',
                            }}
                            className="relative overflow-hidden hover:opacity-80 transition-opacity duration-300"
                            onClick={() => handleImageClick(url)}
                        >
                            <img
                                src={url}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full object-cover"
                                style={{
                                    height: getResponsiveDimension(settings.images.background.height),
                                }}
                            />
                            {/* Heart */}
                            <div
                                className="absolute bottom-2 left-2 text-white z-2 cursor-pointer opacity-70"
                                onClick={(e) => { e.stopPropagation(); toggleLike(url); }}
                            >
                                {likedImages.has(url) ? (
                                    <IoIosHeart className='text-[3vh] fill-red-500'/>
                                ) : (
                                    <IoIosHeartEmpty className='text-[3vh]'/>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for zoomed image */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="relative max-w-4xl max-h-full p-4">
                        <button
                            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:scale-105 transition-transform"
                            onClick={closeModal}
                        >
                            <IoMdClose className="text-2xl text-black" />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Zoomed gallery image"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SimpleGallerySection;