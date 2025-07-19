import React from 'react'

export interface SupportingSettingsProps {
    settings: any;
    handleSettingChange: (path: string, value: any) => void;
    objectPath: string;
}

const AvailableSlotsSettings = ({
    settings,
    handleSettingChange,
    objectPath
}) => {
  return (
    <div>AvailableSlotsSettings</div>
  )
}

export default AvailableSlotsSettings