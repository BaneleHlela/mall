import { useState } from "react";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import TextEditor from "../../../text/TextEditor";
import OptionsToggler from "../../../supporting/OptionsToggler";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";

interface HeroWithButtonImageAndTextSettingsProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const HeroWithButtonImageAndTextSettings: React.FC<HeroWithButtonImageAndTextSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "hero";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className="space-y-1">
      {/* Background Settings */}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <div className="px-[.15vh] space-y-[.3vh]">
            <BackgroundEditor
              objectPath={`${objectPath}.background`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["opacity", "height"]}
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
              objectPath={`${objectPath}.image`}
              min={1}
              max={1}
              images={getSetting("image", settings, objectPath)}
            />
          </div>
        }
      />

      {/* Text Lines - Refactored */}
      <FirstOrderSubSettingsContainer
        name="Text Lines"
        onClick={() => setActivePanel("textLines")}
      />

      {/* Button - Refactored */}
      <FirstOrderSubSettingsContainer
        name="Button"
        onClick={() => setActivePanel("button")}
      />

      {/* Sliding Panels */}
      <AnimatePresence>
        {activePanel === "textLines" && (
          <SlidingPanel
            key="textLines"
            isOpen={true}
            onClose={closePanel}
            title="Text Lines"
          >
            <div className="px-2 space-y-1 py-1">
              {/* Text Width Settings */}
              <SubSettingsContainer
                name="Text Width"
                SettingsComponent={
                  <div className="px-2 space-y-2">
                    <BackgroundEditor
                      objectPath={`${objectPath}.text`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["width"]}
                      widthUnit="vw"
                      responsiveSize={true}
                    />
                  </div>
                }
              />

              {/* Individual Line Settings */}
              {["firstLine", "secondLine", "thirdLine"].map((lineKey) => (
                <SubSettingsContainer
                  key={lineKey}
                  name={lineKey}
                  SettingsComponent={
                    <>
                      <div className="px-2">
                        <OptionsToggler
                          label={`Show`}
                          options={["true", "false"]}
                          value={
                            getSetting(`text.${lineKey}.show`, settings, objectPath)
                              ? "true"
                              : "false"
                          }
                          onChange={(value) =>
                            handleSettingChange(
                              `${objectPath}.text.${lineKey}.show`,
                              value === "true"
                            )
                          }
                        />
                      </div>
                      <TextEditor
                        objectPath={`${objectPath}.text.${lineKey}`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={[ "color", "input", "fontFamily", "fontSize", "weight", "lineHeight", "animation", "letterSpacing" ]}
                        responsiveSize
                      />
                    </>
                  }
                />
              ))}
            </div>
          </SlidingPanel>
        )}

        {activePanel === "button" && (
          <SlidingPanel
            key="button"
            isOpen={true}
            onClose={closePanel}
            title="Hero Button"
          >
            <StoreButtonSettings
              objectPath={`${objectPath}.button`}
              settings={settings}
            />
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroWithButtonImageAndTextSettings;
