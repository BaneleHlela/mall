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
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings'
import MultipleLayoutImagesHandler from '../../../supporting/MultipleLayoutImagesHandler'

const FooterWithStoreDetailsButtonAndFormOrLocationSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = 'sections.footer'
    const [activePanel, setActivePanel] = useState<string | null>(null)
    const closePanel = () => setActivePanel(null)
    
    console.log(getSetting('show', settings, objectPath))

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
                        responsivePadding
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
            {settings.sections.footer.show === 'location' && (
                <FirstOrderSubSettingsContainer
                    name="Location"
                    onClick={() => setActivePanel("location")}
                />
            )}
            {/* Form */}
            {settings.sections.footer.show === 'form' && (
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
                        key="text"
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
                        onClose={() => setActivePanel('text')}
                        title="Heading Text Settings"
                    >
                        <UnderlinedTextSettings
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.title.text`}
                            allowInput
                            responsiveSize
                        />
                    </SlidingPanel>
                )}
                {activePanel === "details" && (
                    <SlidingPanel
                        key="heading"
                        isOpen={true}
                        onClose={() => setActivePanel('text')}
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
                                name="Title"
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
                            allow={[ "color", "fontFamily", "fontSize", "weight", "textDecoration", "animation", "letterSpacing", "textTransform", "fontStyle" ]}
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
                            allow={[ "color", "textArea",  "fontFamily", "fontSize", "weight", "textDecoration", "animation", "letterSpacing" ]}
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
                        <div className="space-y-[.5vh]">
                            <BackgroundEditor
                                objectPath={`${objectPath}.location`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["height", "width", "border"]}
                                widthUnit="%"
                                heightUnit="%"
                                responsiveSize
                            />
                            {/* InfoWindow Image Settings */}
                            <FirstOrderSubSettingsContainer
                                name="InfoWindow Image"
                                onClick={() => setActivePanel("locationImage")}
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "locationImage" && (
                    <SlidingPanel
                        key="locationImage"
                        isOpen={true}
                        onClose={() => setActivePanel("location")}
                        title="InfoWindow Image Settings"
                    >
                        <div className="space-y-[.5vh]">
                            {/* Image URL Handler */}
                            <SubSettingsContainer
                                name="Image"
                                SettingsComponent={
                                    <MultipleLayoutImagesHandler
                                        objectPath={`${objectPath}.location.image.url`}
                                        min={0}
                                        max={1}
                                        images={getSetting("location.image.url", settings, objectPath) || []}
                                    />
                                }
                            />
                            {/* Image Background (height/width) */}
                            <SubSettingsContainer
                                name="Image Size"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.location.image.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["height", "width"]}
                                    />
                                }
                            />
                        </div>
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
                            allowSimpleShow
                            allowFunction
                            responsiveBackground
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
                            variation={settings.sections.footer.sendEmailForm.variation} 
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FooterWithStoreDetailsButtonAndFormOrLocationSettings