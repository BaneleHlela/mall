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

const ServiceCardWithImageSettings: React.FC<SectionEditorProps> = ({
  settings,
  handleSettingChange
}) => {
  const objectPath="services.card";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className="space-y-1">
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
                <div className="px-2 space-y-1 pb-1">
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
        {/* Image Settings */}
        <SubSettingsContainer
            name="Image"
            SettingsComponent={
                <div className="px-2 space-y-2">
                    <MultipleLayoutImagesHandler
                        objectPath={`${objectPath}.image.url`}
                        min={1}
                        max={1}
                        images={getSetting("image.url", settings, objectPath)}
                    />
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
            <div className="space-y-1 ">
                <div className="border rounded px-2">
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
              <SubSettingsContainer
                name="Service Details"
                SettingsComponent={
                  <TextEditor
                    objectPath={`${objectPath}.textAndButton.text`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["position","fontFamily", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "lineHeight", "textDecoration"]}
                    responsiveSize
                  />
                }
              />
              <SubSettingsContainer
                name="Service Name"
                SettingsComponent={
                  <TextEditor
                    objectPath={`${objectPath}.textAndButton.text.name`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["color", "fontSize", "weight", "fontStyle", "letterSpacing", "textTransform", "lineHeight"]}
                    responsiveSize
                  />
                }
              />
            </div>
          </SlidingPanel>
          
        )}
        {activePanel === "Button" && (
            <SlidingPanel onClose={closePanel} isOpen={true} title="Book Button Settings">
              <StoreButtonSettings settings={settings} objectPath={`${objectPath}.textAndButton.button`}/>
            </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ServiceCardWithImageSettings