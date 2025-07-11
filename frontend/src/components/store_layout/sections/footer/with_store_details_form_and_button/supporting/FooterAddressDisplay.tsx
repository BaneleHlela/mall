import React from 'react'
import { useAppSelector } from '../../../../../../app/hooks';
import { getTextStyles } from '../../../../../../utils/stylingFunctions';
import { formatAddress } from '../helpers/footerHelpers';

const FooterAddressDisplay = ({location, headingStyle, headingInput, addressStyle}: {location: string, headingStyle: any, addressStyle: any, headingInput: string}) => {
    const address = formatAddress(location);
    return (
        <div className='h-full w-full flex flex-col justify-start'>
            <h3 
                style={{
                    ...getTextStyles(headingStyle),
                    fontSize: headingStyle.fontSize.desktop,
                }}
                className="mb-3"
            >
                {headingInput || 'Address'}
            </h3>
            <div 
                style={{
                    ...getTextStyles(addressStyle),
                }}
                className="">
                {address.map((line, index) => (
                    <p
                        key={index}
                        className=""
                    >
                        {line}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default FooterAddressDisplay;