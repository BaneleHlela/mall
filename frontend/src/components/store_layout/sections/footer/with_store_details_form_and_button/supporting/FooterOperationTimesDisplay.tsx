import React from 'react'
import type { OperationTimes } from '../../../../../../types/storeTypes';
import { formatOperationTimes } from '../helpers/FormattedOperationTimes';
import { getTextStyles } from '../../../../../../utils/stylingFunctions';

interface FooterOperationTimesDisplayProps {
    operationTimes: OperationTimes;
    headingStyle: any;
    detailsStyle: any;
    headingInput: string;
}
const FooterOperationTimesDisplay: React.FC<FooterOperationTimesDisplayProps> = ({
    operationTimes,
    headingStyle,
    detailsStyle,
    headingInput,
}) => {
    
    const formattedTimes = formatOperationTimes(operationTimes, detailsStyle);
 
    return (
        <div>
            <h3
                style={{
                    ...getTextStyles(headingStyle),
                    fontSize: headingStyle.fontSize.desktop,
                }} 
                className="mb-3"
            >{headingInput}</h3>
            {formattedTimes}
        </div>
    )
}

export default FooterOperationTimesDisplay