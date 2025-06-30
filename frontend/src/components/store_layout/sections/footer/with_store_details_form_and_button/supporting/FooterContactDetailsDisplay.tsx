import React from 'react'
import { formatPhoneNumber } from '../helpers/footerHelpers'
import { getTextStyles } from '../../../../../../utils/stylingFunctions'
interface FooterAddressDisplayProps {
    phone: string,
    email: string,
    headingInput: any,
    headingStyle: any,
    detailsStyle: any,
}
const FooterContactDetailsDisplay: React.FC<FooterAddressDisplayProps> = ({
    phone,
    email,
    headingInput,
    headingStyle,
    detailsStyle,
}) => {
  return (
    <div className='w-full h-full flex flex-col justify-start'>
        <h3 
            style={{
                ...getTextStyles(headingStyle),
                fontSize: headingStyle.fontSize.desktop,
            }}
            className="mb-3"
        >
                {headingInput || "Contact Us"}
        </h3>
        <div
            style={{
                ...getTextStyles(detailsStyle)
            }}
        >
            <p>{formatPhoneNumber(phone)}</p>
            <p>{email || ""}</p>
        </div>
    </div>
  )
}

export default FooterContactDetailsDisplay