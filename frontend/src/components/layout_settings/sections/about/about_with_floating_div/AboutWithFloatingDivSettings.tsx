import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { updateSetting } from "../../../../../features/layouts/layoutSettingsSlice";
import OptionsToggler from "../../../supporting/OptionsToggler";
import { handleAddSectionToLinks } from "../../hero/HeroSettings";
import BackgroundEditor from "../../../background/BackgroundEditor";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import TextEditor from "../../../text/TextEditor";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";

const AboutWithFloatingDivSettings = () => {
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
            <div className="px-[.8vh] py-[.4vh] border rounded">
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
                            allow={["color", "height", "backgroundImage"]}
                            heightUnit="vh"
                            responsiveSize
                        />
                    </div>
                }
            />
            {/* Heading Settings */}
            <FirstOrderSubSettingsContainer
                name="Heading"
                onClick={() => setActivePanel("heading")}
            />
             <FirstOrderSubSettingsContainer
                name="Container"
                onClick={() => setActivePanel("container")}
            />

            <AnimatePresence>
                {activePanel === "heading" && (
                    <SlidingPanel
                        key="heading"
                        title="Heading Settings"
                        onClose={closePanel}
                        isOpen={true}
                    >
                        <SubSettingsContainer
                            name="Heading Text"
                            SettingsComponent={
                                <div className="px-[.65vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.heading`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["input", "fontFamily", "fontSize", "color", "weight", "textAlign"]}
                                        responsiveSize
                                    />
                                </div>
                            }
                        />
                        <SubSettingsContainer
                            name="Heading Background"
                            SettingsComponent={
                                <div className="px-[.65vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.heading.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "width", "height", "border"]}
                                        responsiveSize
                                        widthUnit="%"
                                        heightUnit="%"
                                    />
                                </div>
                            }
                        />
                    </SlidingPanel>
                )}
                {activePanel === "container" && (
                    <SlidingPanel
                        key="container"
                        title="About Container Settings"
                        onClose={closePanel}
                        isOpen
                    >
                        {/* Container Background Settings */}
                        <FirstOrderSubSettingsContainer
                            name="Container Background"
                            onClick={() => setActivePanel("containerBackground")}
                        />
                         {/* Subheading Settings */}
                        <FirstOrderSubSettingsContainer
                            name="Subheading"
                            onClick={() => setActivePanel("subheading")}
                        />
                        {/* Paragraph Settings */}
                        <FirstOrderSubSettingsContainer
                            name="Paragraph"
                            onClick={() => setActivePanel("paragraph")}
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {activePanel === "containerBackground" && (
                    <SlidingPanel
                        key="containerBackground"
                        title="Container Background Settings"
                        onClose={() => setActivePanel("container")}
                        isOpen={true}
                    >
                        <BackgroundEditor
                            objectPath={`${objectPath}.container.background`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["color", "padding", "height", "width", "placement", "border", "floatingImage"]}
                            heightUnit="%"
                            widthUnit="%"
                            responsiveSize
                            responsivePadding
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
           
            <AnimatePresence>
                {activePanel === "subheading" && (
                    <SlidingPanel
                        key="subheading"
                        title="Subheading Settings"
                        onClose={() => setActivePanel("container")}
                        isOpen={true}
                    >
                        <TextEditor
                            objectPath={`${objectPath}.container.text.subheading`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["input", "fontFamily", "fontSize", "color", "weight", "underline"]}
                            responsiveSize
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
                {activePanel === "paragraph" && (
                    <SlidingPanel
                        key="paragraph"
                        title="Paragraph Settings"
                        onClose={() => setActivePanel("container")}
                        isOpen={true}
                    >
                        <TextEditor
                            objectPath={`${objectPath}.container.text.paragraph`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["input", "fontFamily", "fontSize", "color", "weight", "placement"]}
                            useTextarea
                            responsiveSize
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AboutWithFloatingDivSettings;
