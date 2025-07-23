import React, { useState } from 'react'
import type { SectionEditorProps } from '../../SectionSettings'
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../../supporting/SlidingPanel';
import { AnimatePresence } from 'framer-motion';
import TextEditor from '../../../text/TextEditor';
import ResponsiveGridSettings from '../../../extras/ResponsiveGridSettings';
import OptionsToggler from '../../../supporting/OptionsToggler';
import { getSetting } from '../../../../../utils/helperFunctions';
import PopularTeamCardSettings from '../../services/cards/team/PopularTeamCardSettings';
import BorderEditor from '../../../background/BorderEditor';


const PopularStoreTeamSectionSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath ='team';
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    
    return (
        <div className='space-y-[.3vh]'>
            {/* Background Settings */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <div className="px-[.6vh] space-y-[.6vh]">
                        <BackgroundEditor
                            objectPath={`${objectPath}.background`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["width", "color", "padding", "height"]}
                            widthUnit="%"
                            heightUnit='vh'
                            responsiveSize
                            responsivePadding
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
                {activePanel === "cards" && (
                    <SlidingPanel key="card" isOpen={true} onClose={closePanel} title="Card Settings">
                        <div className="space-y-[.3vh]">
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
                            {/* Toggle Buttons */}
                            {((getSetting("stack.mobile", settings, objectPath) === "horizontal") ||
                                (getSetting("stack.desktop", settings, objectPath) === "horizontal")) && 
                                (
                                    <FirstOrderSubSettingsContainer
                                        name="Togge Buttons"
                                        onClick={() => setActivePanel("toggle_buttons")}
                                    />
                            )}
                            {/* Step Indicator */}
                            {((getSetting("stack.mobile", settings, objectPath) === "horizontal") ||
                                (getSetting("stack.desktop", settings, objectPath) === "horizontal")) && 
                                (
                                    <FirstOrderSubSettingsContainer
                                        name="Step Indicator"
                                        onClick={() => setActivePanel("step_indicator")}
                                    />
                            )}
                        </div>
                    </SlidingPanel>    
                )}
                {activePanel === "toggle_buttons" && 
                    ((getSetting("stack.mobile", settings, objectPath) === "horizontal") ||
                    (getSetting("stack.desktop", settings, objectPath) === "horizontal"))
                    && (
                    <SlidingPanel  key="toggle_buttons" isOpen={true} onClose={() => setActivePanel("cards")} title="Toggle Buttons Settings">
                        <TextEditor
                            objectPath={`${objectPath}.toggleButtons`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["position", "fontFamily", "backgroundColor", "padding", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "textDecoration"]}
                        />
                        <BorderEditor
                            objectPath={`${objectPath}.toggleButtons.background.border`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                        />
                    </SlidingPanel>
                )}
                {activePanel === "step_indicator" && 
                    ((getSetting("stack.mobile", settings, objectPath) === "horizontal") ||
                    (getSetting("stack.desktop", settings, objectPath) === "horizontal"))
                    && (
                    <SlidingPanel  key="step_indicator" isOpen={true} onClose={() => setActivePanel("cards")} title="Step Indicator Settings">
                        <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                            <OptionsToggler
                                label="Use"
                                options={["dots", "digits"]}
                                value={getSetting("grid.container.stepIndicator.use", settings, objectPath)}
                                onChange={(value) => handleSettingChange(`${objectPath}.grid.container.stepIndicator.use`, value)}
                            />
                        </div>
                        {settings.team.grid.container.stepIndicator.use === "digits" && (
                            <TextEditor
                                objectPath={`${objectPath}.grid.container.stepIndicator.text`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["position", "fontFamily", "backgroundColor", "padding", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "textDecoration"]}
                            />
                        )}
                        {settings.team.grid.container.stepIndicator.use === "dots" && (
                            <BackgroundEditor
                                objectPath={`${objectPath}.grid.container.stepIndicator.background`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["height", "border", "color"]}
                                heightUnit='px'
                                responsiveSize
                            />
                        )}
                    </SlidingPanel>
                )}

                {activePanel === "container" && (
                    <SlidingPanel key="container" isOpen={true} onClose={() => setActivePanel("cards")} title="Container Settings">
                        <div className="space-y-[.3vh]">
                            <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                <OptionsToggler
                                    label="Mobile Stack"
                                    options={["horizontal", "vertical"]}
                                    value={getSetting("stack.mobile", settings, objectPath)}
                                    onChange={(value) => handleSettingChange(`${objectPath}.stack.mobile`, value)}
                                />
                                <OptionsToggler
                                    label="Desktop Stack"
                                    options={["horizontal", "vertical"]}
                                    value={getSetting("stack.desktop", settings, objectPath)}
                                    onChange={(value) => handleSettingChange(`${objectPath}.stack.desktop`, value)}
                                />
                            </div>
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.grid.container.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["width", "position", "color", "padding", "border", "shadow", "position", "zIndex"]}
                                        responsiveSize
                                        responsivePadding
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
                                            desktop: ['1', '2', '3', '4']
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
                    <SlidingPanel key="card" isOpen={true} onClose={() => setActivePanel("cards")} title="Card Settings">
                        <PopularTeamCardSettings settings={settings} handleSettingChange={handleSettingChange}/>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PopularStoreTeamSectionSettings