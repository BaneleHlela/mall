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

const ProductCardSettings: React.FC<SectionEditorProps> = ({
  settings,
  handleSettingChange
}) => {
  const objectPath="products.card";
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
                <div className="px-[.6vh] space-y-2">
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
          name="Add to Cart Button"
          onClick={() => setActivePanel("Button")}
      />
      <FirstOrderSubSettingsContainer
          name="Marking Button"
          onClick={() => setActivePanel("marking_button")}
      />
      <AnimatePresence>
        {activePanel === "Text" && (
          <SlidingPanel onClose={closePanel} isOpen={true} title="Card Text Settings">
            <div className="space-y-[.3vh] ">
                <SubSettingsContainer
                  name="Product Name"
                  SettingsComponent={
                    <UnderlinedTextSettings
                      objectPath={`${objectPath}.textAndButton.text.name`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      responsiveSize
                    />
                  }
                />
                <SubSettingsContainer
                  name="Product Price"
                  SettingsComponent={
                    <UnderlinedTextSettings
                      objectPath={`${objectPath}.textAndButton.text`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      responsiveSize
                    />
                  }
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
              />
            </SlidingPanel>
        )}
        {activePanel === "marking_button" && (
            <SlidingPanel onClose={closePanel} isOpen={true} title="Marking Button Settings">
              <div className="space-y-[.3vh]">
                  <SubSettingsContainer
                    name={"Text"}
                    SettingsComponent={
                      <TextEditor
                        objectPath={`${objectPath}.markingButton.text`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["color", "fontSize", "fontFamily", "weight", "fontStyle", "textTransform"]}
                      />
                    }
                  />
                  <SubSettingsContainer
                    name="Background"
                    SettingsComponent={
                      <BackgroundEditor
                        objectPath={`${objectPath}.markingButton.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["color", "padding", "border"]}
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

export default ProductCardSettings