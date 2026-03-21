import React from 'react'
import type { TextSettings } from '../../../types/layoutSettingsType'
import { useAppSelector } from '../../../app/hooks'
import { getTextStyles } from '../../../utils/stylingFunctions'

const StoreTextTag = ({style, customInput}: {style: TextSettings, customInput?: string}) => {
    const { fonts, colors } = useAppSelector(state => state.layoutSettings)
    if (!style.input || customInput) {
        return null
    }
    return (
        <div className={`flex items-center w-full ${style.textAlign === 'center' && 'justify-center'}
            ${style.textAlign === 'start' && 'justify-start'}
            ${style.textAlign === 'end' && 'justify-end'} `}
        >
            <p 
                style={{
                    ...getTextStyles(style, fonts, colors),
                }}
                className={`relative ${style.animation}`}
            >
                {customInput || style.input}
                {style.underline?.show && (
                    <div
                        style={{
                            width: style.underline?.width || "",
                            height: style.underline?.height || "",
                            marginTop: style.underline?.marginTop || "",
                            backgroundColor: colors[style.underline?.color as keyof typeof colors],
                            left: (window.innerWidth < 1024 ? style.underline?.left?.mobile : style.underline?.left?.desktop) || ""
                        }} 
                        className="absolute w-[50%] h-1 bg-black">

                    </div>
                )}
                
            </p>
        </div>
        
    )
}

export default StoreTextTag;