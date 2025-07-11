import React from 'react'
import ElegantSendEmailFormSettings from './elegant/ElegantSendEmailFormSettings'

interface EmailFormSettingsProps {
    settings: any;
    handleSettingChange: (path: string, value: any) => void;
    objectPath: string;
    variation: string
}

const SendEmailFormSettings: React.FC<EmailFormSettingsProps> = ({
    settings,
    handleSettingChange,
    objectPath,
    variation
}) => {
    if (variation === 'elegantSendEmailForm') {
        return (
            <ElegantSendEmailFormSettings 
                settings={settings}
                handleSettingChange={handleSettingChange}
                objectPath={objectPath}
            />
        )
    }
    
    return (
        <div>SendEmailFormSettings</div>
    )
}

export default SendEmailFormSettings