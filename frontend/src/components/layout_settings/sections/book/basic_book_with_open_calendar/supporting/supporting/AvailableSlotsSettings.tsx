import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import FirstOrderSubSettingsContainer from '../../../../../FirstOrderSubSettingsContainer'
import SlidingPanel from '../../../../../supporting/SlidingPanel'
import TextEditor from '../../../../../text/TextEditor'
import BackgroundEditor from '../../../../../background/BackgroundEditor'
import SubSettingsContainer from '../../../../../extras/SubSettingsContainer'

export interface SupportingSettingsProps {
  settings: any;
  handleSettingChange: (path: string, value: any) => void;
  objectPath: string;
}

const AvailableSlotsSettings: React.FC<SupportingSettingsProps> = ({
  settings,
  handleSettingChange,
  objectPath
}) => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className='space-y-[.3vh]'>
      {/* Selected Date Settings */}
      <FirstOrderSubSettingsContainer
        name="Selected Date"
        onClick={() => setActivePanel("selected_date")}
      />

      {/* Time Slot Settings */}
      <FirstOrderSubSettingsContainer
        name="Time Slot"
        onClick={() => setActivePanel("time_slot")}
      />

      <AnimatePresence>
        {/* Selected Date Panel */}
        {activePanel === "selected_date" && (
          <SlidingPanel key="selected_date" isOpen={true} onClose={closePanel} title="Selected Date Text Settings">
            <div className="px-[.6vh] space-y-[.3vh] py-[.3vh]">
              <TextEditor
                objectPath={`${objectPath}.selectedDate.text`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["fontFamily", "color", "fontSize", "weight", "letterSpacing", "textDecoration", "fontStyle", "lineHeight"]}
              />
            </div>
          </SlidingPanel>
        )}

        {/* Time Slot Panel */}
        {activePanel === "time_slot" && (
          <SlidingPanel key="time_slot" isOpen={true} onClose={closePanel} title="Time Slot Settings">
            <div className="px-[.6vh] space-y-[.3vh] py-[.3vh]">
              <SubSettingsContainer
                name="Text"
                SettingsComponent={
                  <TextEditor
                    objectPath={`${objectPath}.timeSlot.text`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["fontFamily", "color", "fontSize", "weight", "letterSpacing", "textDecoration", "fontStyle", "lineHeight"]}
                  />
                }
              />
              <SubSettingsContainer
                name="Background"
                SettingsComponent={
                  <BackgroundEditor
                    objectPath={`${objectPath}.timeSlot.background`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["color", "border", "padding"]}
                    responsivePadding
                    heightUnit='vh'
                  />
                }
              />
            </div>
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AvailableSlotsSettings
