import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../../../../utils/stylingFunctions';
import StoreButton from '../../../buttons/StoreButton';
import UnderlinedText from '../../../text/UnderlinedText';
import StoreLayoutButton from '../../../../shared_layout_components/StoreLayoutButton';

interface PopularDonationCardProps {
  donationName: string;
  donationDescription: string;
  imageUrl: string;
  marking?: string;
  style: any;
  onClick?: () => void;
  onPayClick?: () => void;
}

const PopularDonationCard: React.FC<PopularDonationCardProps> = ({
  donationName,
  donationDescription,
  imageUrl,
  marking,
  style,
  onClick,
  onPayClick
}) => {

  return (
    <div 
      onClick={() => {}}
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
        <img
          src={imageUrl}
          alt="Donation Image"
          className='w-full h-full object-contain transition-transform duration-500 ease-in-out hover:scale-95'
        />
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
          ...getBackgroundStyles(style.textAndButton.background),
        }} 
        className="px-[1.3vh] flex flex-col justify-between min-h-fit"
      >
        {/* Name */}
        <UnderlinedText style={style.textAndButton.text.name} input={donationName}/>

        {/* Description */}
        <div 
          style={{
            ...getTextStyles(style.textAndButton.text.description)
          }} 
          className={`rich-text
            ${style.textAndButton.text.position === "center" && "text-center"}
            ${style.textAndButton.text.position === "start" && "text-start"}
            ${style.textAndButton.text.position === "end" && "text-end"}
          `}
        >
          <div
            className={`text-wrap w-full rich-text`}
            dangerouslySetInnerHTML={{ __html: donationDescription }}
          />
        </div>

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
            className={`w-full flex flex-row
                ${style.textAndButton.button.show.desktop === "on-hover" && "lg:opacity-0 lg:group-hover:opacity-100 lg:transition-opacity lg:duration-300" }
                ${style.textAndButton.button.show.mobile === "on-hover" && "opacity-0 group-hover:opacity-100 transition-opacity duration-300" }
                ${style.textAndButton.button.position === "center" && "justify-center"}
                ${style.textAndButton.button.position === "start" && "justify-start"}
                ${style.textAndButton.button.position === "end" && "justify-end"} 
            `}
          >
            <StoreLayoutButton
              style={style.textAndButton.button}
              onClick={onPayClick || (() => {})}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularDonationCard;