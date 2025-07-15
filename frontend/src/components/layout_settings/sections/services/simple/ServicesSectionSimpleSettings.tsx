import React, { useState } from 'react'
import type { SectionEditorProps } from '../../SectionSettings'
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../../supporting/SlidingPanel';
import { AnimatePresence } from 'framer-motion';
import TextEditor from '../../../text/TextEditor';
import ResponsiveGridSettings from '../../../extras/ResponsiveGridSettings';
import ServiceCardWithImageSettings from '../cards/service_card_with_image/ServiceCardWithImageSettings';


const ServicesSectionSimpleSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath ='services';
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    
    return (
        <div className='space-y-1'>
            {/* Background Settings */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <div className="px-2 space-y-2">
                        <BackgroundEditor
                            objectPath={`${objectPath}.background`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["width", "color", "padding",]}
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
            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Cards"
                onClick={() => setActivePanel("cards")}
            />
            <AnimatePresence>
                {activePanel === "Text" && (
                    <SlidingPanel
                        key="text" isOpen={true} onClose={closePanel} title="Text Settings"
                    >
                        <div className="space-y-1">
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
                    <SlidingPanel key="heading" isOpen={true} onClose={closePanel} title="Heading Settings">
                        <div className="space-y-1">
                            <TextEditor
                                objectPath={`${objectPath}.text.heading`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "position", "fontFamily", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "lineHeight", "textDecoration"]}
                                responsiveSize
                            />

                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "subheading" && (
                    <SlidingPanel key="subheading" isOpen={true} onClose={closePanel} title="subheading Settings">
                        <div className="space-y-1">
                            <TextEditor
                                objectPath={`${objectPath}.text.subheading`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "position", "fontFamily", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "lineHeight", "textDecoration"]}
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "cards" && (
                    <SlidingPanel key="card" isOpen={true} onClose={closePanel} title="Card Settings">
                        <div className="space-y-1">
                            {/* Container */}
                            <FirstOrderSubSettingsContainer
                                name="Container"
                                onClick={() => setActivePanel("container")}
                            />
                            {/* Card */}
                            <FirstOrderSubSettingsContainer
                                name="Card"
                                onClick={() => setActivePanel("card")}
                            />
                        </div>
                    </SlidingPanel>    
                )}
                {activePanel === "container" && (
                    <SlidingPanel key="container" isOpen={true} onClose={closePanel} title="Container Settings">
                        <div className="space-y-1">
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.grid.container.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["width", "position", "color", "padding", "border", "shadow", "position", "zIndex"]}
                                        responsiveSize
                                        widthUnit="%"
                                    />
                                }
                            />
                            <SubSettingsContainer
                                name="Grid"
                                SettingsComponent={
                                    <ResponsiveGridSettings
                                        objectPath={`${objectPath}.grid`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        columnOptions={{
                                            mobile: ['1', "2"],
                                            desktop: ['1', '2', '3', '4', '5']
                                        }}
                                        gapRange={{
                                            mobile: { min: 0, max: 50 },
                                            desktop: { min: 0, max: 100 }
                                        }}
                                    />
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "card" && (
                    <SlidingPanel key="card" isOpen={true} onClose={closePanel} title="Card Settings">
                        <ServiceCardWithImageSettings settings={settings} handleSettingChange={handleSettingChange}/>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ServicesSectionSimpleSettings