import { useState } from "react";
import type { SectionSettingsProps } from "../with_image_slider/GalleryWithImageSliderSettings"
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import BackgroundEditor from "../../../background/BackgroundEditor";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import UnderlinedTextSettings from "../../../extras/text/UnderlinedTextSettings";
import OptionsToggler from "../../../supporting/OptionsToggler";
import ResponsiveGridSettings from "../../../extras/ResponsiveGridSettings";
import BorderEditor from "../../../background/BorderEditor";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";

const SimpleGallerySectionSettings: React.FC<SectionSettingsProps>  = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = "sections.gallery";

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
                        allow={["width", "color", "padding"]}
                        responsivePadding
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
            <AnimatePresence>
                {activePanel === "Text" && (
                    <SlidingPanel
                        key="text" isOpen={true} onClose={closePanel} title="Text Settings"
                    >
                        <div className="space-y-[.3vh]">
                            {/* Heading */}
                            <FirstOrderSubSettingsContainer
                                name="Heading"
                                onClick={() => setActivePanel("heading")}
                            />
                            {/* Subheading */}
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
                            <UnderlinedTextSettings
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                objectPath={`${objectPath}.text.heading`}
                                allowInput
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "subheading" && (
                    <SlidingPanel key="subheading" isOpen={true} onClose={() => setActivePanel("Text")} title="Subheading Settings">
                        <div className="space-y-[.3vh]">
                            <UnderlinedTextSettings
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                objectPath={`${objectPath}.text.subheading`}
                                allowInput
                                responsiveSize
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
                        <div className="space-y-[.35vh]">
                            {/* Image URLs */}
                            <SubSettingsContainer
                                name="Image URLs"
                                SettingsComponent={
                                    <MultipleLayoutImagesHandler
                                        objectPath={`${objectPath}.images.urls`}
                                        images={settings.sections.gallery.images.urls}
                                        max={20}
                                    />
                                }
                            />
                            {/* Image Background */}
                            <SubSettingsContainer
                                name="Image Background"
                                SettingsComponent={
                                    <div className="px-2 space-y-2">
                                        <BorderEditor
                                            objectPath={`${objectPath}.images.background.border`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={["width", "style", "color", "radius"]}
                                        />
                                        <BackgroundEditor
                                            objectPath={`${objectPath}.images.background`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={["height"]}
                                            responsiveSize
                                            heightUnit="vh"
                                        />
                                    </div>
                                }
                            />
                            {/* Layout */}
                            <SubSettingsContainer
                                name="Layout"
                                SettingsComponent={
                                    <div className="px-2 space-y-2">
                                        <OptionsToggler
                                            label="Stack Direction"
                                            options={['horizontal', 'vertical']}
                                            value={settings.sections.gallery.images.stack.mobile}
                                            onChange={(value) => handleSettingChange(`${objectPath}.images.stack.mobile`, value)}
                                        />
                                        <OptionsToggler
                                            label="Desktop Stack Direction"
                                            options={['horizontal', 'vertical']}
                                            value={settings.sections.gallery.images.stack.desktop}
                                            onChange={(value) => handleSettingChange(`${objectPath}.images.stack.desktop`, value)}
                                        />
                                        <ResponsiveGridSettings
                                            objectPath={`${objectPath}.images`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SimpleGallerySectionSettings;