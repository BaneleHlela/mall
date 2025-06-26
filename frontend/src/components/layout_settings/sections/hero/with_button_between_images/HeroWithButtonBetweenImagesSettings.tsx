import { getSetting } from "../../../../../utils/helperFunctions";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import ColorPicker from "../../../supporting/ColorPicker";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import OptionsToggler from "../../../supporting/OptionsToggler";
import TextEditor from "../../../text/TextEditor";

interface HeroWithButtonBetweenImagesSettingsProps {
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
}

const HeroWithButtonBetweenImagesSettings: React.FC<HeroWithButtonBetweenImagesSettingsProps> = ({ settings, handleSettingChange }) => {
  const images = settings.hero.images.imageUrl  
  const objectPath = "hero";

    return (
        <div className="space-y-1">
            <h3 className="font-semibold text-lg">Hero With Button Between Images Settings</h3>

            <ColorPicker
                label="Background Color"
                value={getSetting("background.color", settings, objectPath)}
                onChange={(value) => handleSettingChange(`${objectPath}.background.color`, value)}
            />

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
                                allow={["input", "fontFamily", "fontSize", "color", "weight"]}
                                responsiveSize={true}
                        />
                    </div>
                }
            />

            <SubSettingsContainer
                name="Images"
                SettingsComponent={
                    <>
                        <MultipleLayoutImagesHandler
                          objectPath={`${objectPath}.images.imageUrl`}
                          min={2}
                          max={2} images={images}            
                        />
                    </>
                }
            />
            <SubSettingsContainer
                name="Middle Section"
                SettingsComponent={
                    <div
                      className="px-2 space-y-1"
                    >
                        <ColorPicker
                            label="Background Color"
                            value={getSetting("midDiv.backgroundColor", settings, objectPath)}
                            onChange={(value) => handleSettingChange(`${objectPath}.midDiv.backgroundColor`, value)}
                        />
                        <OptionsToggler
                            label="Animation"
                            options={["leftToRight", "rightToLeft", "upToDown", "downToUp"]}
                            value={getSetting("midDiv.animation", settings, objectPath)}
                            onChange={(value) => handleSettingChange(`${objectPath}.midDiv.animation`, value)}
                        />
                        <SubSettingsContainer 
                          name="Text"
                          SettingsComponent={
                            <TextEditor
                              objectPath={`${objectPath}.midDiv.text`}
                              settings={settings}
                              handleSettingChange={handleSettingChange}
                              allow={["input", "fontFamily", "fontSize", "color", "fontWeight"]}
                              responsiveSize={true}
                            />
                          }
                        />
                        <SubSettingsContainer 
                          name="Text"
                          SettingsComponent={
                            <StoreButtonSettings
                                objectPath={`${objectPath}.midDiv.button`}
                                settings={settings}
                            />
                          }
                        />   
                    </div>
                }
            />
        </div>
    );
};

export default HeroWithButtonBetweenImagesSettings;