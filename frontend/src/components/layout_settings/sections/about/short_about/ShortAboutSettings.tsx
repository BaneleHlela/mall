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

const ShortAboutSettings = () => {
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
            <FirstOrderSubSettingsContainer
                name="text"
                onClick={() => setActivePanel("text")}
            />
            <AnimatePresence>
                {activePanel === "text" && (
                    <SlidingPanel
                        key="text"
                        title="Text Settings"
                        onClose={closePanel}
                        isOpen={true}
                    >
                        <SubSettingsContainer
                            name="Header"
                            SettingsComponent={
                                <div className="px-[.65vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.text.header`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["input", "fontFamily", "fontSize", "color", "weight", "fontStyle", "padding"]}
                                        responsivePadding
                                        responsiveSize
                                    />
                                </div>
                            }
                        />
                        <SubSettingsContainer
                            name="Paragraph"
                            SettingsComponent={
                                <div className="px-[.65vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.text.paragraph`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["input", "fontFamily", "fontSize", "color", "weight", "fontStyle", "padding"]}
                                        responsivePadding
                                        responsiveSize
                                        useTextarea
                                    />
                                </div>
                            }
                        />
                    </SlidingPanel>
                )}
                {activePanel === "header" && (
                    <SlidingPanel
                        key="header"
                        title="Header Text Settings"
                        onClose={closePanel}
                        isOpen={true}
                    >
                        <TextEditor
                            objectPath="about.text.header"
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["input", "fontFamily", "fontSize", "color", "weight", "fontStyle", "padding"]}
                            responsivePadding
                            responsiveSize
                        />
                    </SlidingPanel>
                )}
                {activePanel === "paragraph" && (
                    <SlidingPanel
                        key="paragraph"
                        title="Paragraph Text Settings"
                        onClose={closePanel}
                        isOpen={true}
                    >
                        <TextEditor
                            objectPath="about.text.paragraph"
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["input", "fontFamily", "fontSize", "color", "weight", "fontStyle", "padding"]}
                            responsivePadding
                            responsiveSize
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ShortAboutSettings;