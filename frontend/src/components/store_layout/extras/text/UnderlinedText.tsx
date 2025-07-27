import React from 'react';
import { getTextStyles } from '../../../../utils/stylingFunctions';

interface UnderlinedTextProps {
    style: any;
    input?: string | number;
}

const UnderlinedText: React.FC<UnderlinedTextProps> = ({
    style,
    input
}) => {
    const underline = style?.underline;


    return (
        <div
            style={{ ...getTextStyles(style) }} 
            className={`w-full flex flex-row ${
                style.position === 'center'
                    ? 'justify-center text-center'
                    : style.position === 'start'
                    ? 'justify-start text-start'
                    : 'justify-end text-end'
            }`}
        >
            <div className="flex flex-col items-center">
                <h1 className={`${style.animation}`}>
                    {input || style.input}
                </h1>
                {underline?.show && (
                    <span
                        style={{
                            backgroundColor: underline.color || 'black',
                            width: underline.width || '50%',
                            height: underline.height || '2px',
                            marginTop: underline.marginTop || '0px',
                        }}
                        className=""
                    ></span>
                )}
            </div>
        </div>
    );
};

export default UnderlinedText;
