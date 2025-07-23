import React from 'react'
import type { SupportingSettingsProps } from '../../../sections/gallery/with_grouped_images/SupportingImagesSettings'
import TextEditor from '../../../text/TextEditor'
import { getSetting } from '../../../../../utils/helperFunctions'
import SettingsSlider from '../../../supporting/SettingsSlider'
import InputHandler from '../../../supporting/InputHandler'

const StoreAlertIconSettings: React.FC<SupportingSettingsProps> = ({
    settings,
    handleSettingChange,
    objectPath
}) => {
    
  return (
    <div
        className='space-y-[.3vh]'
    >
        <InputHandler
            label="Icon Name"
            value={getSetting("name", settings, objectPath)}
            onChange={(value) => handleSettingChange(`${objectPath}.name`, value)}
        />
        <TextEditor
            objectPath={`${objectPath}`}
            settings={settings}
            handleSettingChange={handleSettingChange}
            allow={["color"]}
        />
        <div className="px-[.65vh]">
            <SettingsSlider
                label="Font Size"
                value={parseFloat(getSetting("size", settings, objectPath))}
                step={0.1}
                min={0.5}
                max={15}
                onChange={
                    (value) => handleSettingChange(`${objectPath}.size`, `${value}vh`)
                }
            />
        </div>
        
    </div>  
  )
}

export default StoreAlertIconSettings