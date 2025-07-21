import { useState } from "react";
import type { SectionSettingsProps } from "../with_image_slider/GalleryWithImageSliderSettings"
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import TextEditor from "../../../text/TextEditor";
import BackgroundEditor from "../../../background/BackgroundEditor";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SupportingImagesSettings from "./SupportingImagesSettings";
import SlidingPanel from "../../../supporting/SlidingPanel";
import GalleryThumbnailSettings from "./GalleryThumbnailSettings";
import GalleryModalSettings from "./GalleryModalSettings";

const GalleryWithGroupedImagesSettings: React.FC<SectionSettingsProps>  = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = "gallery";
    
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    return (
        <div className="space-y-1">
            {/* Background */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                <div className="px-2 space-y-2">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["width", "color"]}
                        widthUnit="%"
                        responsiveSize
                    />
                </div>
                }
            />
            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Text"
                onClick={() => setActivePanel("Text")}
            />
            {/* Images */}
            <FirstOrderSubSettingsContainer
                name="Images"
                onClick={() => setActivePanel("Images")}
            />
            {/* Thumbnail */}
            <FirstOrderSubSettingsContainer
                name="Thumbnails"
                onClick={() => setActivePanel("Thumbnails")}
            />
            {/* Modal */}
            <FirstOrderSubSettingsContainer
                name="Modal"
                onClick={() => setActivePanel("Modal")}
            />
            {activePanel === "Text" && (
                    <SlidingPanel
                        key="text" isOpen={true} onClose={closePanel} title="Text Settings"
                    >
                        <div className="space-y-[.3vh]">
                            {/* Text */}
                            <FirstOrderSubSettingsContainer
                                name="Heading"
                                onClick={() => setActivePanel("heading")}
                            />
                            {/* Text */}
                            <FirstOrderSubSettingsContainer
                                name="Subheading"
                                onClick={() => setActivePanel("subheading")}
                            />
                        </div>
                        
                    </SlidingPanel>
                )}
                {activePanel === "heading" && (
                    <SlidingPanel key="heading" isOpen={true} onClose={() => setActivePanel("Text")} title="Heading Settings">
                        <div className="space-y-[.3vh]">
                            <TextEditor
                                objectPath={`${objectPath}.text.heading`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "position", "fontFamily", "padding", "backgroundColor", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "textDecoration"]}
                                responsiveSize
                                responsivePadding
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "subheading" && (
                    <SlidingPanel key="subheading" isOpen={true} onClose={() => setActivePanel("Text")} title="subheading Settings">
                        <div className="space-y-[.3vh]">
                            <TextEditor
                                objectPath={`${objectPath}.text.subheading`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "position", "padding", "fontFamily", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "textDecoration"]}
                                responsiveSize
                                responsivePadding
                            />
                        </div>
                    </SlidingPanel>
                )}
            {activePanel === "Images" && (
                <SlidingPanel 
                    key="images"
                    onClose={closePanel}
                    isOpen={true}
                    title="Gallery Images"
                >
                    <SupportingImagesSettings 
                        handleSettingChange={handleSettingChange}
                        objectPath={`${objectPath}.imagesModal.images`} 
                        settings={settings} 
                    />
                </SlidingPanel>
            )}
            {activePanel === "Thumbnails" && (
                <SlidingPanel 
                    key="thumbnail"
                    onClose={closePanel}
                    isOpen={true}
                    title="Gallery Thumbnails"
                >
                    <GalleryThumbnailSettings 
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        objectPath={`${objectPath}`} 
                    />
                </SlidingPanel>
            )}
            {activePanel === "Modal" && (
                <SlidingPanel 
                    key="modal"
                    onClose={closePanel}
                    isOpen={true}
                    title="Gallery Modal"
                >
                    <GalleryModalSettings 
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        objectPath={`${objectPath}`} 
                    />
                </SlidingPanel>
            )}
        </div>
    )
}

export default GalleryWithGroupedImagesSettings