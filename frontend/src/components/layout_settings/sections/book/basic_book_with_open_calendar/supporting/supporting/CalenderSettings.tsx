import React from 'react'

export interface SupportingSettingsProps {
    settings: any;
    handleSettingChange: (path: string, value: any) => void;
    objectPath: string;
}

const CalenderSettings: React.FC<SupportingSettingsProps> = ({
    settings,
    handleSettingChange,
    objectPath
}) => {
  return (
    <div>CalenderSettings</div>
  )
}

export default CalenderSettings