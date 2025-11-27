import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { Link } from 'react-router-dom';
import { getTextStyles } from '../../../../utils/stylingFunctions';

interface StoreMenubarLogoProps {
    width?: string;
    use: string;
    logoUrl?: string[];
    logoText?: string;
    style?: {
        color: string;
        fontSize: string;
        fontWeight: string;
        letterSpacing: string;
        textDecoration: string;
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
    const layoutId = useAppSelector((state) => state.layoutSettings._id);
    const isPreviewMode = location.pathname.startsWith(`/layouts/${layoutId}/preview`);

    const linkTo = isPreviewMode
      ? `/layouts/${layoutId}/preview`
      : `/stores/${store?._id}`;

    return (
        <Link to={linkTo} className='w-fit h-full pl-1 pr-1 flex flex-col justify-center items-center'>
            {use === 'logo' && store?.logo?.url ? (
            <img
                style={{ 
                  width: width,
                }}
                src={window.innerWidth < 589 ? logoUrl[0] : logoUrl[1]}
                alt='store logo'
                className='object-cover'
            />
            ) : (
            <div
                style={{
                    color: style?.color || 'black',
                    ...getTextStyles(style),
                    fontWeight: style?.fontWeight || 'bold',
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