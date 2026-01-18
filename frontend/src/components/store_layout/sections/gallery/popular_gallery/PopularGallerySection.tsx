import { useState } from 'react';
import { getBackgroundStyles, getResponsiveDimension } from '../../../../../utils/stylingFunctions';
import UnderlinedText from '../../../extras/text/UnderlinedText';
import {IoMdClose } from 'react-icons/io';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import GalleryItem from '../shared_gallery_section_components/GalleryItem';
import { useAppSelector } from '../../../../../app/hooks';

type SelectedImage = {
  url: string;
  title?: string;
  description?: string;
} | null;

const PopularGallerySection = () => {
    const settings = useAppSelector(state => state.layoutSettings.sections.gallery);
    //const settings = mockLayout.sections.gallery;

    const [selectedImage, setSelectedImage] = useState<SelectedImage>(null);
    const [likedImages, setLikedImages] = useState<Set<string>>(new Set());

    const isMobile = window.innerWidth < 768;
    const stack = settings.images.stack;
    const isHorizontal =
        (isMobile && stack.mobile === 'horizontal') ||
        (!isMobile && stack.desktop === 'horizontal');

    const columns = isMobile
        ? settings.images.columns.mobile
        : settings.images.columns.desktop;

    const gap = getResponsiveDimension(settings.images.gap);
    const imageBackgroundStyles = getBackgroundStyles(settings.images.background);

    const handleImageClick = (img: SelectedImage) => {
        setSelectedImage(img);
    };

    const toggleLike = (url: string) => {
        setLikedImages(prev => {
        const next = new Set(prev);
        next.has(url) ? next.delete(url) : next.add(url);
        return next;
        });
    };

    /** 🔹 Flatten imagesDetails */
    const images = settings.images.imagesDetails.flatMap(
        (item: any) =>
        item.urls.map((url: string) => ({
            url,
            title: item.title,
            description: item.description,
        }))
    );

    return (
        <div id="gallery" style={getBackgroundStyles(settings.background)}>
        {(settings.text.heading.input || settings.text.subheading.input) && (
            <div className="w-full">
            <UnderlinedText style={settings.text.heading} />
            {settings.text.subheading.input && (
                <UnderlinedText style={settings.text.subheading} />
            )}
            </div>
        )}

        {/* ================= GALLERY ================= */}
        {isHorizontal ? (
            <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={parseFloat(gap)}
            slidesPerView={columns}
            navigation
            pagination={{ clickable: true }}
            >
            {images.map((img: any, index: any) => (
                <SwiperSlide key={index}>
                <GalleryItem
                    img={img}
                    height={getResponsiveDimension(settings.images.background.height)}
                    likedImages={likedImages}
                    toggleLike={toggleLike}
                    onClick={handleImageClick}
                    styles={imageBackgroundStyles}
                    textStyles={settings.images.text}
                />
                </SwiperSlide>
            ))}
            </Swiper>
        ) : (
            <div
                className={`grid grid-cols-${columns}`}
                style={{ gap }}
            >
            {images.map((img: any, index: any) => (
                <GalleryItem
                    key={index}
                    img={img}
                    height={getResponsiveDimension(settings.images.background.height)}
                    likedImages={likedImages}
                    toggleLike={toggleLike}
                    onClick={handleImageClick}
                    styles={imageBackgroundStyles}
                    textStyles={settings.images.text}
                />
            ))}
            </div>
        )}

        {/* ================= MODAL ================= */}
        {selectedImage && (
            <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
            >
            <div
                className="relative max-w-4xl p-4 backdrop-blur-sm"
                onClick={e => e.stopPropagation()}
            >
                <button
                className="absolute top-2 right-2 bg-white p-2 rounded-full"
                onClick={() => setSelectedImage(null)}
                >
                <IoMdClose />
                </button>

                <img
                src={selectedImage.url}
                className="max-h-[70vh] object-contain"
                />

                {(selectedImage.title || selectedImage.description) && (
                <div className="mt-4 text-white">
                    {selectedImage.title && (
                    <h3 className="text-lg font-semibold">
                        {selectedImage.title}
                    </h3>
                    )}
                    {selectedImage.description && (
                    <p className="text-sm opacity-80">
                        {selectedImage.description}
                    </p>
                    )}
                </div>
                )}
            </div>
            </div>
        )}
        </div>
    );
};

export default PopularGallerySection;
