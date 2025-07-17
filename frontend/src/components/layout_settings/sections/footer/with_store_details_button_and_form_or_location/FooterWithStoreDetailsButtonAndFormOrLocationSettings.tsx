import React, { useState } from 'react'
import type { SectionEditorProps } from '../../SectionSettings'
import SubSettingsContainer from '../../../extras/SubSettingsContainer'
import BackgroundEditor from '../../../background/BackgroundEditor'
import OptionsToggler from '../../../supporting/OptionsToggler'
import { getSetting } from '../../../../../utils/helperFunctions'
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer'
import { AnimatePresence } from 'framer-motion'
import SlidingPanel from '../../../supporting/SlidingPanel'
import TextEditor from '../../../text/TextEditor'
import InputHandler from '../../../supporting/InputHandler'
import StoreButtonSettings from '../../../extras/StoreButtonSettings'
import SendEmailFormSettings from '../../../forms/SendEmailFormSettings'

const FooterWithStoreDetailsButtonAndFormOrLocationSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = 'footer'
    const [activePanel, setActivePanel] = useState<string | null>(null)
    const closePanel = () => setActivePanel(null)
    
    return (
        <div className='text-[2vh] space-y-[.5vh]'>
            {/* Show */}
            <div className="px-[1vh]">
                <OptionsToggler
                    label='Show'
                    options={["location", "form"]}
                    value={getSetting('show', settings, objectPath)}
                    onChange={(value) => handleSettingChange(`${objectPath}.show`, value)}
                />
            </div>
            {/* Background Settings */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                <div className="px-[.8vh] space-y-[.5vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["color", "width", "padding", "shadow"]}
                        widthUnit="%"
                        heightUnit="%"
                        responsiveSize
                    />
                </div>
                }
            />
            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Text"
                onClick={() => setActivePanel("text")}
            />
            {/* Location */}
            {settings.footer.show === 'location' && (
                <FirstOrderSubSettingsContainer
                    name="Location"
                    onClick={() => setActivePanel("location")}
                />
            )}
            {/* Form */}
            {settings.footer.show === 'form' && (
                <FirstOrderSubSettingsContainer
                    name="Form"
                    onClick={() => setActivePanel("form")}
                />
            )}
            <FirstOrderSubSettingsContainer
                name="Button"
                onClick={() => setActivePanel("button")}
            />
            <AnimatePresence>
                {activePanel === "text" && (
                    <SlidingPanel
                        key="button"
                        isOpen={true}
                        onClose={closePanel}
                        title="Text"
                    >
                        <div className="space-y-[.5vh]">
                            <FirstOrderSubSettingsContainer
                                name="Heading"
                                onClick={() => setActivePanel("heading")}
                            />
                            <FirstOrderSubSettingsContainer
                                name="Details"
                                onClick={() => setActivePanel("details")}
                            />  
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "heading" && (
                    <SlidingPanel
                        key="heading"
                        isOpen={true}
                        onClose={closePanel}
                        title="Heading Text Settings"
                    >
                        <TextEditor
                            objectPath={`${objectPath}.title.text`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={[ "color", "input", "fontFamily", "textDecoration", "fontSize", "weight", "lineHeight", "animation", "letterSpacing" ]}
                            responsiveSize
                        />
                    </SlidingPanel>
                )}
                {activePanel === "details" && (
                    <SlidingPanel
                        key="heading"
                        isOpen={true}
                        onClose={closePanel}
                        title="Details Text Settings"
                    >
                        <div className="space-y-[.5vh]">
                            <div className="border-[.15vh] p-[.5vh] rounded text-center space-y-[.5vh]">
                                <label htmlFor="footer_input" className="font-bold text-[1.5vh]">Headers inputs</label>
                                <InputHandler
                                    label="address"
                                    value={getSetting("inputs.address", settings, objectPath)}
                                    onChange={(value) => handleSettingChange(`${objectPath}.inputs.address`, value)}
                                /> 
                                <InputHandler
                                    label="contact"
                                    value={getSetting("inputs.contact", settings, objectPath)}
                                    onChange={(value) => handleSettingChange(`${objectPath}.inputs.contact`, value)}
                                /> 
                                <InputHandler
                                    label="Opening Hours"
                                    value={getSetting("inputs.openingHours", settings, objectPath)}
                                    onChange={(value) => handleSettingChange(`${objectPath}.inputs.openingHours`, value)}
                                />  
                            </div>
                            <FirstOrderSubSettingsContainer
                                name="Heading"
                                onClick={() => setActivePanel("details_heading")}
                            />
                            <FirstOrderSubSettingsContainer
                                name="Details"
                                onClick={() => setActivePanel("details_details")}
                            />
                        </div>
                    </SlidingPanel> 
                )}
                {activePanel === "details_heading" && (
                    <SlidingPanel
                        key="details_heading"
                        isOpen={true}
                        onClose={closePanel}
                        title="Deatils Heading Settings"
                    >
                        <TextEditor
                            objectPath={`${objectPath}.detailsTitle`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={[ "color", "fontFamily", "fontSize", "weight", "textDecoration", "animation", "letterSpacing" ]}
                            responsiveSize
                        />
                    </SlidingPanel>
                )}
                {activePanel === "details_details" && (
                    <SlidingPanel
                        key="details_details"
                        isOpen={true}
                        onClose={closePanel}
                        title="Details Details Settings"
                    >
                        <TextEditor
                            objectPath={`${objectPath}.detailsText`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={[ "color", "fontFamily", "fontSize", "weight", "textDecoration", "animation", "letterSpacing" ]}
                            responsiveSize
                        />
                    </SlidingPanel>
                )}
                {activePanel === "location" && (
                    <SlidingPanel
                        key="location"
                        isOpen={true}
                        onClose={closePanel}
                        title="Location Settings"
                    >
                        <BackgroundEditor
                            objectPath={`${objectPath}.location`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["height", "width", "border"]}
                            widthUnit="%"
                            heightUnit="%"
                            responsiveSize
                        />
                    </SlidingPanel>
                )}
                {activePanel === "button" && (
                    <SlidingPanel
                        key="button"
                        isOpen={true}
                        onClose={closePanel}
                        title="Footer Button Settings"
                    >
                        <StoreButtonSettings 
                            objectPath={`${objectPath}.button`}
                            settings={settings}
                        />
                    </SlidingPanel>
                )}
                {activePanel === "form" && (
                    <SlidingPanel
                        key="form"
                        isOpen={true}
                        onClose={closePanel}
                        title="Footer Form Settings"
                    >
                        <SendEmailFormSettings 
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.sendEmailForm`}
                            variation={settings.footer.sendEmailForm.variation} 
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FooterWithStoreDetailsButtonAndFormOrLocationSettings