import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { getSetting } from "../../../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../../../background/BackgroundEditor";
import StoreButtonSettings from "../../../../../extras/StoreButtonSettings";
import SubSettingsContainer from "../../../../../extras/SubSettingsContainer";
import UnderlinedTextSettings from "../../../../../extras/text/UnderlinedTextSettings";
import FirstOrderSubSettingsContainer from "../../../../../FirstOrderSubSettingsContainer";
import OptionsToggler from "../../../../../supporting/OptionsToggler";
import SlidingPanel from "../../../../../supporting/SlidingPanel";
import TextEditor from "../../../../../text/TextEditor";
import type { SectionEditorProps } from "../../../../SectionSettings";

const PopularPackageCardSettings: React.FC<SectionEditorProps> = ({
  settings,
  handleSettingChange
}) => {
  const objectPath="sections.packages.card";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className="space-y-[.3vh]">
        {/* Background Settings */}
        <SubSettingsContainer
            name="Background"
            SettingsComponent={
                <div className="px-[.6vh] space-y-[.3vh] pb-[.3vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["color", "border", "shadow"]}
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
      <FirstOrderSubSettingsContainer
          name="Border"
          onClick={() => setActivePanel("Border")}
      />
      <AnimatePresence>
        {activePanel === "Text" && (
          <SlidingPanel onClose={closePanel} isOpen={true} title="Card Text Settings">
            <div className="space-y-[.3vh]">
                <FirstOrderSubSettingsContainer
                    name="Package Name"
                    onClick={() => setActivePanel("name")}
                />
                <FirstOrderSubSettingsContainer
                    name="Package Price"
                    onClick={() => setActivePanel("price")}
                />
                <FirstOrderSubSettingsContainer
                    name="Package Details"
                    onClick={() => setActivePanel("details")}
                />
            </div>
          </SlidingPanel>
        )}
        {activePanel === "name" && (
          <SlidingPanel onClose={() => setActivePanel("Text")} isOpen={true} title="Package Name Settings">
              <UnderlinedTextSettings
                objectPath={`${objectPath}.text.name`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                responsiveSize
              />
          </SlidingPanel>
        )}
        {activePanel === "price" && (
          <SlidingPanel onClose={() => setActivePanel("Text")} isOpen={true} title="Package Price Settings">
              <UnderlinedTextSettings
                objectPath={`${objectPath}.text.price`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                responsiveSize
              />
          </SlidingPanel>
        )}
        {activePanel === "details" && (
          <SlidingPanel onClose={() => setActivePanel("Text")} isOpen={true} title="Package Details Settings">
              <UnderlinedTextSettings
                objectPath={`${objectPath}.text.details`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                responsiveSize
              />
          </SlidingPanel>
        )}
        {activePanel === "Button" && (
            <SlidingPanel onClose={closePanel} isOpen={true} title="Button Settings">
              {/* <div className="space-y-[.3vh]">
                  <SubSettingsContainer
                    name="Show Button"
                    SettingsComponent={
                        <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                            <OptionsToggler
                                label="Show"
                                options={["Yes", "No"]}
                                value={getSetting("button.show", settings, objectPath) ? "Yes" : "No"}
                                onChange={(newValue) =>
                                    handleSettingChange(`${objectPath}.button.show`, newValue === "Yes")
                                }
                            />
                        </div>
                    }
                  />
                  <SubSettingsContainer
                    name="Button Style"
                    SettingsComponent={
                        <div className="px-[.6vh] space-y-[.3vh] pb-[.3vh]">
                            <TextEditor
                                objectPath={`${objectPath}.button.style.text`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "fontFamily", "color", "fontSize", "weight", "letterSpacing"]}
                            />
                            <StoreButtonSettings
                                settings={settings}
                                objectPath={`${objectPath}.button.style.background`}
                                allowPosition
                                allowShow={false}
                            />
                        </div>
                    }
                  />
                  <SubSettingsContainer
                    name="Position"
                    SettingsComponent={
                        <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                            <OptionsToggler
                                label="Position"
                                options={["left", "center", "right"]}
                                value={getSetting("button.position", settings, objectPath)}
                                onChange={(newValue) => handleSettingChange(`${objectPath}.button.position`, newValue)}
                            />
                        </div>
                    }
                  />
              </div> */}
              <StoreButtonSettings
                settings={settings}
                objectPath={`${objectPath}.button.style`}
            />
            </SlidingPanel>
        )}
        {activePanel === "Border" && (
            <SlidingPanel onClose={closePanel} isOpen={true} title="Border Settings">
              <div className="space-y-[.3vh]">
                  <SubSettingsContainer
                    name="Show Border"
                    SettingsComponent={
                        <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                            <OptionsToggler
                                label="Show"
                                options={["Yes", "No"]}
                                value={getSetting("border.show", settings, objectPath) === "true" ? "Yes" : "No"}
                                onChange={(newValue) =>
                                    handleSettingChange(`${objectPath}.border.show`, newValue === "Yes" ? "true" : "false")
                                }
                            />
                        </div>
                    }
                  />
                  {getSetting("border.show", settings, objectPath) === "true" && (
                      <SubSettingsContainer
                        name="Border Color"
                        SettingsComponent={
                            <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                <OptionsToggler
                                    label="Color"
                                    options={["primary", "secondary", "accent", "quad", "pent"]}
                                    value={getSetting("border.color", settings, objectPath)}
                                    onChange={(newValue) => handleSettingChange(`${objectPath}.border.color`, newValue)}
                                />
                            </div>
                        }
                      />
                  )}
              </div>
            </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PopularPackageCardSettings
