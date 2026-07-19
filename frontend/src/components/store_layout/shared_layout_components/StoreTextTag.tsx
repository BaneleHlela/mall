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
    const isAbsolute = !!style?.placement?.isAbsolute;

    const textElement = (
        <p
            style={{
                ...getTextStyles(style, fonts, colors),
            }}
            className={`${style.animation} ${className || ''}`}
            dangerouslySetInnerHTML={{ __html: input || style.input }}
        />
    );

    // Left is an optional, disableable value: when unset, fall back to the
    // underline's own start/center/end Position setting instead of pinning to 0.
    const underlineLeftValue = style.underline?.left
        ? (window.innerWidth < 1024 ? style.underline.left.mobile : style.underline.left.desktop)
        : undefined;

    const underlinePositionStyle: React.CSSProperties = underlineLeftValue
        ? { left: underlineLeftValue }
        : style.underline?.position === "end"
            ? { right: 0 }
            : style.underline?.position === "start"
                ? { left: 0 }
                : { left: "50%", transform: "translateX(-50%)" };

    const underlineElement = style.underline?.show && (
        <div
            style={{
                width: style.underline?.width || "",
                height: style.underline?.height || "",
                marginTop: style.underline?.marginTop || "",
                backgroundColor: colors[style.underline?.color as keyof typeof colors],
                ...underlinePositionStyle,
            }}
            className="absolute w-[50%] h-1 bg-black"
        />
    );

    if (isAbsolute) {
        // Skip the `relative` wrapper below: it shrinks to fit its content,
        // and once the <p> becomes position:absolute it has no in-flow
        // content left, so it collapses to a 0x0 box. top/left/right/bottom
        // then resolve against that point instead of the section, which is
        // what caused the placement to look "weird". Rendering bare here
        // lets the <p> attach to the nearest real positioned ancestor
        // instead (the section container rendered by StoreDivTag).
        return (
            <>
                {textElement}
                {underlineElement}
            </>
        );
    }

    return (
        <div className={`flex items-center w-full ${style.textAlign === 'center' && 'justify-center'}
            ${style.textAlign === 'start' && 'justify-start'}
            ${style.textAlign === 'end' && 'justify-end'}`}
        >
            <div className={`relative flex items-center
                ${style.textAlign === 'center' && 'justify-center'}
                ${style.textAlign === 'start' && 'justify-start'}
                ${style.textAlign === 'end' && 'justify-end'} `}>
                {textElement}
                {underlineElement}
            </div>
        </div>
    )
}

export default StoreTextTag;
