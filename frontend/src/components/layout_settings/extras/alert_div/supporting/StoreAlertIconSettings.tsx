import React from 'react'
import type { SupportingSettingsProps } from '../../../sections/gallery/with_grouped_images/SupportingImagesSettings'
import TextEditor from '../../../text/TextEditor'
import { getSetting } from '../../../../../utils/helperFunctions'
import SettingsSlider from '../../../supporting/SettingsSlider'
import InputHandler from '../../../supporting/InputHandler'
import OptionsToggler from '../../../supporting/OptionsToggler'

const StoreAlertIconSettings: React.FC<SupportingSettingsProps> = ({
    settings,
    handleSettingChange,
    objectPath
}) => {
    
  return (
    <div
        className='space-y-[.3vh]'
    >
        {/* Show */}
        <OptionsToggler
            label="Show Icon"
            options={["No", "Yes"]}
            value={getSetting("show", settings, objectPath)}
            onChange={(value) => handleSettingChange(`${objectPath}.show`, value === "Yes")}
        />
        <InputHandler
            label="Icon Name"
            value={getSetting("name", settings, objectPath)}
            onChange={(value) => handleSettingChange(`${objectPath}.name`, value)}
        />
        <TextEditor
            objectPath={`${objectPath}`}
            settings={settings}
            handleSettingChange={handleSettingChange}
            allow={["color", "fontSize"]}
        />
    </div>  
  )
}

export default StoreAlertIconSettings