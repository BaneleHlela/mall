import React, { useState } from 'react'
import type { SectionEditorProps } from '../../../SectionSettings'
import SubSettingsContainer from '../../../../extras/SubSettingsContainer'
import BackgroundEditor from '../../../../background/BackgroundEditor'
import FirstOrderSubSettingsContainer from '../../../../FirstOrderSubSettingsContainer'
import SlidingPanel from '../../../../supporting/SlidingPanel'
import TextEditor from '../../../../text/TextEditor'
import { AnimatePresence } from 'framer-motion'
import StoreButtonSettings from '../../../../extras/StoreButtonSettings'
import OptionsToggler from '../../../../supporting/OptionsToggler'
import { getSetting } from '../../../../../../utils/helperFunctions'
import { useAppSelector } from '../../../../../../app/hooks'

const PopularTeamCardSettings: React.FC<SectionEditorProps> = ({
  settings,
  handleSettingChange
}) => {
  const objectPath="team.card";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);
  const services = useAppSelector((state) => state.services.services)
  console.log(services)


  return (
    <div className="space-y-[.3vh]">
        <OptionsToggler
            label="Mobile Stack"
            options={["row", "column"]}
            value={getSetting("stack.mobile", settings, objectPath)}
            onChange={(value) => handleSettingChange(`${objectPath}.stack.mobile`, value)}
        />
        <OptionsToggler
            label="Desktop Stack"
            options={["row", "column"]}
            value={getSetting("stack.desktop", settings, objectPath)}
            onChange={(value) => handleSettingChange(`${objectPath}.stack.desktop`, value)}
        />
        {/* Background Settings */}
        <SubSettingsContainer
            name="Background"
            SettingsComponent={
                <div className="px-2 space-y-[.3vh] pb-1">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["color", "border", "height"]}
                        heightUnit="vh"
                        responsiveSize
                    />
                </div>
            }
        />
        <SubSettingsContainer
            name="Images Background"
            SettingsComponent={
                <div className="px-2 space-y-2">
                    <BackgroundEditor
                        objectPath={`${objectPath}.image`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["border", "width", "height"]}
                        widthUnit='%'
                        heightUnit='%'
                        responsiveSize
                    />
                </div>
            }
        />
        <SubSettingsContainer
            name="Details Background"
            SettingsComponent={
                <div className="px-2 space-y-2">
                    <BackgroundEditor
                        objectPath={`${objectPath}.textAndButton.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["padding", "position"]}
                        responsivePadding
                    />
                </div>
            }
        />
        <FirstOrderSubSettingsContainer
            name="Text"
            onClick={() => setActivePanel("Text")}
        />
        <FirstOrderSubSettingsContainer
            name="Button"
            onClick={() => setActivePanel("Button")}
        />
      <AnimatePresence>
        {activePanel === "Text" && (
          <SlidingPanel onClose={closePanel} isOpen={true} title="Card Text Settings">
            <div className="space-y-[.3vh] ">
              <SubSettingsContainer
                name="Name"
                SettingsComponent={
                  <TextEditor
                    objectPath={`${objectPath}.textAndButton.text.name`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["color", "padding", "fontSize", "weight", "fontStyle", "letterSpacing", "textTransform", "lineHeight"]}
                    responsiveSize
                    responsivePadding
                  />
                }
              />
              <SubSettingsContainer
                name="About"
                SettingsComponent={
                  <TextEditor
                    objectPath={`${objectPath}.textAndButton.text`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["position", "padiing", "fontFamily", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "lineHeight", "textDecoration"]}
                    responsiveSize
                    responsivePadding
                  />
                }
              />
            </div>
          </SlidingPanel>
          
        )}
        {activePanel === "Button" && (
            <SlidingPanel onClose={closePanel} isOpen={true} title="Book Button Settings">
              <OptionsToggler
                  label="Show"
                  options={["yes", "no"]}
                  value={getSetting("textAndButton.button.show", settings, objectPath) ? "yes" : "no"}
                  onChange={(value) => handleSettingChange(`${objectPath}.textAndButton.button.show`, value === "yes")}
              />
              <StoreButtonSettings 
                settings={settings} 
                objectPath={`${objectPath}.textAndButton.button`}
                allowPosition
              />
            </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PopularTeamCardSettings;