import { useState } from "react";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import OptionsToggler from "../../../supporting/OptionsToggler";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import UnderlinedTextSettings from "../../../extras/text/UnderlinedTextSettings";
import SettingsSlider from "../../../supporting/SettingsSlider";
import BorderEditor from "../../../background/BorderEditor";

interface HeroWithBoxSettingsProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const HeroWithBoxSettings: React.FC<HeroWithBoxSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "sections.hero";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className="space-y-[.3vh]">
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
          <div className="px-2 space-y-[.3vh] py-1">
            <MultipleLayoutImagesHandler
              objectPath={`${objectPath}.image`}
              min={1}
              max={2}
              images={getSetting("image", settings, objectPath)}
            />
          </div>
        }
      />

      <FirstOrderSubSettingsContainer
        name="Box"
        onClick={() => setActivePanel("box")}
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
        {activePanel === "box" && (
          <SlidingPanel
            key="box"
            isOpen={true}
            onClose={closePanel}
            title="Box Settings"
          >
            {/* Position Settings */}
            <SettingsSlider
              label="Top (Mobile)"
              value={parseInt(getSetting("box.position.mobile.top", settings, objectPath) || "10")} 
              unit="%"
              min={0}
              max={100}
              onChange={(value) => 
                handleSettingChange(`${objectPath}.box.position.mobile.top`, `${value}%`)
              }
            />
            {/* Position Settings */}
            <SettingsSlider
              label="Left (Mobile)"
              value={parseInt(getSetting("box.position.mobile.left", settings, objectPath) || "10")} 
              unit="%"
              min={0}
              max={100}
              onChange={(value) => 
                handleSettingChange(`${objectPath}.box.position.mobile.left`, `${value}%`)
              }
            />
            <SettingsSlider
              label="Top (Desktop)"
              value={parseInt(getSetting("box.position.desktop.top", settings, objectPath) || "10")} 
              unit="%"
              min={0}
              max={100}
              onChange={(value) => 
                handleSettingChange(`${objectPath}.box.position.desktop.top`, `${value}%`)
              }
            />
            {/* Position Settings */}
            <SettingsSlider
              label="Left (Desktop)"
              value={parseInt(getSetting("box.position.desktop.left", settings, objectPath) || "10")} 
              unit="%"
              min={0}
              max={100}
              onChange={(value) => 
                handleSettingChange(`${objectPath}.box.position.desktop.left`, `${value}%`)
              }
            />
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                  <div className="px-2 space-y-2">
                    <BackgroundEditor
                      objectPath={`${objectPath}.box.background`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["height", "width", "padding","color", "border"]}
                      widthUnit="%"
                      heightUnit="%"
                      responsivePadding
                      responsiveSize={true}
                    />
                  </div>
                }
            />
            <SubSettingsContainer
                name="Mobile Border"
                SettingsComponent={
                  <div className="px-2 space-y-2">
                    <BorderEditor
                      objectPath={`${objectPath}.box.background.mobile`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                    />
                  </div>
                }
            />
          </SlidingPanel>
        )}
        {activePanel === "textLines" && (
          <SlidingPanel
            key="textLines"
            isOpen={true}
            onClose={closePanel}
            title="Text Lines"
          >
            <div className="px-2 space-y-[.3vh] py-1">
              {/* Individual Line Settings */}
              {["firstLine", "secondLine", "thirdLine"].map((lineKey) => (
                <FirstOrderSubSettingsContainer
                  key={lineKey}
                  name={lineKey.replace("Line", " Line")} // Formats: firstLine -> first Line
                  onClick={() => setActivePanel(lineKey)}
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
              allowShow
              allowPosition
              allowFunction
            />
          </SlidingPanel>
        )}
        {["firstLine", "secondLine", "thirdLine"].map((lineKey) => (
          activePanel === lineKey && (
            <SlidingPanel
              key={lineKey}
              isOpen={true}
              onClose={() => setActivePanel("textLines")}
              title={`Text Line: ${lineKey.replace("Line", " Line")}`}
            >
              <div className="px-2 space-y-2">
                <OptionsToggler
                  label="Show"
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

                <UnderlinedTextSettings
                  objectPath={`${objectPath}.text.${lineKey}`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allowInput
                  responsiveSize
                  allowWidth
                />
              </div>
            </SlidingPanel>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeroWithBoxSettings;
