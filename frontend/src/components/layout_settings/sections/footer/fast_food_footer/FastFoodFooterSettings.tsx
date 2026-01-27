import React, { useState } from 'react'
import BackgroundEditor from '../../../background/BackgroundEditor'
import SubSettingsContainer from '../../../extras/SubSettingsContainer'
import { getSetting } from '../../../../../utils/helperFunctions';
import TextEditor from '../../../text/TextEditor';
import OptionsToggler from '../../../supporting/OptionsToggler';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../../supporting/SlidingPanel';
import SimpleLogoSettings from '../../../menubar/popular/supporting/SimpleLogoSettings';

interface FastFoodFooterSettingsProps {
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
}

const FastFoodFooterSettings: React.FC<FastFoodFooterSettingsProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = "sections.footer";
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    return (
        <div className="space-y-[.3vh]">
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                <div className="px-[.15vh] space-y-[.3vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["color", "padding"]}
                        widthUnit="%"
                        heightUnit="vh"
                        responsiveSize
                        responsivePadding
                    />
                </div>
                }
            />
            <FirstOrderSubSettingsContainer
                name="Logo/Image"
                onClick={() => setActivePanel("logo")}
            />
            <FirstOrderSubSettingsContainer
                name="text"
                onClick={() => setActivePanel("text")}
            />
            
            
            <AnimatePresence>
                {activePanel === "text" && (
                    <SlidingPanel
                        key="text"
                        title="Edit Text Settings"
                        onClose={closePanel}
                        isOpen={true}
                    >
                        <SubSettingsContainer
                            name="Header"
                            SettingsComponent={
                            <div className="px-[.15vh] space-y-[.3vh]">
                                <TextEditor
                                    objectPath={`${objectPath}.text.header`}
                                    settings={settings}
                                    handleSettingChange={handleSettingChange}
                                    allow={["input", "show", "fontFamily", "color", "weight", "fontSize", "fontStyle", "textAlign", "lineHeight", "padding"]}
                                    responsiveSize
                                    responsivePadding
                                />
                            </div>
                            }
                        />
                        <SubSettingsContainer
                            name="Details"
                            SettingsComponent={
                            <div className="px-[.15vh] space-y-[.3vh]">
                                <TextEditor
                                    objectPath={`${objectPath}.text.details`}
                                    settings={settings}
                                    handleSettingChange={handleSettingChange}
                                    allow={["fontFamily", "color", "weight", "fontSize", "fontStyle", "textAlign", "lineHeight", "padding"]}
                                    responsiveSize
                                    responsivePadding
                                />
                            </div>
                            }
                        />
                        <SubSettingsContainer
                            name="Address Text"
                            SettingsComponent={
                            <div className="px-[.15vh] space-y-[.3vh]">
                                <TextEditor
                                    objectPath={`${objectPath}.text.address`}
                                    settings={settings}
                                    handleSettingChange={handleSettingChange}
                                    allow={["input", "padding"]}
                                    useQuill
                                    responsiveSize
                                    responsivePadding
                                />
                            </div>
                            }
                        />
                    </SlidingPanel>
                )}
                {activePanel === "logo" && (
                    <SlidingPanel
                        key="logo"
                        title="Logo/Image Settings"
                        onClose={closePanel}
                        isOpen={true}
                    >
                        <SimpleLogoSettings
                            objectPath={`${objectPath}.logo`}
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FastFoodFooterSettings;