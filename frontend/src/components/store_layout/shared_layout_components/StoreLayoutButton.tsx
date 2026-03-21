import React from 'react'
import { getBackgroundStyles, getTextStyles } from '../../../utils/stylingFunctions';
import StoreDivTag from './StoreDivTag';
import { useAppSelector } from '../../../app/hooks';
import StoreTextTag from './StoreTextTag';

interface StoreButtonProps {
    onClick: () => void;
    style: any;
    isLoading?: boolean;
}

const StoreLayoutButton: React.FC<StoreButtonProps> = ({
    onClick,
    style,
    isLoading = false,
}) => {
  const {fonts, colors} = useAppSelector(state => state.layoutSettings);
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
      <StoreDivTag
        style={background}
        jsx={
        <button
            onClick={onClick}
            style={{
                ...getTextStyles(style.text, fonts, colors),
            }}
            className="flex justify-center items-center w-full h-full z-10"
        >
            <p className={`${text.animation || ''} w-fit hover:underline z-10`}>
                {text.input || 'Click Me'}  {/* Fallback to 'Click Me' if text.input is undefined */}
            </p>
        </button>
        }
      />
    )
}

export default StoreLayoutButton;