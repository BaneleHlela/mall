import React, { useState } from 'react'
import type { SectionEditorProps } from '../../SectionSettings';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import { getSetting } from '../../../../../utils/helperFunctions';
import BackgroundEditor from '../../../background/BackgroundEditor';
import MultipleLayoutImagesHandler from '../../../supporting/MultipleLayoutImagesHandler';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../../supporting/SlidingPanel';
import TextEditor from '../../../text/TextEditor';
import IconsSettingsHandler from '../../../menubar/popular/supporting/IconsSettingsHandler';
import IconsOrButtonSettings from '../../../menubar/popular/supporting/IconsOrButtonSettings';
import SendEmailFormSettings from '../../../forms/SendEmailFormSettings';
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings';

const ContactWithBackgroundImageTextAndSocialsSettings: React.FC<SectionEditorProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "contact";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className='space-y-1'>
      <SubSettingsContainer 
        name="Background"
        SettingsComponent={
          <div>
            <MultipleLayoutImagesHandler
              objectPath={`${objectPath}.background.image`}
              min={1}
              max={1}
              images={getSetting("background.image", settings, objectPath)}
            />
            <BackgroundEditor
              objectPath={`${objectPath}.background`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["opacity", "color"]}
            />
          </div>
        }
      />
      <SubSettingsContainer 
        name="Container Background"
        SettingsComponent={
          <div>
            <BackgroundEditor
              objectPath={`${objectPath}.containerBackground`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["width", "color"]}
              responsiveSize
              widthUnit='%'
            />
          </div>
        }
      />
      <FirstOrderSubSettingsContainer
        name="Text"
        onClick={() => setActivePanel("Text")}
      />
      <FirstOrderSubSettingsContainer
        name="Socials"
        onClick={() => setActivePanel("Socials")}
      />
      <FirstOrderSubSettingsContainer
        name="Form"
        onClick={() => setActivePanel("Form")}
      />
      {activePanel === "Text" && (
        <SlidingPanel
          key="Text"
          isOpen={true}
          onClose={closePanel}
          title="Contact Text Settings"
        >
          <div className="space-y-1">
            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Heading"
                onClick={() => setActivePanel("heading")}
            />
            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Subheading"
                onClick={() => setActivePanel("subheading")}
            />
            <SubSettingsContainer
              name="Paragraph"
              SettingsComponent={
                <TextEditor
                  objectPath={`${objectPath}.text.paragraph`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={[ "color", "textArea", "position", "fontFamily", "fontSize", "weight", "lineHeight", "animation", "letterSpacing" ]}
                />
              }
            />
          </div>
        </SlidingPanel>
      )}
      {activePanel === "heading" && (
          <SlidingPanel key="heading" isOpen={true} onClose={() => setActivePanel("Text")} title="Heading Settings">
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
          <SlidingPanel key="subheading" isOpen={true} onClose={() => setActivePanel("Text")} title="subheading Settings">
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
      {activePanel === "Socials" && (
        <SlidingPanel
          key="Socials"
          isOpen={true}
          onClose={closePanel}
          title="Contact Socials Settings"
        >
          {/* <IconsOrButtonSettings
            objectPath={`${objectPath}`}
            handleSettingChange={handleSettingChange}
            settings={settings}
            allow="icons"
          /> */}
          <IconsSettingsHandler 
            settings={settings}
            handleSettingChange={handleSettingChange}
            objectPath={`${objectPath}.icons`}
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
            variation={settings.contact.sendEmailForm.variation} 
          />
        </SlidingPanel>
      )}
    </div>
  )
}

export default ContactWithBackgroundImageTextAndSocialsSettings