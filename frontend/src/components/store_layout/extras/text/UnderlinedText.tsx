import React from 'react';
import { getBackgroundStyles, getTextStyles } from '../../../../utils/stylingFunctions';
import { useAppSelector } from '../../../../app/hooks';

interface UnderlinedTextProps {
    style?: any; // Make style prop optional
    input?: string | number;
}

const UnderlinedText: React.FC<UnderlinedTextProps> = ({
    style = {},  // Default to an empty object if style is undefined
    input
}) => {
    // Use optional chaining to safely access properties
    const underline = style?.underline || {};  // Default to an empty object if underline is undefined
    const { colors, fonts } = useAppSelector(state => state.layoutSettings);

    return (
        <div
            style={{ ...getTextStyles(style, fonts, colors) }} 
            className={`w-full flex flex-row ${style?.position === 'center' 
                ? 'justify-center text-center' 
                : style?.position === 'start' 
                ? 'justify-start text-start' 
                : 'justify-end text-end'}`}
        >
            <div 
                style={{
                    maxWidth: style?.width || '100%',  // Default to 100% if width is undefined
                    width: 'fit-content',
                    //wordBreak: 'break-word' // Uncomment if necessary
                }}
                className="flex flex-col items-center text-wrap"
            >
                <div 
                    style={{
                        ...getBackgroundStyles(style?.background || {})  // Fallback to an empty object if background is undefined
                    }}
                    className={`${style?.animation || ''} text-wrap`} 
                    dangerouslySetInnerHTML={{ __html: input|| style?.input || '' }}
                />
                {underline?.show && (
                    <span
                        style={{
                            backgroundColor: colors[underline?.color as keyof typeof colors] || 'black',  // Default to black if color is undefined
                            width: underline?.width || '50%',  // Default to 50% if width is undefined
                            height: underline?.height || '2px',  // Default to 2px if height is undefined
                            marginTop: underline?.marginTop || '0px',  // Default to 0px if marginTop is undefined
                        }}
                        className=""
                    ></span>
                )}
            </div>
        </div>
    );
};

export default UnderlinedText;
