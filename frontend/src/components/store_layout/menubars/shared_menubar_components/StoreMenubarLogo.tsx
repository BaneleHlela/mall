import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { Link } from 'react-router-dom';
import { getBackgroundStyles, getTextStyles } from '../../../../utils/stylingFunctions';
import type { BackgroundSettings, TextSettings } from '../../../../types/layoutSettingsType';

interface StoreMenubarLogoProps {
    width?: string;
    use: string;
    logoUrl?: string[];
    logoText?: string;
    style?: {
        text: TextSettings,
        background: BackgroundSettings
    }
}

const StoreMenubarLogo: React.FC<StoreMenubarLogoProps> = ({
    width = 40,
    use = 'logo',
    logoUrl = [],
    logoText = 'Store Logo',
    style,
}) => {
    const store = useAppSelector((state) => state.stores.currentStore);
    const colors = useAppSelector((state) => state.layoutSettings.colors);  
    const layoutId = useAppSelector((state) => state.layoutSettings._id);
    const isPreviewMode = location.pathname.startsWith(`/layouts/${layoutId}/preview`);

    const linkTo = isPreviewMode
      ? `/layouts/${layoutId}/preview`
      : `/stores/${store?._id}`;

    const hasLogoImages = logoUrl.length > 0;

    return (
        <Link style={{...getBackgroundStyles(style?.background, colors)}} to={linkTo} className='flex items-center h-full max-w-fit pl-1 pr-1'>
            {use === 'logo' && hasLogoImages ? (
                <div className="w-full h-full">
                    <img
                        style={{
                        }}
                        src={window.innerWidth < 589 ? logoUrl[0] : (logoUrl[1] || logoUrl[0])}
                        alt='store logo'
                        className='h-full w-full object-contain'
                    />
                </div>
            ) : (
            <div
                style={{
                    ...(style ? getTextStyles(style.text, colors) : {}),
                    ...getBackgroundStyles(style?.background, colors)
                }}
                className='min-w-fit flex flex-col justify-center'
            >
                {logoText || store?.name || 'Store Name'}
            </div>
            )}
      </Link>
    )
}

export default StoreMenubarLogo