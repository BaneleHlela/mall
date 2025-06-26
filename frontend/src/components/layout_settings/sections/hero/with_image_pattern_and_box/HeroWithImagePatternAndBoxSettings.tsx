import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import BorderEditor from "../../../background/BorderEditor";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import ColorPicker from "../../../supporting/ColorPicker";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import OptionsToggler from "../../../supporting/OptionsToggler";
import TextEditor from "../../../text/TextEditor";

interface HeroWithImagePatternAndBoxSettingsProps {
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
}

const HeroWithImagePatternAndBoxSettings: React.FC<HeroWithImagePatternAndBoxSettingsProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = "hero";

    return (
        <div className="space-y-1">
            <h3 className="font-semibold text-lg">Hero With Image, Button, and Box Settings</h3>

            {/* Background */}
            <div className="border rounded-md shadow">
                <BackgroundEditor
                    objectPath={`${objectPath}.background.ColorA`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["color"]}
                />
                <BackgroundEditor
                    objectPath={`${objectPath}.background.colorB`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["color"]}
                />
            </div>

            {/* Image Settings */}
            <SubSettingsContainer
                name="Image"
                SettingsComponent={
                    <div className="px-2 space-y-2">
                        <OptionsToggler
                            label="Image Animation"
                            options={["leftToRight", "rightToLeft"]}
                            value={getSetting("image.animation", settings, objectPath)}
                            onChange={(value) => handleSettingChange(`${objectPath}.image.animation`, value)}
                        />
                        <MultipleLayoutImagesHandler
                            objectPath={`${objectPath}.image.url`}
                            min={1}
                            max={1}
                            images={getSetting("image.url", settings, objectPath)}
                        />
                        <BorderEditor
                            objectPath={`${objectPath}.image.border`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                        />
                    </div>
                }
            />

            {/* Pattern Settings */}
            <SubSettingsContainer
                name="Pattern"
                SettingsComponent={
                    <div className="px-2 space-y-2">
                        <OptionsToggler
                            label="Show Pattern"
                            options={["true", "false"]}
                            value={getSetting("pattern.show", settings, objectPath).toString()}
                            onChange={(value) =>
                                handleSettingChange(`${objectPath}.pattern.show`, value === "true")
                            }
                        />
                        <OptionsToggler
                            label="Pattern Animation"
                            options={["upToDown", "downToUp"]}
                            value={getSetting("pattern.animation", settings, objectPath)}
                            onChange={(value) =>
                                handleSettingChange(`${objectPath}.pattern.animation`, value)
                            }
                        />
                        <MultipleLayoutImagesHandler
                            objectPath={`${objectPath}.pattern.url`}
                            min={1}
                            max={1}
                            images={getSetting("pattern.url", settings, objectPath)}
                        />
                    </div>
                }
            />

            {/* Text Box Settings */}
            <SubSettingsContainer
                name="Text Box"
                SettingsComponent={
                    <div className="px-2 space-y-2">
                        <ColorPicker
                            label="Background Color"
                            value={getSetting("textBox.backgroundColor", settings, objectPath)}
                            onChange={(value) =>
                                handleSettingChange(`${objectPath}.textBox.backgroundColor`, value)
                            }
                        />
                        <OptionsToggler
                            label="Text Box Animation"
                            options={["upToDown", "downToUp", "leftToRight", "rightToLeft"]}
                            value={getSetting("textBox.animation", settings, objectPath)}
                            onChange={(value) =>
                                handleSettingChange(`${objectPath}.textBox.animation`, value)
                            }
                        />
                        <TextEditor
                            objectPath={`${objectPath}.textBox.text`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["input", "fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                            responsiveSize={true}
                        />
                        <BorderEditor
                            objectPath={`${objectPath}.textBox.border`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                        />
                    </div>
                }
            />

            {/* Button Settings */}
            <SubSettingsContainer
                name="Button"
                SettingsComponent={
                    <StoreButtonSettings
                        objectPath={`${objectPath}.button`}
                        settings={settings}
                    />
                }
            />
        </div>
    );
};

export default HeroWithImagePatternAndBoxSettings;
