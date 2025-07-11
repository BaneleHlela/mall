import { useState } from "react";
import { getSetting } from "../../../../utils/helperFunctions";
import BackgroundEditor from "../../background/BackgroundEditor";
import BorderEditor from "../../background/BorderEditor";
import SubSettingsContainer from "../../extras/SubSettingsContainer";
import OptionsToggler from "../../supporting/OptionsToggler";
import TextEditor from "../../text/TextEditor";
import FirstOrderSubSettingsContainer from "../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";

interface EmailFormSettingsProps {
  settings: any;
  handleSettingChange: (path: string, value: any) => void;
  objectPath: string;
}

const ElegantSendEmailFormSettings: React.FC<EmailFormSettingsProps> = ({
  settings,
  handleSettingChange,
  objectPath
}) => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className="space-y-1">
      {/* FirstOrderSubSettings for Form Background */}
      <FirstOrderSubSettingsContainer
        name="Form Background"
        onClick={() => setActivePanel("formBackground")}
      />

      {/* FirstOrderSubSettings for Submit Button */}
      <FirstOrderSubSettingsContainer
        name="Submit Button"
        onClick={() => setActivePanel("submitButton")}
      />
      
      {/* Sender Info Border */}
      <SubSettingsContainer
        name="Sender Info Border"
        SettingsComponent={
          <BorderEditor
            objectPath={`${objectPath}.background.senderInfo.border`}
            settings={settings}
            handleSettingChange={handleSettingChange}
          />
        }
      />

      {/* Title Text */}
      <SubSettingsContainer
        name="Title Text"
        SettingsComponent={
          <div>
            <div className="px-2">
              <OptionsToggler
                label="Show Title"
                options={["true", "false"]}
                value={getSetting("text.title.show", settings, objectPath) ? "true" : "false"}
                onChange={(value) =>
                  handleSettingChange(`${objectPath}.text.title.show`, value === "true")
                }
              />
            </div>
            {getSetting("text.title.show", settings, objectPath) && (
              <TextEditor
                objectPath={`${objectPath}.text.title`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={[
                  "input",
                  "position",
                  "color",
                  "fontFamily",
                  "fontSize",
                  "fontWeight",
                  "fontStyle"
                ]}
                responsiveSize
              />
            )}
          </div>
        }
      />

      {/* Sender Info Text */}
      <SubSettingsContainer
        name="Sender Info Text"
        SettingsComponent={
          <TextEditor
            objectPath={`${objectPath}.text.senderInfo`}
            settings={settings}
            handleSettingChange={handleSettingChange}
            allow={["position", "color", "fontFamily", "fontSize"]}
          />
        }
      />

      {/* Sliding Panels */}
      <AnimatePresence>
        {activePanel === "formBackground" && (
          <SlidingPanel
            key="formBackground"
            isOpen={true}
            onClose={closePanel}
            title="Form Background"
          >
            <div className="px-2 py-2">
              <BackgroundEditor
                objectPath={`${objectPath}.background`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["color", "shadow", "border", "padding", "width", "height"]}
                responsiveSize
                widthUnit="%"
                heightUnit="vh"
              />
            </div>
          </SlidingPanel>
        )}

        {activePanel === "submitButton" && (
          <SlidingPanel
            key="submitButton"
            isOpen={true}
            onClose={closePanel}
            title="Submit Button"
          >
            <div className="px-2 py-2 space-y-2">
              <TextEditor
                objectPath={`${objectPath}.submitButton.text`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={[
                  "input",
                  "color",
                  "fontFamily",
                  "fontSize",
                  "weight",
                  "letterSpacing",
                  "lineHeight",
                  "textDecoration"
                ]}
              />
              <BackgroundEditor
                objectPath={`${objectPath}.submitButton.background`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["color", "shadow", "border", "padding", "width"]}
                responsiveSize={false}
                widthUnit="%"
              />
            </div>
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElegantSendEmailFormSettings;
