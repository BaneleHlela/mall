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
                }}
                className="mb-[1vh]"
            >
                {headingInput || 'Address'}
            </h3>
            <div 
                style={{
                    ...getTextStyles(addressStyle),
                }}
                className="whitespace-pre-line"
            >
                {!addressStyle.textArea && (
                    <>
                        {address.map((line, index) => (
                            <p
                                key={index}
                                className=""
                            >
                                {line}
                            </p>
                        ))}
                    </>
                )}
                {addressStyle.textArea}
            </div>
        </div>
    )
}

export default FooterAddressDisplay;