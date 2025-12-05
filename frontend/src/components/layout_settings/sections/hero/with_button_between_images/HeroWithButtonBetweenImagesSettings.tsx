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
import { AnimatePresence } from "framer-motion";

interface HeroWithButtonBetweenImagesSettingsProps {
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
}

const HeroWithButtonBetweenImagesSettings: React.FC<HeroWithButtonBetweenImagesSettingsProps> = ({ settings, handleSettingChange }) => {
  const images = settings.sections.hero.images.imageUrl;  
  const objectPath = "sections.hero";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);
    return (
        <div className="space-y-1">
            <h3 className="font-semibold text-lg">Hero Settings</h3>
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
            

            
            {/* Top Div */}
            <FirstOrderSubSettingsContainer
              name="Top Part"
              onClick={() => setActivePanel("top_part")}
            />
            {/* Top Div */}
            <FirstOrderSubSettingsContainer
              name="bottom Part"
              onClick={() => setActivePanel("bottom_part")}
            />
            
            <AnimatePresence>
              {activePanel === "top_part" && (
                <SlidingPanel
                  key="top_part"
                  onClose={closePanel}
                  title="Top Part Settings"
                  isOpen={true}
                >
                  <div
                    className="px- space-y-[.35vh] py-1"
                  >
                    <OptionsToggler
                        label="Display Top Part"
                        options={["yes", "no"]}
                        value={getSetting("topDiv.display", settings, objectPath).toString()}
                        onChange={(value) => handleSettingChange(`${objectPath}.topDiv.display`, value === "yes")}
                    />
                    <SubSettingsContainer
                      name="Background"
                      SettingsComponent={
                        <div className="px-[.15vh] space-y-[.3vh]">
                          <BackgroundEditor
                            objectPath={`${objectPath}.topDiv.background`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["color", "height"]}
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
                          objectPath={`${objectPath}.topDiv.text.style`}
                          settings={settings}
                          handleSettingChange={handleSettingChange}
                          allow={["input", "fontFamily", "fontSize", "color", "weight", "textDecoration", "lineHeight"]}
                          responsiveSize={true}
                        />
                      }
                    />
                  </div>
                </SlidingPanel>
              )}
              {activePanel === "bottom_part" && (
                <SlidingPanel
                  key="bottom_part"
                  onClose={closePanel}
                  title="Bottom Part Settings"
                  isOpen={true}
                >
                  <>
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
                      {/* Middle Section*/}
                      <FirstOrderSubSettingsContainer
                        name="Middle Section"
                        onClick={() => setActivePanel("middle_section")}
                      />
                  </>
                </SlidingPanel>
              )}
              {activePanel === "middle_section" && (
                <SlidingPanel
                  key="middle_div"
                  onClose={() => setActivePanel("bottom_part")}
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
                                heightUnit="%"
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
                  />
                </SlidingPanel>
              )}
            </AnimatePresence>
        </div>
    );
};

export default HeroWithButtonBetweenImagesSettings;