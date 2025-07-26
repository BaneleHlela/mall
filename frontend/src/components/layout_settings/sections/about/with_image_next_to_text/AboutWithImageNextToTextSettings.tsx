import { useState } from "react";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import BorderEditor from "../../../background/BorderEditor";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import UnderlinedTextSettings from "../../../extras/text/UnderlinedTextSettings";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import TextEditor from "../../../text/TextEditor";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";

interface AboutWithImageNextToSettingsProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const AboutWithImageNextToSettings: React.FC<AboutWithImageNextToSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "about";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className="space-y-1">
      
      {/* Background Settings */}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <div className="px-2 space-y-1">
            <BackgroundEditor
              objectPath={`${objectPath}.background`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["color", "width"]}
              widthUnit="%"
              responsiveSize
            />
          </div>
        }
      />
       {/* Image */}
       <FirstOrderSubSettingsContainer
            name="image"
            onClick={() => setActivePanel("image")}
        />
      {/* Text */}
      <FirstOrderSubSettingsContainer
          name="text"
          onClick={() => setActivePanel("text")}
      />
      <AnimatePresence>
        {activePanel === "text" && (
          <SlidingPanel 
            key="text"
            title="About Text Settings"
            onClose={closePanel}
            isOpen={true}
          >
            <div className="space-y-[.3vh]">
              <FirstOrderSubSettingsContainer
                name="title"
                onClick={() => setActivePanel("title")}
              />
              <FirstOrderSubSettingsContainer
                name="paragraph"
                onClick={() => setActivePanel("paragraph")}
              />
              <SubSettingsContainer
                  name="Title"
                  SettingsComponent={
                    <UnderlinedTextSettings
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      objectPath={`${objectPath}.text.title.style`}
                      allowInput
                    />
                  }
                  
              />
              <SubSettingsContainer
                  name="Paragraph"
                  SettingsComponent={
                  <TextEditor
                      objectPath={`${objectPath}.text.style`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["input", "fontFamily", "fontSize", "color", "weight", "fontStyle", "animation"]}
                      responsiveSize
                  />
                }
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === "title" && (
          <SlidingPanel 
            key="title"
            title="Title Text Settings"
            onClose={() => setActivePanel("text")}
            isOpen={true}
          >
            <UnderlinedTextSettings
              settings={settings}
              handleSettingChange={handleSettingChange}
              objectPath={`${objectPath}.text.title.style`}
              allowInput
              responsiveSize
            />
          </SlidingPanel>
        )}
        {activePanel === "paragraph" && (
          <SlidingPanel 
            key="paragraph"
            title="Paragraph Text Settings"
            onClose={() => setActivePanel("text")}
            isOpen={true}
          >
            <TextEditor
              objectPath={`${objectPath}.text.style`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["input", "fontFamily", "fontSize", "color", "weight", "fontStyle", "animation", "padding"]}
              responsivePadding
              responsiveSize
            />
          </SlidingPanel>
        )}
        {activePanel === "image" && (
          <SlidingPanel
            key="image"
            title="About Image Settings"
            onClose={closePanel}
            isOpen
          >
            <div className="px-2 space-y-1 py-1">
              <MultipleLayoutImagesHandler
                objectPath={`${objectPath}.image.imageUrl`}
                min={1}
                max={1}
                images={getSetting("image.imageUrl", settings, objectPath)}
              />
              <SubSettingsContainer
                name="Background"
                SettingsComponent={
                  <BackgroundEditor
                    objectPath={`${objectPath}.image.background`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["width", "height", "border"]}
                    responsiveSize
                    widthUnit="%"
                    heightUnit="vh"
                  />
              }
              />
            </div>
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutWithImageNextToSettings;
