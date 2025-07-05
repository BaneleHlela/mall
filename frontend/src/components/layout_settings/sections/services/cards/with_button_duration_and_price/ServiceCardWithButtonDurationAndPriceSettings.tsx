import React, { useState } from 'react'
import type { SectionEditorProps } from '../../../SectionSettings'
import SubSettingsContainer from '../../../../extras/SubSettingsContainer'
import BackgroundEditor from '../../../../background/BackgroundEditor'
import FirstOrderSubSettingsContainer from '../../../../FirstOrderSubSettingsContainer'
import SlidingPanel from '../../../../supporting/SlidingPanel'
import TextEditor from '../../../../text/TextEditor'
import { AnimatePresence } from 'framer-motion'
import StoreButtonSettings from '../../../../extras/StoreButtonSettings'

const ServiceCardWithButtonDurationAndPriceSettings: React.FC<SectionEditorProps> = ({
  settings,
  handleSettingChange
}) => {
  const objectPath="services.serviceCard";
  const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
  return (
    <div className="space-y-1">
      {/* Background Settings */}
      <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <div className="px-2 space-y-1 pb-1">
                        <BackgroundEditor
                          objectPath={`${objectPath}.background`}
                          settings={settings}
                          handleSettingChange={handleSettingChange}
                          allow={["color", "border"]}
                          widthUnit="%"
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
            <div className="space-y-1">
              <SubSettingsContainer
                name="Service Name"
                SettingsComponent={
                  <TextEditor
                    objectPath={`${objectPath}.text.serviceName`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["position","fontFamily", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "lineHeight", "textDecoration"]}
                    responsiveSize
                  />
                }
              />
              <SubSettingsContainer
                name="Service Details"
                SettingsComponent={
                  <TextEditor
                    objectPath={`${objectPath}.text.serviceDetails`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["position", "lineHeight","fontFamily", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "lineHeight", "textDecoration"]}
                    responsiveSize
                  />
                }
              />
            </div>
          </SlidingPanel>
          
        )}
        {activePanel === "Button" && (
            <SlidingPanel onClose={closePanel} isOpen={true} title="Book Button Settings">
              <StoreButtonSettings settings={settings} objectPath={`${objectPath}.bookButton`}/>
            </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ServiceCardWithButtonDurationAndPriceSettings