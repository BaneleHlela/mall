import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { updateSetting } from "../../../../../features/layouts/layoutSettingsSlice";
import OptionsToggler from "../../../supporting/OptionsToggler";
import { handleAddSectionToLinks } from "../../hero/HeroSettings";
import BackgroundEditor from "../../../background/BackgroundEditor";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import TextEditor from "../../../text/TextEditor";
import UnderlinedTextSettings from "../../../extras/text/UnderlinedTextSettings";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";

const AboutWithLineAndImageSettings = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const routes = useAppSelector((state) => state.layoutSettings.routes);
    const pageSections = routes.home?.contains || [];
    const objectPath = "sections.about";
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    const menuBarToggle = (
        pageSections.includes('about') && (
            <div className="px-2 py-1 border rounded">
                <OptionsToggler
                    label="Add to Menubar ?"
                    options={["yes", "no"]}
                    value={
                        settings.routes?.home?.inLinks?.some(
                            link => link.section === "about"
                        )
                            ? "yes"
                            : "no"
                    }
                    onChange={(option) =>
                        handleAddSectionToLinks(dispatch, settings, "about", option)
                    }
                />
            </div>
        )
    );

    return (
        <div className="space-y-[.3vh]">
            {menuBarToggle}
            
            {/* Background Settings */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <div className="px-[.65vh] space-y-[.3vh]">
                        <BackgroundEditor
                            objectPath={`${objectPath}.background`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["color", "width", "padding"]}
                            widthUnit="%"
                            responsiveSize
                            responsivePadding
                        />
                    </div>
                }
            />
            
            {/* Text Settings */}
            <FirstOrderSubSettingsContainer
                name="Text"
                onClick={() => setActivePanel("text")}
            />
            
            {/* Image Settings */}
            <FirstOrderSubSettingsContainer
                name="Image"
                onClick={() => setActivePanel("image")}
            />
            
            <AnimatePresence>
                {/* Text Settings Panel */}
                {activePanel === "text" && (
                    <SlidingPanel
                        key="text"
                        title="Text Settings"
                        onClose={closePanel}
                        isOpen={true}
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
                            {/* First Paragraph */}
                            <FirstOrderSubSettingsContainer
                                name="First Paragraph"
                                onClick={() => setActivePanel("firstParagraph")}
                            />
                            {/* Second Subheading */}
                            <FirstOrderSubSettingsContainer
                                name="Second Subheading"
                                onClick={() => setActivePanel("secondSubheading")}
                            />
                            {/* Second Paragraph */}
                            <FirstOrderSubSettingsContainer
                                name="Second Paragraph"
                                onClick={() => setActivePanel("secondParagraph")}
                            />
                        </div>
                    </SlidingPanel>
                )}
                
                {/* Heading Settings */}
                {activePanel === "heading" && (
                    <SlidingPanel
                        key="heading"
                        title="Heading Settings"
                        onClose={() => setActivePanel("text")}
                        isOpen={true}
                    >
                        <div className="px-[.65vh] space-y-[.3vh]">
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
                
                {/* Subheading Settings */}
                {activePanel === "subheading" && (
                    <SlidingPanel
                        key="subheading"
                        title="Subheading Settings"
                        onClose={() => setActivePanel("text")}
                        isOpen={true}
                    >
                        <div className="px-[.65vh] space-y-[.3vh]">
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
                
                {/* First Paragraph Settings */}
                {activePanel === "firstParagraph" && (
                    <SlidingPanel
                        key="firstParagraph"
                        title="First Paragraph Settings"
                        onClose={() => setActivePanel("text")}
                        isOpen={true}
                    >
                        <div className="px-[.65vh] space-y-[.3vh]">
                            <TextEditor
                                objectPath={`${objectPath}.text.firstParagraph`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "fontFamily", "fontSize", "color", "weight", "fontStyle", "padding", "lineHeight"]}
                                responsivePadding
                                responsiveSize
                                useTextarea
                            />
                        </div>
                    </SlidingPanel>
                )}
                
                {/* Second Subheading Settings */}
                {activePanel === "secondSubheading" && (
                    <SlidingPanel
                        key="secondSubheading"
                        title="Second Subheading Settings"
                        onClose={() => setActivePanel("text")}
                        isOpen={true}
                    >
                        <div className="px-[.65vh] space-y-[.3vh]">
                            <UnderlinedTextSettings
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                objectPath={`${objectPath}.text.secondSubheading`}
                                allowInput
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                
                {/* Second Paragraph Settings */}
                {activePanel === "secondParagraph" && (
                    <SlidingPanel
                        key="secondParagraph"
                        title="Second Paragraph Settings"
                        onClose={() => setActivePanel("text")}
                        isOpen={true}
                    >
                        <div className="px-[.65vh] space-y-[.3vh]">
                            <TextEditor
                                objectPath={`${objectPath}.text.secondParagraph`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "fontFamily", "fontSize", "color", "weight", "fontStyle", "padding"]}
                                responsivePadding
                                responsiveSize
                                useQuill
                            />
                        </div>
                    </SlidingPanel>
                )}
                
                {/* Image Settings Panel */}
                {activePanel === "image" && (
                    <SlidingPanel
                        key="image"
                        title="Image Settings"
                        onClose={closePanel}
                        isOpen={true}
                    >
                        <div className="space-y-[.35vh]">
                            {/* Image URLs */}
                            <SubSettingsContainer
                                name="Image URLs"
                                SettingsComponent={
                                    <MultipleLayoutImagesHandler
                                        objectPath={`${objectPath}.image.url`}
                                        images={settings.sections.about.image.url}
                                        max={2}
                                    />
                                }
                            />
                            
                            {/* Image Background */}
                            <SubSettingsContainer
                                name="Image Background"
                                SettingsComponent={
                                    <BackgroundEditor
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        objectPath={`${objectPath}.image.background`}
                                        allow={["border", "height", "width"]}
                                        widthUnit="%"
                                        heightUnit="vh"
                                        responsiveSize
                                    />
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AboutWithLineAndImageSettings;