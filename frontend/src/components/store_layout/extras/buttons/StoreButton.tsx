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
 style: {
      function: string;
      style: ButtonStyle;
  };
}

const StoreButton: React.FC<StoreButtonProps> = ({ style }) => {
  console.log(style)
  return (
    <button
      style={{
        ...getTextStyles(style.style.text),
        ...getBackgroundStyles(style.style.background),
      }}
      className='flex flex-col justify-center w-[100%]'
    >
      {style.style.text.input}
    </button>
  )
}

export default StoreButton