import React from 'react';
import { getTextStyles, getBackgroundStyles } from '../../../../utils/stylingFunctions';

interface ButtonStyle {
  text: {
    animation: string;
    input: string;
    fontFamily: string;
    color: string;
    fontSize: string;
    fontWeight: string;
    letterSpacing: string;
  };
  background: {
    height: string;
    width: string;
    color: string;
    shadow: boolean;
    border: {
      width: string;
      style: string;
      color: string;
      radius: string;
    };
    padding: {
      x: string;
      y: string;
    };
  };
}

interface StoreButtonProps {
  onClick: () => void;
  style?: {  // Make style optional
    function: string;
    style: ButtonStyle;
  };
}

const StoreButton: React.FC<StoreButtonProps> = ({ style = { function: '', style: {} }, onClick }) => {
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
  } = style.style || {}; // Fallback to empty object if style.style is undefined

  return (
    <button
      style={{
        ...getTextStyles(text), 
        ...getBackgroundStyles(background),
      }}
      className="flex flex-col justify-center items-center hover:scale-102 min-h-fit"
      onClick={onClick}
    >
      <p className={`${text.animation || ''} flex flex-col justify-center items-center h-full w-full hover:underline`}>
        {text.input || 'Click Me'}  {/* Fallback to 'Click Me' if text.input is undefined */}
      </p>
    </button>
  );
};

export default StoreButton;
