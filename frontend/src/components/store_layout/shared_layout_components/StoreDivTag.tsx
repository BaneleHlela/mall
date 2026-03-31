import React from 'react'
import type { BackgroundSettings } from '../../../types/layoutSettingsType';
import { getBackgroundStyles, getResponsiveBackgroundImage } from '../../../utils/stylingFunctions';
import { useAppSelector } from '../../../app/hooks';

type Props = {
  style?: BackgroundSettings; // ✅ make optional
  jsx?: React.ReactNode;
};

const StoreDivTag = ({ style = {}, jsx }: Props) => {
  const colors  = useAppSelector(state => state.layoutSettings.colors);
  // ✅ Safe background image
  const bgImageSrc = style?.backgroundImage?.imageUrl?.length
    ? getResponsiveBackgroundImage(style.backgroundImage.imageUrl)
    : undefined;

  // ✅ Safe floating image
  const floatingImageSrc = style?.floatingImage?.imageUrl?.length
    ? getResponsiveBackgroundImage(style.floatingImage.imageUrl)
    : undefined;

  // ✅ Map itemsPosition to flex classes
  const getJustifyContent = (x: string | undefined) => {
    switch (x) {
      case 'start': return 'justify-start';
      case 'center': return 'justify-center';
      case 'end': return 'justify-end';
      case 'evenly': return 'justify-evenly';
      default: return 'justify-center';
    }
  };

  const getAlignItems = (y: string | undefined) => {
    switch (y) {
      case 'start': return 'items-start';
      case 'center': return 'items-center';
      case 'end': return 'items-end';
      case 'evenly': return 'items-stretch';
      default: return 'items-center';
    }
  };

  const itemsPositionX = style?.placement?.itemsPosition?.x;
  const itemsPositionY = style?.placement?.itemsPosition?.y;
  const justifyClass = getJustifyContent(itemsPositionX);
  const alignClass = getAlignItems(itemsPositionY);


  return (
    <div
      style={{
        ...getBackgroundStyles(style || {}, colors),
        minHeight: "fit-content"
      }}
      className={`flex items-center w-full h-full min-h-fit overflow-y-scroll hide-scrollbar`}
    >
      <div className="relative w-full h-full">

        {/* Content */}
        <div className="relative w-full h-full min-h-fit z-10">
          {jsx}
        </div>

        {/* Background image (only render if exists) */}
        {bgImageSrc && (
          <img 
            src={bgImageSrc}
            className="absolute inset-0 w-full h-full object-cover backdrop-blur-lg"
          />
        )}
        {/* Floating Image (fully guarded) */}
        {floatingImageSrc && (
          <img 
            style={{
              ...getBackgroundStyles(style?.floatingImage || {}, colors),
            }}
            src={floatingImageSrc}
            className="absolute object-cover z-10"
          />
        )}
      </div>
    </div>
  )
};

export default StoreDivTag;