import React, { useState } from 'react'
import FirstOrderSubSettingsContainer from '../../../../../FirstOrderSubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SubSettingsContainer from '../../../../../extras/SubSettingsContainer';
import SlidingPanel from '../../../../../supporting/SlidingPanel';
import TextEditor from '../../../../../text/TextEditor';
import BackgroundEditor from '../../../../../background/BackgroundEditor';

export interface SupportingSettingsProps {
    settings: any;
    handleSettingChange: (path: string, value: any) => void;
    objectPath: string;
}

const ServiceDetailsSettings: React.FC<SupportingSettingsProps> = ({
    settings,
    handleSettingChange,
    objectPath
}) => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    return (
      <div className='space-y-[.3vh]'>
        {/* Available slot */}
        <FirstOrderSubSettingsContainer
            name="Text"
            onClick={() => setActivePanel("text")}
        />
        {/* Select Buttons */}
        <FirstOrderSubSettingsContainer
          name="Select Buttons"
          onClick={() => setActivePanel("select_buttons")}
        />
        {/* Message Box */}
        <FirstOrderSubSettingsContainer
          name="Message Box"
          onClick={() => setActivePanel("message_box")}
        />
        {/* Message Box */}
        <FirstOrderSubSettingsContainer
          name="Book Button"
          onClick={() => setActivePanel("book_button")}
        />
        <AnimatePresence>
          {activePanel === "text" && (
            <SlidingPanel key="text" isOpen={true} onClose={closePanel} title="Text Settings">
              <div className='px-[.6vh] space-y-[.3vh] py-[.3vh]'>
                <TextEditor
                  objectPath={`${objectPath}.text`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["fontFamily", "color", "fontSize", "weight", "letterSpacing", "textDecoration", "fontStyle", "lineHeight"]} // Specify allowed properties
                />
              </div>
            </SlidingPanel>
          )}
          {activePanel === "select_buttons" && (
            <SlidingPanel key="select_buttons" isOpen={true} onClose={closePanel} title="Select Buttons Settings">
              <div className='px-[.6vh] space-y-[.3vh] py-[.3vh]'>
                <SubSettingsContainer
                  name="Text"
                  SettingsComponent={
                    <TextEditor
                      objectPath={`${objectPath}.buttons.text`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["fontFamily", "color", "fontSize", "weight", "letterSpacing", "textDecoration", "fontStyle", "lineHeight"]} // Specify allowed properties
                    />
                  }
                />
                <SubSettingsContainer
                  name="Background"
                  SettingsComponent={
                    <BackgroundEditor
                      objectPath={`${objectPath}.buttons.background`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["color", "shadow", "border", "padding"]} // Specify allowed properties	
                    />
                  }
                />
                <SubSettingsContainer
                  name="Dropdown"
                  SettingsComponent={
                    <BackgroundEditor
                      objectPath={`${objectPath}.buttons.background.dropdown`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                    />
                  }
                />
              </div>
            </SlidingPanel>
          )}
          {activePanel === "message_box" && (
            <SlidingPanel key="message_box" isOpen={true} onClose={closePanel} title="Message Box Settings">
              <div className='px-[.6vh] space-y-[.3vh] py-[.3vh]'>
                <SubSettingsContainer
                  name="Text"
                  SettingsComponent={
                    <TextEditor
                      objectPath={`${objectPath}.messageBox.text`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["fontFamily", "color", "fontSize", "weight", "letterSpacing", "textDecoration", "fontStyle", "lineHeight"]} // Specify allowed properties
                    />
                  }
                />
                <SubSettingsContainer
                  name="Text Area Background"
                  SettingsComponent={
                    <BackgroundEditor
                      objectPath={`${objectPath}.messageBox.textArea.background`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["color", "border", "height", "padding"]} 
                      heightUnit='vh'
                      responsiveSize

                    />
                  }
                />
              </div>
            </SlidingPanel>
          )}
          {activePanel === "book_button" && (
            <SlidingPanel key="book_button" isOpen={true} onClose={closePanel} title="Book Button Settings">
              <div className='px-[.6vh] space-y-[.3vh] py-[.3vh]'>
                <SubSettingsContainer
                  name="Text"
                  SettingsComponent={
                    <TextEditor
                      objectPath={`${objectPath}.bookButton.text`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["fontFamily", "color", "fontSize", "weight", "letterSpacing", "textDecoration", "fontStyle", "lineHeight"]} // Specify allowed properties
                    />
                  }
                />
                <SubSettingsContainer
                  name="Background"
                  SettingsComponent={
                    <BackgroundEditor
                      objectPath={`${objectPath}.bookButton.background`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["color", "shadow", "border", "padding", "width"]} 
                      widthUnit='%'	
                      responsiveSize
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

export default ServiceDetailsSettings