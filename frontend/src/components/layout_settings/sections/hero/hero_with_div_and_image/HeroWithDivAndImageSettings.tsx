import React, { useState } from 'react'
import BackgroundEditor from '../../../background/BackgroundEditor'
import SubSettingsContainer from '../../../extras/SubSettingsContainer'
import MultipleLayoutImagesHandler from '../../../supporting/MultipleLayoutImagesHandler';
import { getSetting } from '../../../../../utils/helperFunctions';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../../supporting/SlidingPanel';
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings';
import OptionsToggler from '../../../supporting/OptionsToggler';
import StoreButtonSettings from '../../../extras/StoreButtonSettings';

interface HeroWithBoxSettingsProps {
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
}

const HeroWithDivAndImageSettings: React.FC<HeroWithBoxSettingsProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = "hero";
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
                        allow={["height", "width"]}
                        widthUnit="%"
                        heightUnit="vh"
                        responsiveSize
                    />
                </div>
                }
            />
            <SubSettingsContainer
                name="Images"
                SettingsComponent={
                <div className="px-2 space-y-[.3vh] py-1">
                    <MultipleLayoutImagesHandler
                        objectPath={`${objectPath}.image.url.mobile`}
                        min={1}
                        max={1}
                        images={getSetting("image.url.mobile", settings, objectPath)}
                    />
                    <MultipleLayoutImagesHandler
                        objectPath={`${objectPath}.image.url.desktop`}
                        min={1}
                        max={1}
                        images={getSetting("image.url.desktop", settings, objectPath)}
                    />
                </div>
                }
            />
            {/* Container*/}
            <FirstOrderSubSettingsContainer
                name="Container"
                onClick={() => setActivePanel("container")}
            />
            <AnimatePresence>
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
                                        allow={[ "height", "width", "color", "padding" ]}
                                        widthUnit="%"
                                        heightUnit="%"
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            {/* Text Lines */}
                            <FirstOrderSubSettingsContainer
                                name="Text"
                                onClick={() => setActivePanel("textLines")}
                            />
                            {/* Button */}
                            <FirstOrderSubSettingsContainer
                                name="Button"
                                onClick={() => setActivePanel("button")}
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "textLines" && (
                    <SlidingPanel
                        key="textLines"
                        isOpen={true}
                        onClose={closePanel}
                        title="Text Lines"
                    >
                        <div className="px-2 space-y-1 py-1">
                        {/* Text Width Settings */}
                        <SubSettingsContainer
                            name="Text Width"
                            SettingsComponent={
                            <div className="px-2 space-y-2">
                                <BackgroundEditor
                                objectPath={`${objectPath}.text`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["width"]}
                                widthUnit="vw"
                                responsiveSize={true}
                                />
                            </div>
                            }
                        />

                        {/* Individual Line Settings */}
                        {["firstLine", "secondLine", "thirdLine"].map((lineKey) => (
                            <FirstOrderSubSettingsContainer
                            key={lineKey}
                            name={lineKey.replace("Line", " Line")} // Formats: firstLine -> first Line
                            onClick={() => setActivePanel(lineKey)}
                            />
                        ))}
                        </div>
                    </SlidingPanel>
                )}
                {["firstLine", "secondLine", "thirdLine"].map((lineKey) => (
                    activePanel === lineKey && (
                        <SlidingPanel
                            key={lineKey}
                            isOpen={true}
                            onClose={() => setActivePanel("textLines")}
                            title={`Text Line: ${lineKey.replace("Line", " Line")}`}
                        >
                            <div className="px-2 space-y-[.6vh]">
                                <OptionsToggler
                                    label="Show"
                                    options={["true", "false"]}
                                    value={
                                        getSetting(`text.${lineKey}.show`, settings, objectPath)
                                        ? "true"
                                        : "false"
                                    }
                                    onChange={(value) =>
                                        handleSettingChange(
                                        `${objectPath}.text.${lineKey}.show`,
                                        value === "true"
                                        )
                                    }
                                />

                                <UnderlinedTextSettings
                                    objectPath={`${objectPath}.text.${lineKey}`}
                                    settings={settings}
                                    handleSettingChange={handleSettingChange}
                                    allowInput
                                    responsiveSize
                                />
                            </div>
                        </SlidingPanel>
                    )
                ))}
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

export default HeroWithDivAndImageSettings;