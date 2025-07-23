import React from 'react'
import { getTextStyles } from '../../../../utils/stylingFunctions';

interface UnderlinedTextProps {
    style: any;
    input?: string | number;
}

const UnderlinedText: React.FC<UnderlinedTextProps> = ({
    style,
    input
}) => {
    console.log(style.underline.show, 'style.underline.show')
  return (
    <div
        className={`w-full flex flex-row  ${
        style.position === 'center'
            ? 'justify-center'
            : style.position === 'start'
            ? 'justify-start'
            : 'justify-end'
        }`}
    >
        <div className="flex flex-col items-center">
            <h1 style={{ ...getTextStyles(style) }} className=''>
                {input || style.input}
            </h1>
            {style.underline.show && (
                <span
                    style={{
                        backgroundColor: style.underline.color || 'black',
                        width: style.underline.width || '50%', 
                        height: style.underline.height ||  '2px',
                        marginTop: style.underline.marginTop || '10px',
                    }}
                    className=""
                >     
                </span>
            )}
        </div>
        
    </div>
  )
}

export default UnderlinedText