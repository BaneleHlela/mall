import React, { useState } from 'react'
import BackgroundEditor from '../../../background/BackgroundEditor'
import SubSettingsContainer from '../../../extras/SubSettingsContainer'
import MultipleLayoutImagesHandler from '../../../supporting/MultipleLayoutImagesHandler';
import { getSetting } from '../../../../../utils/helperFunctions';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../../supporting/SlidingPanel';
import TextEditor from '../../../text/TextEditor';
import OptionsToggler from '../../../supporting/OptionsToggler';
import StoreButtonSettings from '../../../extras/StoreButtonSettings';

interface HeroWithTwoTextAreasSettingsProps {
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
}

const HeroWithTwoTextAreasSettings: React.FC<HeroWithTwoTextAreasSettingsProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = "sections.hero";
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    
    return (
        <div className="space-y-[.3vh]">
            <OptionsToggler
                label="Image First (Mobile)"
                options={['true', 'false']}
                value={getSetting("imageFirst.mobile", settings, objectPath) ? 'true' : 'false'}
                onChange={(value) =>
                    handleSettingChange(`${objectPath}.imageFirst.mobile`, value === 'true')
                }
            />
            <OptionsToggler
                label="Image First (Desktop)"
                options={['true', 'false']}
                value={getSetting("imageFirst.desktop", settings, objectPath) ? 'true' : 'false'}
                onChange={(value) =>
                    handleSettingChange(`${objectPath}.imageFirst.desktop`, value === 'true')
                }
            />
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                <div className="px-[.15vh] space-y-[.3vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["width", "padding"]}
                        widthUnit="%"
                        heightUnit="vh"
                        responsiveSize
                        responsivePadding
                    />
                </div>
                }
            />
            {/* Container*/}
            <FirstOrderSubSettingsContainer
                name="Text And Button Container"
                onClick={() => setActivePanel("container")}
            />
            {/* Image */}
            <FirstOrderSubSettingsContainer
                name="images"
                onClick={() => setActivePanel("images")}
            />
            <AnimatePresence>
                {activePanel === "images" && (
                    <SlidingPanel
                        key="images"
                        title="Images"
                        onClose={closePanel}
                        isOpen
                    >
                        <div className="px-[.3vh] space-y-[.3vh] py-[.15vh]">
                            {/* Background */}
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.image.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "color", "padding", "border" ]}
                                        widthUnit="%"
                                        heightUnit="%"
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Mobile"
                                SettingsComponent = {
                                    <MultipleLayoutImagesHandler
                                        objectPath={`${objectPath}.image.url.mobile`}
                                        min={1}
                                        max={5}
                                        images={getSetting("image.url.mobile", settings, objectPath)}
                                    />
                                }
                            />
                            <SubSettingsContainer
                                name="Desktop"
                                SettingsComponent = {
                                    <MultipleLayoutImagesHandler
                                        objectPath={`${objectPath}.image.url.desktop`}
                                        min={1}
                                        max={5}
                                        images={getSetting("image.url.desktop", settings, objectPath)}
                                    />
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "container" && (
                    <SlidingPanel
                        key="container"
                        title="Container Settings"
                        onClose={closePanel}
                        isOpen
                    >
                        
                        <div className="space-y-[.35vh]">
                            {/* Background Settings */}
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.background.container`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "color", "padding" ]}
                                        widthUnit="%"
                                        heightUnit="%"
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            {/* First Text Area */}
                            <FirstOrderSubSettingsContainer
                                name="First Text Area"
                                onClick={() => setActivePanel("firstTextArea")}
                            />
                            {/* Second Text Area */}
                            <FirstOrderSubSettingsContainer
                                name="Second Text Area"
                                onClick={() => setActivePanel("secondTextArea")}
                            />
                            {/* Button */}
                            <FirstOrderSubSettingsContainer
                                name="Button"
                                onClick={() => setActivePanel("button")}
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "firstTextArea" && (
                    <SlidingPanel
                        key="firstTextArea"
                        isOpen={true}
                        onClose={() => setActivePanel("container")}
                        title="First Text Area"
                    >
                        <div className="px-2 space-y-[.6vh]">
                            <TextEditor
                                objectPath={`${objectPath}.text.firstArea`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "show", "fontFamily", "color", "weight", "fontSize", "fontStyle", "textAlign", "lineHeight", "padding", "textMaxWidth"]}
                                useQuill
                                responsiveSize
                                responsivePadding
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "secondTextArea" && (
                    <SlidingPanel
                        key="secondTextArea"
                        isOpen={true}
                        onClose={() => setActivePanel("container")}
                        title="Second Text Area"
                    >
                        <div className="px-2 space-y-[.6vh]">
                            <TextEditor
                                objectPath={`${objectPath}.text.secondArea`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "show", "fontFamily", "color", "weight", "fontSize", "fontStyle", "textAlign", "lineHeight", "padding", "textMaxWidth"]}
                                useQuill
                                responsiveSize
                                responsivePadding
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "button" && (
                    <SlidingPanel
                        key="button"
                        isOpen={true}
                        onClose={closePanel}
                        title="Hero Button"
                    >
                        <StoreButtonSettings
                            objectPath={`${objectPath}.button`}
                            settings={settings}
                            allowFunction
                            allowPosition
                            allowSimpleShow
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default HeroWithTwoTextAreasSettings;