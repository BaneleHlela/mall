import { useState } from "react";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import ColorPicker from "../../../supporting/ColorPicker";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import OptionsToggler from "../../../supporting/OptionsToggler";
import TextEditor from "../../../text/TextEditor";
import SlidingPanel from "../../../supporting/SlidingPanel";

interface HeroWithButtonBetweenImagesSettingsProps {
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
}

const HeroWithButtonBetweenImagesSettings: React.FC<HeroWithButtonBetweenImagesSettingsProps> = ({ settings, handleSettingChange }) => {
  const images = settings.hero.images.imageUrl  
  const objectPath = "hero";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);
    return (
        <div className="space-y-1">
            <h3 className="font-semibold text-lg">Hero With Button Between Images Settings</h3>
            <div className="border rounded-md shadow">
              <BackgroundEditor
                  objectPath={`${objectPath}.background`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["color", "width"]}
                  widthUnit="%"
                  heightUnit="vh"
                  responsiveSize
              />
            </div>
            <SubSettingsContainer
                name="Top Text"
                SettingsComponent={
                    <div
                      className="px-2 space-y-1"
                    >
                        <OptionsToggler
                            label="Display Top Text"
                            options={["true", "false"]}
                            value={getSetting("topDiv.display", settings, objectPath).toString()}
                            onChange={(value) => handleSettingChange(`${objectPath}.topDiv.display`, value === "true")}
                        />
                        <TextEditor
                                objectPath={`${objectPath}.topDiv.text.style`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "fontFamily", "fontSize", "color", "weight", "position"]}
                                responsiveSize={true}
                        />
                    </div>
                }
            />

            <SubSettingsContainer
                name="Images"
                SettingsComponent={
                    <>
                      <div className="px-2">
                        <OptionsToggler
                            label="Animation (img 1)"
                            options={["leftToRight", "rightToLeft"]}
                            value={getSetting("images.animation.image1", settings, objectPath)}
                            onChange={(value) => {
                                handleSettingChange(`${objectPath}.images.animation.image1`, value);
                            }}
                        />
                        <OptionsToggler
                            label="Animation (img 2)"
                            options={["leftToRight", "rightToLeft"]}
                            value={getSetting("images.animation.image2", settings, objectPath)}
                            onChange={(value) => {
                                handleSettingChange(`${objectPath}.images.animation.image2`, value);
                            }}
                        />
                      </div>
                      <MultipleLayoutImagesHandler
                        objectPath={`${objectPath}.images.imageUrl`}
                        min={2}
                        max={2} 
                        images={images}            
                      />
                    </>
                }
            />
            {/* Button - Refactored */}
            <FirstOrderSubSettingsContainer
              name="Middle Section"
              onClick={() => setActivePanel("middle_section")}
            />
            {activePanel === "middle_section" && (
              <SlidingPanel
                key="middle_div"
                onClose={closePanel}
                title="Middle SectionSettings"
                isOpen={true}
              >
                <div
                    className="px-2 space-y-1 py-1"
                  >
                      <OptionsToggler
                          label="Animation"
                          options={["leftToRight", "rightToLeft", "upToDown", "downToUp"]}
                          value={getSetting("midDiv.animation", settings, objectPath)}
                          onChange={(value) => handleSettingChange(`${objectPath}.midDiv.animation`, value)}
                      />
                      <SubSettingsContainer
                        name="Background"
                        SettingsComponent={
                          <div className="px-[.15vh] space-y-[.3vh]">
                            <BackgroundEditor
                              objectPath={`${objectPath}.midDiv.background`}
                              settings={settings}
                              handleSettingChange={handleSettingChange}
                              allow={["color", "height"]}
                              widthUnit="vw"
                              heightUnit="vh"
                              responsiveSize
                            />
                          </div>
                        }
                      />
                      
                      <SubSettingsContainer 
                        name="Text"
                        SettingsComponent={
                          <TextEditor
                            objectPath={`${objectPath}.midDiv.text.style`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["input", "fontFamily", "fontSize", "color", "weight", "textDecoration", "lineHeight"]}
                            responsiveSize={true}
                          />
                        }
                      />
                      <FirstOrderSubSettingsContainer
                        name="Button"
                        onClick={() => setActivePanel("button")}
                      />
                  </div>
              </SlidingPanel>
            )}
            {activePanel === "button" && (
              <SlidingPanel 
                isOpen={true}
                onClose={() => setActivePanel("middle_section")}
                title="Hero Button Settings"
                key="hero_button"
              >
                <StoreButtonSettings
                  objectPath={`${objectPath}.midDiv.button`}
                  settings={settings}
                  allowFunction
                  allowShow
                />
              </SlidingPanel>
            )}
        </div>
    );
};

export default HeroWithButtonBetweenImagesSettings;