import React, { useState, useRef, useEffect } from 'react';
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';
import UnderlinedText from '../../../text/UnderlinedText';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { formatPriceWithSpaces } from '../../product/popular/PopularProductCard';
import RentalDescriptionModal from '../../../modals/RentalDescriptionModal';

// Import Swiper styles
import 'swiper/css';
import { useAppSelector } from '../../../../../../app/hooks';
import StoreLayoutButton from '../../../../shared_layout_components/StoreLayoutButton';
import StoreRentalsSectionBookingModal from '../../../../sections/rentals/shared_rental_section_components/StoreRentalsSectionBookingModal';

interface PopularRentalCardProps {
  rentalName: string;
  rentalDescription: string;
  rentalPrice: number;
  rentalDuration: string;
  rentalImages: string[];
  marking?: string;
  style: any;
  onClick?: () => void;
}

const PopularRentalCard: React.FC<PopularRentalCardProps> = ({
  rentalName,
  rentalDescription,
  rentalPrice,
  rentalDuration,
  rentalImages,
  style,
  onClick,
  marking
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  const { fonts, colors } = useAppSelector(state => state.layoutSettings)

  useEffect(() => {
    if (descriptionRef.current) {
      const element = descriptionRef.current;
      setIsClamped(element.scrollHeight > element.clientHeight);
    }
  }, [rentalDescription]);

  console.log(isBookingModalOpen);

  return (
    <div
      style={{
        ...getBackgroundStyles(style.background),
      }}
      className={`flex group w-full h-full
          ${style.stack.mobile === "column" ? "flex-col" : "flex-row" }
          lg:${style.stack.desktop === "column" ? "flex-col" : "flex-row" }
      hover:scale-101`}
    >
      {/* Image */}
      <div
        style={{
          ...getBackgroundStyles(style.image)
        }}
        className='overflow-hidden relative'
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          {rentalImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Rental Image ${index}`}
                className='w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110'
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {marking && (
          <button
            style={{
              ...getTextStyles(style.markingButton.text),
              ...getBackgroundStyles(style.markingButton.background)
            }}
            className="absolute top-[.5vh] left-[.5vh] bg-black text-white"
          >
            {marking || "New"}
          </button>
        )}
      </div>

      {/* Text and button */}
      <div
        style={{
          ...getBackgroundStyles(calculateTextDimensions(style.stack, style.image)),
          ...getBackgroundStyles(style.textAndButton.background),
        }}
        className="px-[1.3vh] flex flex-col justify-between min-h-fit"
      >
        {/* Name */}
        <UnderlinedText style={style.textAndButton.text.name} input={rentalName}/>

        {/* Description */}
        <div 
          style={{
            wordSpacing: "1px"
          }}
          className={ `relative
              ${style.textAndButton.text.position === "center" && "text-center"}
              ${style.textAndButton.text.position === "start" && "text-start"}
              ${style.textAndButton.text.position === "end" && "text-end"}`}
        >
          <div
            ref={descriptionRef}
            style={{
              ...getTextStyles(style.textAndButton.text.description, fonts, colors)
            }}
            className={`line-clamp-3 overflow-hidden rich-text
              ${style.textAndButton.text.position === "center" && "text-center"}
              ${style.textAndButton.text.position === "start" && "text-start"}
              ${style.textAndButton.text.position === "end" && "text-end"}
            `}
            dangerouslySetInnerHTML={{ __html: rentalDescription }}
          />
          {isClamped && (
            <button
              style={{
                ...getTextStyles(style.textAndButton.text.description, fonts, colors),
                paddingY: "2px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className={`underline ml-1
                ${style.textAndButton.text.position === "center" && "text-center"}
                ${style.textAndButton.text.position === "start" && "text-start"}
                ${style.textAndButton.text.position === "end" && "text-end"}
                `}
            >
              {`Read more`}
            </button>
          )}
          <div
            style={{
              backgroundColor:
                colors[
                  style.textAndButton.text.name.color as keyof typeof colors
                ],
            }}
            className="h-[.1vh] w-full my-[2vh] opacity-50"
          />
        </div>

        {/* Duration */}
        <p
          style={{
            ...getTextStyles(style.textAndButton.text.duration)
          }}
          className={`
            ${style.textAndButton.text.position === "center" && "text-center"}
            ${style.textAndButton.text.position === "start" && "text-start"}
            ${style.textAndButton.text.position === "end" && "text-end"}
          `}
        >
          {rentalDuration} {style.textAndButton.text.duration.input}
        </p>

        {/* Price */}
        <p
          style={{
            ...getTextStyles(style.textAndButton.text.price)
          }}
          className={`
            ${style.textAndButton.text.position === "center" && "text-center"}
            ${style.textAndButton.text.position === "start" && "text-start"}
            ${style.textAndButton.text.position === "end" && "text-end"}
          `}
        >
          R{formatPriceWithSpaces(rentalPrice)} {style.textAndButton.text.price.input}
        </p>

        {/* Button */}
        <div
          className={`flex-row w-full
              ${style.textAndButton.button.show.desktop === "never" && "lg:hidden"}
              ${style.textAndButton.button.show.mobile === "never" && "hidden"}
              ${style.textAndButton.button.show.desktop !== "never"  && "lg:flex"}
              ${style.textAndButton.button.show.mobile !== "never" && "flex"}
          `}
        >
          <div
            className={`w-full flex flex-row py-[2vh]
                ${style.textAndButton.button.show.desktop === "on-hover" && "lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-300" }
                ${style.textAndButton.button.show.mobile === "on-hover" && "opacity-0 group-hover:opacity-100 transition-opacity duration-300" }
                ${style.textAndButton.button.position === "center" && "justify-center"}
                ${style.textAndButton.button.position === "start" && "justify-start"}
                ${style.textAndButton.button.position === "end" && "justify-end"}
            `}
          >
            <StoreLayoutButton
              style={style.textAndButton.button}
              onClick={() => setIsBookingModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <RentalDescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        description={rentalDescription}
        title={rentalName}
      />
      {isBookingModalOpen && (
        <StoreRentalsSectionBookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          rentalName={rentalName}
          rentalDuration={rentalDuration}
        />
      )}
    </div>
  );
};

export default PopularRentalCard;

// Helper Functions (copied from PopularProductCard)
interface StackConfig {
  mobile: 'column' | 'row';
  desktop: 'column' | 'row';
}

interface DimensionConfig {
  mobile: string;
  desktop: string;
}

interface ImageConfig {
  urls: string[];
  height: DimensionConfig;
  width: DimensionConfig;
}

interface TextDimensions {
  height: DimensionConfig;
  width: DimensionConfig;
}

function calculateTextDimensions(stack: StackConfig, image: ImageConfig): TextDimensions {
  const calculateDimension = (value: string): string => {
    const numValue = parseInt(value);
    return isNaN(numValue) ? '100%' : `${100 - numValue}%`;
  };

  return {
    height: {
      mobile: stack.mobile === 'column' ? calculateDimension(image.height.mobile) : image.height.mobile,
      desktop: stack.desktop === 'column' ? calculateDimension(image.height.desktop) : image.height.desktop,
    },
    width: {
      mobile: stack.mobile === 'row' ? calculateDimension(image.width.mobile) : image.width.mobile,
      desktop: stack.desktop === 'row' ? calculateDimension(image.width.desktop) : image.width.desktop,
    },
  };
}