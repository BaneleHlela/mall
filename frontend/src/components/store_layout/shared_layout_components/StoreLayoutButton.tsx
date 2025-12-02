import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../utils/stylingFunctions';

interface StoreButtonProps {
    onClick: () => void;
    style: any;
}

const StoreLayoutButton: React.FC<StoreButtonProps> = ({
    onClick,
    style,
}) => {
    // Destructure with fallback values for safe access
  const {
    text = {
      animation: '',
      input: 'Click Me',
      fontFamily: 'Arial',
      color: 'black',
      fontSize: '16px',
      fontWeight: 'normal',
      letterSpacing: '0px',
    },
    background = {
      height: 'auto',
      width: 'auto',
      color: 'transparent',
      shadow: false,
      border: {
        width: '1px',
        style: 'solid',
        color: 'black',
        radius: '0px',
      },
      padding: {
        x: '10px',
        y: '10px',
      },
    },
  } = style || {}; // Fallback to empty object if style.style is undefined

    return (
        <button
            className="z-10"
            onClick={() => onclick}
            style={{
                ...getTextStyles(style.text),
                ...getBackgroundStyles(background),
            }}
        >
            <p className={`${text.animation || ''} flex flex-col justify-center items-center h-full w-full hover:underline z-10`}>
                {text.input || 'Click Me'}  {/* Fallback to 'Click Me' if text.input is undefined */}
            </p>
        </button>
    )
}

export default StoreLayoutButton;