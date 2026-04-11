import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useAppSelector } from '../../../../../app/hooks';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { IoMdClose, IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import UnderlinedText from '../../../extras/text/UnderlinedText';
import StoreTextTag from '../../../shared_layout_components/StoreTextTag';
import StoreDivTag from '../../../shared_layout_components/StoreDivTag';

interface SingleGroupImagesProps {
    groupName: string;
    groupDescrition: string;
    thumbnail: string[];
    images: string[];
    textStyle: any;
    style: any;
    descriptionTextStyle: any;
    addModal?: boolean;
    likedImages?: Set<string>;
    toggleLike?: (url: string) => void;
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
    
    return [mobileClass, 'sm:grid-cols-1', desktopClass].join(' ').trim();
}

const SingleGroupImages: React.FC<SingleGroupImagesProps> = ({
    groupName,
    groupDescrition,
    thumbnail,
    images,
    style,
    textStyle,
    descriptionTextStyle,
    addModal = true,
    likedImages,
    toggleLike,
}) => {
    const [showGrid, setShowGrid] = useState(false);
    const isMobile = window.innerWidth < 768;
    const stack = style.grids.modal.stack;
    const isHorizontal = (isMobile && stack.mobile === 'horizontal') || (!isMobile && stack.desktop === 'horizontal');

    const visibleCount = isMobile ? style.grids.modal.columns.mobile : style.grids.modal.columns.desktop;
    const totalGroups = Math.ceil(images.length / visibleCount);

    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');

    const colors = useAppSelector((state) => state.layoutSettings.colors);
    const fonts = useAppSelector((state) => state.layoutSettings.fonts);

    const modalRoot = document.body;

    const handleNext = () => {
        setDirection('right');
        setActiveIndex((prev) => (prev + 1) % totalGroups);
    };

    const handlePrev = () => {
        setDirection('left');
        setActiveIndex((prev) => (prev === 0 ? totalGroups - 1 : prev - 1));
    };

    const startIdx = activeIndex * visibleCount;
    let currentImages = images.slice(startIdx, startIdx + visibleCount);
    if (currentImages.length < visibleCount && images.length > 0) {
        const needed = visibleCount - currentImages.length;
        currentImages = [...currentImages, ...images.slice(0, needed)];
    }

    return (
        <StoreDivTag
            style={{...style.background.thumbnail, height: "fit-content"}}
            jsx={
                <>
                    <div className="text-center h-fit">
                        <div className="relative">
                            <img
                                style={{
                                    ...getBackgroundStyles(style.background.image, colors),
                                    //height: "fit-content"
                                }}
                                src={thumbnail[0]}
                                alt="Thumbnail"
                                className="w-full object-cover cursor-pointer hover:opacity-80 transition-opacity duration-300"
                                onClick={() => setShowGrid(true)}
                            />
                            {/* ❤️ Like Button */}
                            {toggleLike && (
                                <div
                                    className="absolute bottom-2 left-2 text-white z-10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLike(thumbnail[0]);
                                    }}
                                >
                                    {likedImages?.has(thumbnail[0]) ? (
                                        <IoIosHeart className="text-[180%] fill-red-500" />
                                    ) : (
                                        <IoIosHeartEmpty className="text-[180%]" />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Group Name & Description (Div Tag for placement) */}
                    <StoreDivTag
                        style={{ ...style.background.textContainer, height: "fit-content" }}
                        jsx={
                            <>
                                <StoreTextTag style={textStyle} input={groupName} />
                                <StoreTextTag style={descriptionTextStyle} input={groupDescrition} />
                            </>
                        }
                    />
                    {showGrid && style.addModal && createPortal(
                        <div
                            style={{
                                ...getBackgroundStyles(style.background.modal, colors),
                            }}
                            className="fixed inset-0 h-screen w-screen overflow-auto z-[9999] hide-scrollbar"
                        >
                            {/* Close Button */}
                            <div className="flex justify-end">
                                <button
                                    className="mt-4 mr-4 p-1 shadow bg-white text-white rounded-full hover:scale-102"
                                    onClick={() => setShowGrid(false)}
                                >
                                    <IoMdClose className="text-3xl text-black" />
                                </button>
                            </div>

                            {/* Title & Description */}
                            <div className="w-full flex flex-col items-center text-center my-4">
                                <StoreTextTag style={style.text.groupName} input={groupName} />
                                <StoreTextTag style={style.text.groupDescription} input={groupDescrition} />
                            </div>

                            {isHorizontal ? (
                                <div className="relative inset-0 h-full w-full flex flex-col justify-between items-center overflow-hidden">
                                    {/* Animated Image Group */}
                                    <div className="w-full flex h-fit justify-center items-center pt-16">
                                        <AnimatePresence custom={direction} mode="wait">
                                            <motion.div
                                                key={activeIndex}
                                                custom={direction}
                                                initial={{ x: direction === 'right' ? 100 : -100, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: direction === 'right' ? -100 : 100, opacity: 0 }}
                                                transition={{ type: 'keyframes', stiffness: 300, damping: 30, duration: 0.5 }}
                                                className="w-full flex justify-center"
                                                style={{
                                                    gap: getResponsiveDimension(style.grids.modal.gap),
                                                }}
                                            >
                                                {currentImages.map((imageUrl, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={imageUrl}
                                                            alt={`Image ${index + 1}`}
                                                            className="w-full h-auto object-cover hover:opacity-80 transition-opacity duration-300"
                                                            style={getBackgroundStyles(style.background.modalImage, colors)}
                                                        />
                                                        {/* ❤️ Like Button */}
                                                        {toggleLike && (
                                                            <div
                                                                className="absolute bottom-2 left-2 text-white z-10"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleLike(imageUrl);
                                                                }}
                                                            >
                                                                {likedImages?.has(imageUrl) ? (
                                                                    <IoIosHeart className="text-[2.5vh] fill-red-500" />
                                                                ) : (
                                                                    <IoIosHeartEmpty className="text-[2.5vh]" />
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>

                                    {/* Count */}
                                    {style.stepIndicator.use === 'digits' && (
                                        <div
                                            style={{
                                                ...getTextStyles(style.stepIndicator.text, fonts, colors),
                                            }}
                                            className="mt-4 text-sm text-black"
                                        >
                                            {images.length > 0 && (() => {
                                                const start = activeIndex * visibleCount + 1;
                                                const end = Math.min(start + visibleCount - 1, images.length);
                                                return start === end ? `${start} / ${images.length}` : `${start}–${end} / ${images.length}`;
                                            })()}
                                        </div>
                                    )}
                                    

                                    {/* Dots */}
                                    {style.stepIndicator.use === 'dots' && (
                                        <div className="mt-4 flex gap-2">
                                            {Array.from({ length: totalGroups }).map((_, index) => (
                                                <span
                                                    style={{
                                                        ...getBackgroundStyles(style.stepIndicator.background, colors),
                                                        width: getResponsiveDimension(style.stepIndicator.background.height),
                                                        backgroundColor: index === activeIndex ? style.stepIndicator.background.color : 'transparent',
                                                    }}
                                                    key={index}
                                                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                                        index === activeIndex ? 'scale:102' : ''
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* Navigation Buttons - Bottom Right */}
                                    <div className="absolute top-0 right-0 flex items-center gap-1 z-20 font-semibold pb-4 pr-4">
                                        <button 
                                            onClick={handlePrev}
                                            className="flex items-center px-2 py-1 text-sm"
                                            
                                        >
                                            <MdArrowBackIos />
                                            <p className="mb-[.1vh]">Prev</p>
                                        </button>
                                        <div style={{backgroundColor: colors[style.text.heading?.color as keyof typeof colors] || '#000000'}} className="h-5 w-[.2vh]"></div>
                                        <button 
                                            onClick={handleNext}
                                            className="flex items-center px-2 py-1 text-sm"
                                            
                                        >
                                            <p className="mb-[.15vh]">Next</p>
                                            <MdArrowForwardIos />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        gap: getResponsiveDimension(style.grids.modal.gap),
                                    }}
                                    className={`w-full h-full grid px-1 ${getGridColumnClasses({
                                        mobile: style.grids.modal.columns.mobile,
                                        desktop: style.grids.modal.columns.desktop,
                                    })}`}
                                >
                                    {images.map((imageUrl, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={imageUrl}
                                                alt={`Image ${index + 1}`}
                                                className={`w-full h-auto object-cover hover:opacity-80 transition-opacity duration-300
                                                    ${style.background.modalImage.animation}`}
                                                style={getBackgroundStyles(style.background.modalImage, colors)}
                                            />
                                            {/* ❤️ Like Button */}
                                            {toggleLike && (
                                                <div
                                                    className="absolute bottom-2 left-2 text-white z-10"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleLike(imageUrl);
                                                    }}
                                                >
                                                    {likedImages?.has(imageUrl) ? (
                                                        <IoIosHeart className="text-[2.5vh] fill-red-500" />
                                                    ) : (
                                                        <IoIosHeartEmpty className="text-[2.5vh]" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>,
                        modalRoot
                    )}
                    <div className="hidden h-[10vh] w-full"></div>
                </>
            }
        ></StoreDivTag>
        
    );
};

export default SingleGroupImages;
