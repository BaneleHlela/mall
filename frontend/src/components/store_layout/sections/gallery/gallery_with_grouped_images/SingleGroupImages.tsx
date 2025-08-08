import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBackgroundStyles, getResponsiveDimension, getTextStyles } from '../../../../../utils/stylingFunctions';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import UnderlinedText from '../../../extras/text/UnderlinedText';

interface SingleGroupImagesProps {
    groupName: string;
    groupDescrition: string;
    thumbnail: string[];
    images: string[];
    textStyle: any;
    style: any;
    descriptionTextStyle: any;
    addModal?: boolean;
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
}) => {
    const [showGrid, setShowGrid] = useState(false);
    const isMobile = window.innerWidth < 768;
    const stack = style.grids.modal.stack;
    const isHorizontal = (isMobile && stack.mobile === 'horizontal') || (!isMobile && stack.desktop === 'horizontal');

    const visibleCount = isMobile ? style.grids.modal.columns.mobile : style.grids.modal.columns.desktop;
    const totalGroups = Math.ceil(images.length / visibleCount);

    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');

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
        <div
            style={{
                ...getBackgroundStyles(style.background.thumbnail),
                height: 'fit-content',
            }}
            className="relative h-fit overflow-hidden"
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
                <div className="w-full">
                    <UnderlinedText style={textStyle} input={groupName} />
                </div>
                {!addModal && (
                    <div className="w-full">
                        <UnderlinedText style={descriptionTextStyle} input={groupDescrition} />
                    </div>
                )}
                
            </div>

            {showGrid && style.addModal && (
                <div
                    style={{
                        ...getBackgroundStyles(style.background.modal),
                    }}
                    className="fixed inset-0 overflow-auto z-50 hide-scrollbar"
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
                    <div className="flex flex-col items-center text-center my-4">
                        <div className="w-full">
                            <UnderlinedText style={style.text.groupName} input={groupName} />
                        </div>
                        <div className="w-full">
                            <UnderlinedText style={style.text.groupDescription} input={groupDescrition} />
                        </div>
                    </div>

                    {isHorizontal ? (
                        <div className="relative w-full  flex flex-col justify-between items-center overflow-hidden">
                            {/* Navigation Buttons */}
                            <div className="flex justify-between absolute top-1/2 w-full z-10">
                                <button
                                    onClick={handlePrev}
                                    style={{
                                        ...getTextStyles(style.toggleButtons),
                                        ...getBackgroundStyles(style.toggleButtons.background),
                                    }}
                                >
                                    <MdOutlineKeyboardArrowLeft />
                                </button>
                                <button
                                    onClick={handleNext}
                                    style={{
                                        ...getTextStyles(style.toggleButtons),
                                        ...getBackgroundStyles(style.toggleButtons.background),
                                    }}
                                >
                                    <MdOutlineKeyboardArrowRight />
                                </button>
                            </div>

                            {/* Animated Image Group */}
                            <div className="w-full flex h-fit justify-center items-center">
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
                                            <img
                                                key={index}
                                                src={imageUrl}
                                                alt={`Image ${index + 1}`}
                                                className="w-full h-auto object-cover hover:opacity-80 transition-opacity duration-300"
                                                style={getBackgroundStyles(style.background.modalImage)}
                                            />
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Count */}
                            {style.stepIndicator.use === 'digits' && (
                                <div 
                                    style={{
                                        ...getTextStyles(style.stepIndicator.text),
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
                                                ...getBackgroundStyles(style.stepIndicator.background),
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
                        </div>
                    ) : (
                        <div
                            style={{
                                gap: getResponsiveDimension(style.grids.modal.gap),
                            }}
                            className={`grid px-1 ${getGridColumnClasses({
                                mobile: style.grids.modal.columns.mobile,
                                desktop: style.grids.modal.columns.desktop,
                            })}`}
                        >
                            {images.map((imageUrl, index) => (
                                <img
                                    key={index}
                                    src={imageUrl}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-auto object-cover hover:opacity-80 transition-opacity duration-300"
                                    style={getBackgroundStyles(style.background.modalImage)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SingleGroupImages;
