import React, { useState } from 'react'
import { getSetting } from '../../../../../utils/helperFunctions';
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import MultipleLayoutImagesHandler from '../../../supporting/MultipleLayoutImagesHandler';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../../supporting/SlidingPanel';
import TextEditor from '../../../text/TextEditor';
import { AnimatePresence } from 'framer-motion';
import StoreOverallReviewsCardSettings from '../../../extras/cards/StoreOverallReviewsCardSettings';
import SendEmailFormSettings from '../../../forms/SendEmailFormSettings';
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings';

interface HeroSettingsProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}
const HeroWithReviewCardAndEmailFormSettings: React.FC<HeroSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = 'sections.hero'
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);
  
  return (
    <div className='space-y-1'>
      {/* Background Settings */}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <div className="px-2 space-y-2">
            <BackgroundEditor
              objectPath={`${objectPath}.background`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["opacity", "height", "color"]}
              widthUnit="vw"
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
          <div className="px-2 space-y-1 py-1">
            <MultipleLayoutImagesHandler
              objectPath={`${objectPath}.background.image`}
              min={1}
              max={2}
              images={getSetting("background.image", settings, objectPath)}
            />
          </div>
        }
      />
      {/* Text Lines - Refactored */}
      <FirstOrderSubSettingsContainer
        name="Text"
        onClick={() => setActivePanel("text")}
      />
      <FirstOrderSubSettingsContainer
        name="Reviews Card"
        onClick={() => setActivePanel("reviews")}
      />
      <FirstOrderSubSettingsContainer
        name="Form"
        onClick={() => setActivePanel("Form")}
      />
      <AnimatePresence>
        {activePanel === "text" && (
            <SlidingPanel
              key="button"
              isOpen={true}
              onClose={closePanel}
              title="Hero Button"
            >
              <div className="space-y-1">
                {/* Text Width Settings */}
                <div className="border rounded">
                  <BackgroundEditor
                    objectPath={`${objectPath}.text`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["width"]}
                    widthUnit="%"
                    responsiveSize={true}
                  />
                </div>
                {/* Headin */}
                <FirstOrderSubSettingsContainer
                    name="Heading"
                    onClick={() => setActivePanel("heading")}
                />
                {/* Text */}
                <FirstOrderSubSettingsContainer
                    name="Subheading"
                    onClick={() => setActivePanel("subheading")}
                />
              </div>
            </SlidingPanel>
          )}
          {activePanel === "heading" && (
              <SlidingPanel key="heading" isOpen={true} onClose={() => setActivePanel("text")} title="Heading Settings">
                  <div className="space-y-[.3vh]">
                      <UnderlinedTextSettings
                          settings={settings}
                          handleSettingChange={handleSettingChange}
                          objectPath={`${objectPath}.text.heading`}
                          allowInput
                          responsiveSize
                      />
                  </div>
              </SlidingPanel>
          )}
          {activePanel === "subheading" && (
              <SlidingPanel key="subheading" isOpen={true} onClose={() => setActivePanel("text")} title="subheading Settings">
                  <div className="space-y-[.3vh]">
                      <UnderlinedTextSettings
                          settings={settings}
                          handleSettingChange={handleSettingChange}
                          objectPath={`${objectPath}.text.subheading`}
                          allowInput
                          responsiveSize
                      />
                  </div>
              </SlidingPanel>
          )}
          {activePanel === "reviews" && (
            <SlidingPanel
              key="reviews"
              isOpen={true}
              onClose={closePanel}
              title="Reviews Card"
            >
              <StoreOverallReviewsCardSettings
                objectPath={objectPath}
                settings={settings}
                handleSettingChange={handleSettingChange}
              />
            </SlidingPanel>
          )}
          {activePanel === "Form" && (
            <SlidingPanel
              key="Form"
              isOpen={true}
              onClose={closePanel}
              title="Contact Form Settings"
            >
              <SendEmailFormSettings 
                settings={settings}
                handleSettingChange={handleSettingChange}
                objectPath={`${objectPath}.sendEmailForm`}
                variation={getSetting(
                  `variation`, 
                  settings,
                  `${objectPath}.sendEmailForm.`
                )}
              />
            </SlidingPanel>
          )}
        </AnimatePresence>
    </div>
  )
}

export default HeroWithReviewCardAndEmailFormSettings