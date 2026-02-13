import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { Link } from 'react-router-dom';
import { getBackgroundStyles, getResponsiveBackgroundImage, getTextStyles } from '../../../../utils/stylingFunctions';
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
    const { fonts, colors } = useAppSelector((state) => state.layoutSettings);  
    const layoutId = useAppSelector((state) => state.layoutSettings._id);
    const isPreviewMode = location.pathname.startsWith(`/layouts/${layoutId}/preview`);

    const linkTo = isPreviewMode
      ? `/layouts/${layoutId}/preview`
      : `/stores/${store?._id}`;

    const hasLogoImages = logoUrl.length > 0;

    return (
        <Link  to={linkTo} className='flex items-center justify-center lg:justify-start h-fit w-fit max-w-fit pl-1 pr-1 p-0'>
            {use === 'logo' && hasLogoImages ? (
                <img
                    style={{...getBackgroundStyles(style?.background, colors), backgroundColor: 'transparent'}}
                    src={getResponsiveBackgroundImage(logoUrl)}
                    alt='store logo'
                    className='flex items-center justify-center max-h-full w-full object-contain bg-white'
                />
            ) : (
            <div
                style={{
                    ...(style ? getTextStyles(style.text, fonts, colors) : {}),
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