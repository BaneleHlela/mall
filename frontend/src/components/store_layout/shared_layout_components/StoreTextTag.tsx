import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { getTextStyles } from '../../../utils/stylingFunctions';

interface StoreTextTagProps {
    style?: any;
    input?: string | number;
    className?: string;
}


const StoreTextTag: React.FC<StoreTextTagProps> = ({style, input, className}) => {
    const { fonts, colors } = useAppSelector(state => state.layoutSettings)

    return (
        <div className={`flex items-center w-full ${style.textAlign === 'center' && 'justify-center'}
            ${style.textAlign === 'start' && 'justify-start'}
            ${style.textAlign === 'end' && 'justify-end'} `}
        >
            <div className={`relative`}>
                <p 
                    style={{
                        ...getTextStyles(style, fonts, colors),
                    }}
                    className={`${style.animation} ${className || ''}`}
                    dangerouslySetInnerHTML={{ __html: input || style.input }}
                />

                {style.underline?.show && (
                    <div
                        style={{
                            width: style.underline?.width || "",
                            height: style.underline?.height || "",
                            marginTop: style.underline?.marginTop || "",
                            backgroundColor: colors[style.underline?.color as keyof typeof colors],
                            left: (window.innerWidth < 1024 
                                ? style.underline?.left?.mobile 
                                : style.underline?.left?.desktop) || ""
                        }} 
                        className="absolute w-[50%] h-1 bg-black"
                    />
                )}
            </div>
        </div>
        
    )
}

export default StoreTextTag;
