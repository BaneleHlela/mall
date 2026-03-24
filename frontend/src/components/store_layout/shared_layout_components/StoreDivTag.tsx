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


  return (
    <div
      style={{
        ...getBackgroundStyles(style || {}, colors),
        minHeight: "fit-content"
      }}
      className="w-full h-full min-h-fit overflow-y-scroll hide-scrollbar"
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
            className="absolute inset-0 w-full h-full object-cover"
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