import React from 'react'

export interface SupportingSettingsProps {
    settings: any;
    handleSettingChange: (path: string, value: any) => void;
    objectPath: string;
}

const ServiceDetailsSettings: React.FC<SupportingSettingsProps> = ({
    settings,
    handleSettingChange,
    objectPath
}) => {
  return (
    <div>ServiceDetailsSettings</div>
  )
}

export default ServiceDetailsSettings