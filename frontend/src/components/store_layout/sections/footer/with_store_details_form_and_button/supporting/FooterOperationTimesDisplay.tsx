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
                }} 
                className="mb-[1vh]"
            >{headingInput}</h3>
            {formattedTimes}
        </div>
    )
}

export default FooterOperationTimesDisplay