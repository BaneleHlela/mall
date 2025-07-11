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
            {/* Heading */}
            <SubSettingsContainer
                name="Heading"
                SettingsComponent={
                <div className="px-2 space-y-1 py-1">
                    <TextEditor
                        objectPath={`${objectPath}.text.title`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={[ "color", "input", "fontFamily", "fontSize", "weight", "lineHeight", "animation", "letterSpacing" ]}
                        responsiveSize
                    />
                </div>
                }
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