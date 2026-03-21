import React from 'react'
import type { BackgroundSettings } from '../../../types/layoutSettingsType';
import { getBackgroundStyles, getResponsiveBackgroundImage } from '../../../utils/stylingFunctions';

type Props = {
  style?: BackgroundSettings; // ✅ make optional
  jsx?: React.ReactNode;
};

const StoreDivTag = ({ style = {}, jsx }: Props) => {
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
        ...getBackgroundStyles(style || {}),
      }}
    >
      <div className="relative w-full h-full">

        {/* Content */}
        <div className="relative z-10">
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
              ...getBackgroundStyles(style?.floatingImage || {}),
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