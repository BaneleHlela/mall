import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import FirstOrderSubSettingsContainer from '../../../../../FirstOrderSubSettingsContainer'
import SlidingPanel from '../../../../../supporting/SlidingPanel'
import SubSettingsContainer from '../../../../../extras/SubSettingsContainer'
import BackgroundEditor from '../../../../../background/BackgroundEditor'
import TextEditor from '../../../../../text/TextEditor'

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
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className='space-y-[.3vh]'>
      {/* Top-level setting options */}
      <FirstOrderSubSettingsContainer name="Calendar Background" onClick={() => setActivePanel('background')} />
      {/* <FirstOrderSubSettingsContainer name="Text" onClick={() => setActivePanel('text')} /> */}
      <FirstOrderSubSettingsContainer name="Date" onClick={() => setActivePanel('date')} />
      <FirstOrderSubSettingsContainer name="Today Date" onClick={() => setActivePanel('todayDate')} />
      <FirstOrderSubSettingsContainer name="Selected Date" onClick={() => setActivePanel('selectedDate')} />
      <FirstOrderSubSettingsContainer name="Toggle Month Icon" onClick={() => setActivePanel('toggleMonthIcon')} />
      <FirstOrderSubSettingsContainer name="Month Text" onClick={() => setActivePanel('monthText')} />
      <FirstOrderSubSettingsContainer name="Weekday" onClick={() => setActivePanel('weekday')} />
      <FirstOrderSubSettingsContainer name="Neighbouring Month" onClick={() => setActivePanel('neighbouringMonth')} />

      <AnimatePresence>
        {activePanel === 'background' && (
          <SlidingPanel isOpen={true} onClose={closePanel} title="Calendar Background">
            <div className='px-[.6vh] py-[.3vh] space-y-[.3vh]'>
              <BackgroundEditor
                objectPath={`${objectPath}.background`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["color", "shadow", "border", "padding"]}
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === 'text' && (
          <SlidingPanel isOpen={true} onClose={closePanel} title="Calendar Text">
            <div className='px-[.6vh] py-[.3vh] space-y-[.3vh]'>
              <TextEditor
                objectPath={`${objectPath}.text`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["fontFamily", "color"]}
              />
            </div>
          </SlidingPanel>
        )}
        {["date", "todayDate", "selectedDate"].includes(activePanel || '') && (
          <SlidingPanel isOpen={true} onClose={closePanel} title={`${activePanel} Settings`}>
            <div className='px-[.6vh] py-[.3vh] space-y-[.3vh]'>
              <SubSettingsContainer
                name="Text"
                SettingsComponent={
                  <TextEditor
                    objectPath={`${objectPath}.${activePanel}.text`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["fontFamily", "color", "weight"]}
                  />
                }
              />
              <SubSettingsContainer
                name="Background"
                SettingsComponent={
                  <BackgroundEditor
                    objectPath={`${objectPath}.${activePanel}.background`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["color", "border", "padding"]}
                  />
                }
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === 'toggleMonthIcon' && (
          <SlidingPanel isOpen={true} onClose={closePanel} title="Toggle Month Icon">
            <div className='px-[.6vh] py-[.3vh] space-y-[.3vh]'>
              <TextEditor
                objectPath={`${objectPath}.toggleMonthIcon`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["color", "fontSize"]}
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === 'monthText' && (
          <SlidingPanel isOpen={true} onClose={closePanel} title="Month Text">
            <div className='px-[.6vh] py-[.3vh] space-y-[.3vh]'>
              <TextEditor
                objectPath={`${objectPath}.monthText`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["color", "fontFamily", "fontSize", "fontWeight", "letterSpacing"]}
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === 'weekday' && (
          <SlidingPanel isOpen={true} onClose={closePanel} title="Weekday Text">
            <div className='px-[.6vh] py-[.3vh] space-y-[.3vh]'>
              <SubSettingsContainer
                name="Text"
                SettingsComponent={
                  <TextEditor
                    objectPath={`${objectPath}.weekday.text`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["fontSize", "fontWeight", "textDecoration", "color"]}
                  />
                }
              />
              <SubSettingsContainer
                name="Underline"
                SettingsComponent={
                  <BackgroundEditor
                    objectPath={`${objectPath}.weekday.underlineColor`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["color"]}
                  />
                }
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === 'neighbouringMonth' && (
          <SlidingPanel isOpen={true} onClose={closePanel} title="Neighbouring Month">
            <div className='px-[.6vh] py-[.3vh] space-y-[.3vh]'>
              <TextEditor
                objectPath={`${objectPath}.neighbouringMonth`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["color"]}
              />
            </div>
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CalenderSettings
