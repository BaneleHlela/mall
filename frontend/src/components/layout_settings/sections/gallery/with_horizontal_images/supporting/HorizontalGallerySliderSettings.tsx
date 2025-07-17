import { useState } from "react";
import BackgroundEditor from "../../../../background/BackgroundEditor";
import SubSettingsContainer from "../../../../extras/SubSettingsContainer";
import FirstOrderSubSettingsContainer from "../../../../FirstOrderSubSettingsContainer";
import TextEditor from "../../../../text/TextEditor";
import SlidingPanel from "../../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import HorizontalGalleryImagesHandler from "./HorizontalGalleryImagesHandler";
import OptionsToggler from "../../../../supporting/OptionsToggler";
import { getSetting } from "../../../../../../utils/helperFunctions";


interface HorizontalGallerySliderSettingsProps {
  settings: any;
  handleSettingChange: (path: string, value: any) => void;
  objectPath: string;
}

const HorizontalGallerySliderSettings: React.FC<HorizontalGallerySliderSettingsProps> = ({
  settings,
  handleSettingChange,
  objectPath,
}) => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
  return (
    <div className="space-y-[.3vh] px-[.6vh]">        
        {/* Background container settings */}
        <SubSettingsContainer
            name="Background"
            SettingsComponent={
            <BackgroundEditor
                objectPath={`${objectPath}.background`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["color", "border", "shadow", "padding", "height", "width"]}
                widthUnit="vw"
                heightUnit="vh"
                responsiveSize
            />
            }
        />
        {/* Image Container Styling */}
        <SubSettingsContainer
            name="Image Container Styling"
            SettingsComponent={
            <BackgroundEditor
                objectPath={`${objectPath}.image.background`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["padding", "height", "border"]}
                heightUnit="%"
                responsiveSize
            />
            }
        />
        <FirstOrderSubSettingsContainer 
            name="Text" 
            onClick={() => setActivePanel("text")} 
        />
        {/* Images */}
        <FirstOrderSubSettingsContainer 
            name="Images" 
            onClick={() => setActivePanel("images")} 
        />
        {/* Hover */}
        <FirstOrderSubSettingsContainer 
            name="Hover" 
            onClick={() => setActivePanel("hover")} 
        />
        
        <AnimatePresence>
            {activePanel === "images" && (
                <SlidingPanel
                    key="title"
                    isOpen={true}
                    onClose={closePanel}
                    title="Images"
                >
                    <HorizontalGalleryImagesHandler
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        objectPath={`${objectPath}.image.images`}
                    />
                </SlidingPanel>
            )}
            {activePanel === "text" && (
                <SlidingPanel
                    key="text"
                    isOpen={true}
                    onClose={closePanel}
                    title="Title Text"
                >
                    <div className="space-y-[.3vh]">
                        {/* Description Text */}
                        <SubSettingsContainer
                            name="Title"
                            SettingsComponent={
                            <TextEditor
                                objectPath={`${objectPath}.text.title`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={[
                                "show",
                                "fontFamily",
                                "fontSize",
                                "color",
                                "weight",
                                "fontStyle",
                                "position",
                                ]}
                                responsiveSize
                            />
                            }
                        />

                        {/* Description Text */}
                        <SubSettingsContainer
                            name="Description"
                            SettingsComponent={
                            <TextEditor
                                objectPath={`${objectPath}.text.description`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={[
                                "show",
                                "fontFamily",
                                "fontSize",
                                "color",
                                "weight",
                                "fontStyle",
                                "position"
                                ]}
                                responsiveSize
                            />
                            }
                        />
                    </div>
                </SlidingPanel>
            )}
            {activePanel === "hover" && (
                <SlidingPanel
                    key="hover"
                    isOpen={true}
                    onClose={closePanel}
                    title="Hover Description"
                >
                    <div className='space-y-1 pb-1'>
                    <BackgroundEditor
                      objectPath={`${objectPath}.hover.background`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["color", "opacity"]}
                      responsiveSize
                    />
                    <div className="px-2 space-y-1">
                        <SubSettingsContainer
                        name="View Button"
                        SettingsComponent={
                            <div className="px-2 py-1 space-y-1">
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                <BackgroundEditor
                                    objectPath={`${objectPath}.hover.viewButton.background`}
                                    settings={settings}
                                    handleSettingChange={handleSettingChange}
                                    allow={["color", "height", "width", "border", "opacity"]}
                                    widthUnit="%"
                                    heightUnit="%"
                                />
                                }
                            />
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                <TextEditor
                                    objectPath={`${objectPath}.hover.viewButton.text`}
                                    settings={settings}
                                    handleSettingChange={handleSettingChange}
                                    allow={["fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                                />
                                }
                            />
                            </div>
                        }
                        />
                    </div>
                    
                    <div className="px-2 space-y-1">
                        <SubSettingsContainer
                        name="Description Text"
                        SettingsComponent={
                            <>
                                <div className="px-2">
                                    <OptionsToggler
                                        label="Show Description"
                                        options={["Yes", "No"]}
                                        value={
                                        getSetting("slider.hover.descriptionText.show", settings, objectPath)
                                            ? "Yes"
                                            : "No"
                                        }
                                        onChange={(value) =>
                                        handleSettingChange(
                                            `${objectPath}.slider.hover.descriptionText.show`,
                                            value === "Yes"
                                        )
                                        }
                                    />
                                </div>
                                <TextEditor
                                    objectPath={`${objectPath}.slider.hover.descriptionText.style`}
                                    settings={settings}
                                    handleSettingChange={handleSettingChange}
                                    allow={["fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                                />
                            </>
                        }
                        />
                    </div>
                  </div>
                </SlidingPanel>
            )}
        </AnimatePresence>
    </div>
  );
};

export default HorizontalGallerySliderSettings;
