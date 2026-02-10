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
import MultipleLayoutImagesHandler from '../../../../supporting/MultipleLayoutImagesHandler'
import { getSetting } from '../../../../../../utils/helperFunctions'
import { useAppSelector } from '../../../../../../app/hooks'
import UnderlinedTextSettings from '../../../../extras/text/UnderlinedTextSettings'

const ServiceCardWithImageSettings: React.FC<SectionEditorProps> = ({
  settings,
  handleSettingChange
}) => {
  const objectPath="sections.services.card";
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
                <div className="px-[.6vh] space-y-[.3vh] pb-[.3vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["color", "border", "height", "shadow"]}
                        heightUnit="vh"
                        responsiveSize
                    />
                </div>
            }
        />
        {/* Image Settings */}
        <SubSettingsContainer
            name="Images"
            SettingsComponent={
                <div className="px-[.6vh] space-y-2">
                    
                    <BackgroundEditor
                        objectPath={`${objectPath}.image`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["border", "width", "height", "color"]}
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
                <div className="px-[.6vh] space-y-2">
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
            <div className="space-y-[.3vh]">
                <div className="border rounded px-[.6vh]">
                    <OptionsToggler
                        label="Show price"
                        options={["yes", "no"]}
                        value={getSetting("textAndButton.text.show.price", settings, objectPath) ? "yes" : "no"}
                        onChange={(value) => handleSettingChange(`${objectPath}.textAndButton.text.show.price`, value === "yes")}
                    />
                    <OptionsToggler
                        label="Show duration"
                        options={["yes", "no"]}
                        value={getSetting("textAndButton.text.show.duration", settings, objectPath) ? "yes" : "no"}
                        onChange={(value) => handleSettingChange(`${objectPath}.textAndButton.text.show.duration`, value === "yes")}
                    />
                    <OptionsToggler
                        label="Show description"
                        options={["yes", "no"]}
                        value={getSetting("textAndButton.text.show.description", settings, objectPath) ? "yes" : "no"}
                        onChange={(value) => handleSettingChange(`${objectPath}.textAndButton.text.show.description`, value === "yes")}
                    />
                </div>
                  <FirstOrderSubSettingsContainer
                    name="Service Name"
                    onClick={() => setActivePanel("Service Name")}
                  />
                  <FirstOrderSubSettingsContainer
                    name="Service Details"
                    onClick={() => setActivePanel("Service Details")}
                  />
            </div>
          </SlidingPanel>
        )}
        {activePanel === "Button" && (
            <SlidingPanel onClose={closePanel} isOpen={true} title="Book Button Settings">
              <StoreButtonSettings 
                settings={settings} 
                objectPath={`${objectPath}.textAndButton.button`}
                allowPosition
                allowShow
                allowFunction
              />
            </SlidingPanel>
        )}
        {activePanel === "Service Name" && (
            <SlidingPanel onClose={closePanel} isOpen={true} title="Service Name Settings">
                <UnderlinedTextSettings
                  objectPath={`${objectPath}.textAndButton.text.name`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  responsiveSize
                />
            </SlidingPanel>
        )}
        {activePanel === "Service Details" && (
            <SlidingPanel onClose={closePanel} isOpen={true} title="Service Details Settings">
                <UnderlinedTextSettings
                  objectPath={`${objectPath}.textAndButton.text`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  responsiveSize
                />
            </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ServiceCardWithImageSettings