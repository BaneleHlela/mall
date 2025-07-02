import React from 'react'
import { getTextStyles, getBackgroundStyles } from '../../../../utils/stylingFunctions';

interface ButtonStyle {
  text: {
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
  style: {
      function: string;
      style: ButtonStyle;
  };
}

const StoreButton: React.FC<StoreButtonProps> = ({ style, onClick }) => {
  return (
    <button
      style={{
        ...getTextStyles(style.style.text),
        ...getBackgroundStyles(style.style.background),
      }}
      className='flex flex-col justify-center w-full hover:scale-102'
      onClick={onClick}
    >
      {style.style.text.input}
    </button>
  )
}

export default StoreButton