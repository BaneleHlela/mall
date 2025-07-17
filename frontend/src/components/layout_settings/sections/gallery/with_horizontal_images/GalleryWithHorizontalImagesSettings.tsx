import { useState } from "react";
import type { SectionEditorProps } from "../../SectionSettings"
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import BackgroundEditor from "../../../background/BackgroundEditor";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import { AnimatePresence } from "framer-motion";
import SlidingPanel from "../../../supporting/SlidingPanel";
import TextEditor from "../../../text/TextEditor";
import HorizontalGallerySliderSettings from "./supporting/HorizontalGallerySliderSettings";

const GalleryWithHorizontalImagesSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange
}) => {
    const objectPath = "gallery";
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    return (
        <div className='text-[1.8vh] space-y-[.3vh]'>
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["color", "height", "width", "padding"]}
                        widthUnit="%"
                        heightUnit="vh"
                        responsiveSize
                    />
                }
            />
            {/* Text */}
            <FirstOrderSubSettingsContainer 
                name="Text" 
                onClick={() => setActivePanel("text")} 
            />
            {/* Text */}
            <FirstOrderSubSettingsContainer 
                name="Slider" 
                onClick={() => setActivePanel("slider")} 
            />
            <AnimatePresence>
                {activePanel === "text" && (
                    <SlidingPanel
                        key="text" 
                        isOpen={true}
                        onClose={closePanel}
                        title="Text Settings"
                    >
                        <div className="space-y-[.3vh]">
                            <FirstOrderSubSettingsContainer
                                name="Heading"
                                onClick={() => setActivePanel("heading")}
                            />
                            <FirstOrderSubSettingsContainer
                                name="Subheading"
                                onClick={() => setActivePanel("subheading")}
                            />
                        </div> 
                    </SlidingPanel>
                )}
                {activePanel === "heading" && (
                    <SlidingPanel key="heading" isOpen={true} onClose={closePanel} title="Gallery Title">
                        <div className="px-2 space-y-1 py-1">
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                    <TextEditor
                                        objectPath={`${objectPath}.heading`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["input", "show", "position", "fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                                        responsiveSize
                                    />
                                }
                            />
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.heading.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "border", "padding"]}
                                        heightUnit='vh'
                                        widthUnit='vw'
                                        responsiveSize
                                    />
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "subheading" && (
                    <SlidingPanel key="subheading" isOpen={true} onClose={closePanel} title="Gallery Subheading">
                        <div className="px-2 space-y-1 py-1">
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                    <TextEditor
                                        objectPath={`${objectPath}.subheading`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["input", "show", "position", "fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                                        responsiveSize
                                    />
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "slider" && (
                    <SlidingPanel key="slider" isOpen={true} onClose={closePanel} title="Slider Settings">
                        <HorizontalGallerySliderSettings settings={settings} handleSettingChange={handleSettingChange} objectPath="gallery.slider"/>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default GalleryWithHorizontalImagesSettings