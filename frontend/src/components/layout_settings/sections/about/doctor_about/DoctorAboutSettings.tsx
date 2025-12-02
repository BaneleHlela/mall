import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import TextEditor from "../../../text/TextEditor";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";

interface DoctorAboutSettingsProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const DoctorAboutSettings: React.FC<DoctorAboutSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "sections.about";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className="space-y-[.5vh]">
      {/* Background */}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <div className="px-[.15vh] space-y-[.3vh]">
            <BackgroundEditor
              objectPath={`${objectPath}.background`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["height", "color"]}
              widthUnit="vw"
              heightUnit="vh"
              responsiveSize
            />

            <MultipleLayoutImagesHandler
              objectPath={`${objectPath}.imageUrl`}
              min={1}
              max={2}
              images={getSetting("imageUrl", settings, objectPath)}
            />
          </div>
        }
      />

      {/* First Section (trigger only) */}
      <FirstOrderSubSettingsContainer
        name="First Section"
        onClick={() => setActivePanel("firstSection")}
      />

      {/* Second Section (trigger only) */}
      <FirstOrderSubSettingsContainer
        name="Second Section"
        onClick={() => setActivePanel("secondSection")}
      />

      {/* Button */}
      <FirstOrderSubSettingsContainer
        name="Button"
        onClick={() => setActivePanel("button")}
      />

      {/* Sliding Panels */}
      <AnimatePresence>
        {/* FIRST SECTION PANEL */}
        {activePanel === "firstSection" && (
          <SlidingPanel
            key="firstSection"
            isOpen={true}
            onClose={closePanel}
            title="First Section"
          >
            <div className="space-y-[.5vh]">
              <SubSettingsContainer
                name="Header"
                SettingsComponent={
                  <div className="px-[1vh] space-y-[.5vh] py-1">
                    <TextEditor
                      objectPath={`${objectPath}.text.firstSection.header`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={[
                        "input",
                        "color",
                        "weight",
                        "fontFamily",
                        "fontSize",
                        "lineHeight",
                        "letterSpacing",
                        "textDecoration",
                        "padding",
                      ]}
                      responsiveSize
                      responsivePadding
                    />
                  </div>
                }
              />

              <SubSettingsContainer
                name="Paragraph"
                SettingsComponent={
                  <div className="px-[1vh] space-y-[.5vh] py-1">
                    <TextEditor
                      objectPath={`${objectPath}.text.firstSection.paragraph`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={[
                        "input",
                        "color",
                        "weight",
                        "fontFamily",
                        "fontSize",
                        "lineHeight",
                        "letterSpacing",
                        "textDecoration",
                      ]}
                      responsiveSize
                      useTextarea
                    />
                  </div>
                }
              />
            </div>
          </SlidingPanel>
        )}

        {/* SECOND SECTION PANEL */}
        {activePanel === "secondSection" && (
          <SlidingPanel
            key="secondSection"
            isOpen={true}
            onClose={closePanel}
            title="Second Section"
          >
            <div className="space-y-[.5vh]">
              <SubSettingsContainer
                name="Header"
                SettingsComponent={
                  <div className="px-[1vh] space-y-[.5vh] py-1">
                    <TextEditor
                      objectPath={`${objectPath}.text.secondSection.header`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={[
                        "input",
                        "color",
                        "weight",
                        "fontFamily",
                        "fontSize",
                        "padding",
                      ]}
                      responsiveSize
                      responsivePadding
                    />
                  </div>
                }
              />

              <SubSettingsContainer
                name="Details"
                SettingsComponent={
                  <div className="px-[1vh] space-y-[.5vh] py-1">
                    <TextEditor
                      objectPath={`${objectPath}.text.secondSection.details`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={[
                        "input",
                        "color",
                        "weight",
                        "fontFamily",
                        "fontSize",
                        "lineHeight",
                        "letterSpacing",
                      ]}
                      responsiveSize
                      useTextarea
                    />
                  </div>
                }
              />
            </div>
          </SlidingPanel>
        )}

        {/* BUTTON PANEL */}
        {activePanel === "button" && (
          <SlidingPanel
            key="button"
            isOpen={true}
            onClose={closePanel}
            title="Button"
          >
            <div className="space-y-[.5vh]">
              <SubSettingsContainer
                name="Button Text"
                SettingsComponent={
                  <div className="px-[1vh] space-y-[.5vh] py-1">
                    <TextEditor
                      objectPath={`${objectPath}.button.text`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["input"]}
                    />
                  </div>
                }
              />

              <SubSettingsContainer
                name="Button Background"
                SettingsComponent={
                  <div className="px-[.15vh] space-y-[.3vh]">
                    <BackgroundEditor
                      objectPath={`${objectPath}.button.background`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["width", "padding", "border"]}
                      widthUnit="vh"
                      heightUnit="vh"
                      responsiveSize
                    />
                  </div>
                }
              />

              <SubSettingsContainer
                name="Button Function"
                SettingsComponent={
                  <div className="px-[.5vh] py-1">
                    <StoreButtonSettings
                      objectPath={`${objectPath}.button`}
                      settings={settings}
                      allowFunction
                    />
                  </div>
                }
              />
            </div>
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorAboutSettings;
