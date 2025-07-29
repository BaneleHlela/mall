import React, { useState } from 'react'
import type { SupportingSettingsProps } from './SupportingImagesSettings'
import SubSettingsContainer from '../../../extras/SubSettingsContainer'
import TextEditor from '../../../text/TextEditor'
import BackgroundEditor from '../../../background/BackgroundEditor'
import ResponsiveGridSettings from '../../../extras/ResponsiveGridSettings'
import { getSetting } from '../../../../../utils/helperFunctions'
import BorderEditor from '../../../background/BorderEditor'
import SlidingPanel from '../../../supporting/SlidingPanel'
import OptionsToggler from '../../../supporting/OptionsToggler'
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer'
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings'
import { AnimatePresence } from 'framer-motion'

const GalleryThumbnailSettings: React.FC<SupportingSettingsProps> = ({
    settings,
    handleSettingChange,
    objectPath,
}) => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
  return (
    <div className='space-y-1'>
        {/* Toggle Buttons */}
        
        <SubSettingsContainer
            name="Grid"
            SettingsComponent={
                <div>
                    <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                        <OptionsToggler
                            label="Mobile stack"
                            options={["horizontal", "vertical"]}
                            value={getSetting("imagesModal.grids.thumbnail.stack.mobile", settings, objectPath)}
                            onChange={(value) => handleSettingChange(`${objectPath}.imagesModal.grids.thumbnail.stack.mobile`, value)}
                        />
                        <OptionsToggler
                            label="Desktop Stack"
                            options={["horizontal", "vertical"]}
                            value={getSetting("imagesModal.grids.thumbnail.stack.desktop", settings, objectPath)}
                            onChange={(value) => handleSettingChange(`${objectPath}.imagesModal.grids.thumbnail.stack.desktop`, value)}
                        />
                    </div>
                    <ResponsiveGridSettings
                        objectPath={`${objectPath}.imagesModal.grids.thumbnail`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        columnOptions={{
                            mobile: ['1', '2'],
                            desktop: ['1', '2', '3', '4', '5']
                        }}
                        gapRange={{
                            mobile: { min: 0, max: 50 },
                            desktop: { min: 0, max: 100 }
                        }}
                    />
                </div>
                
            }
        />
        <FirstOrderSubSettingsContainer
            name="Text"
            onClick={() => setActivePanel("Text")}
        />
        {((getSetting("imagesModal.grids.thumbnail.stack.mobile", settings, objectPath) === "horizontal") ||
            (getSetting("imagesModal.grids.thumbnail.stack.desktop", settings, objectPath) === "horizontal"))
            &&
            (
                <FirstOrderSubSettingsContainer
                    name="Toggle Buttons"
                    onClick={() => setActivePanel("toggle_buttons")}
                />
        )}
        {((getSetting("imagesModal.grids.thumbnail.stack.mobile", settings, objectPath) === "horizontal") ||
            (getSetting("imagesModal.grids.thumbnail.stack.desktop", settings, objectPath) === "horizontal"))
            &&
            (
                <FirstOrderSubSettingsContainer
                    name="Step Indicator"
                    onClick={() => setActivePanel("step_indicator")}
                />
        )}
        {/* Background */}
        <SubSettingsContainer
            name="Background"
            SettingsComponent={
            <div className="px-2 space-y-2">
                <BackgroundEditor
                    objectPath={`${objectPath}.imagesModal.background.thumbnail`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["color", "border"]}
                    heightUnit='vh'
                    responsiveSize
                />
            </div>
            }
        />
        {/* Background */}
        <SubSettingsContainer
            name="Image"
            SettingsComponent={
            <div className="px-2 space-y-2">
                <BackgroundEditor
                    objectPath={`${objectPath}.imagesModal.background.image`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["height", "border"]}
                    heightUnit='vh'
                    responsiveSize
                />
            </div>
            }
        />
        <AnimatePresence>
            {activePanel === "Text" && (
                <SlidingPanel
                    key="text" isOpen={true} onClose={closePanel} title="Text Settings"
                >
                    <div className="space-y-[.3vh]">
                        {/* Text */}
                        <FirstOrderSubSettingsContainer
                            name="Group Name"
                            onClick={() => setActivePanel("group_name")}
                        />
                        {/* Description */}
                        {!settings.gallery.imagesModal.addModal && (
                            <FirstOrderSubSettingsContainer
                                name="Group Description"
                                onClick={() => setActivePanel("group_description")}
                            />
                        )}
                    </div>
                    
                </SlidingPanel>
            )}
            {activePanel === "group_name" && (
                <SlidingPanel key="group_name" isOpen={true} onClose={() => setActivePanel("Text")} title="Name Settings">
                    <div className="space-y-[.3vh]">
                        <UnderlinedTextSettings
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.text.groupName`}
                            allowInput
                            responsiveSize
                        />
                    </div>
                </SlidingPanel>
            )}
            {activePanel === "group_description" && settings.gallery.imagesModal.addModal && (
                <SlidingPanel key="group_description" isOpen={true} onClose={() => setActivePanel("Text")} title="Description Settings">
                    <div className="space-y-[.3vh]">
                        <UnderlinedTextSettings
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.text.groupDescription`}
                            allowInput
                        />
                    </div>
                </SlidingPanel>
            )}
        </AnimatePresence>
        
        {!settings.gallery.imagesModal.addModal && (
            <SubSettingsContainer
                name="Description"
                SettingsComponent={
                    <TextEditor
                        objectPath={`${objectPath}.imagesModal.text.description`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={[ "color", "fontFamily", "fontSize", "weight", "lineHeight", "animation", "letterSpacing" ]}
                    />
                }
            />
        )}
        
        {activePanel === "toggle_buttons" && 
            ((getSetting("imagesModal.grids.thumbnail.stack.mobile", settings, objectPath) === "horizontal") ||
            (getSetting("imagesModal.grids.thumbnail.stack.desktop", settings, objectPath) === "horizontal"))
            && (
            <SlidingPanel  key="toggle_buttons" isOpen={true} onClose={closePanel} title="Toggle Buttons Settings">
                <TextEditor
                    objectPath={`${objectPath}.imagesModal.toggleButtons`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["backgroundColor", "padding", "fontSize", "color"]}
                />
                <BorderEditor
                    objectPath={`${objectPath}.imagesModal.toggleButtons.background.border`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                />
            </SlidingPanel>
        )}
        {activePanel === "step_indicator" && 
            ((getSetting("imagesModal.grids.thumbnail.stack.mobile", settings, objectPath) === "horizontal") ||
            (getSetting("imagesModal.grids.thumbnail.stack.desktop", settings, objectPath) === "horizontal"))
            && (
            <SlidingPanel  key="step_indicator" isOpen={true} onClose={closePanel} title="Step Indicator Settings">
                <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                    <OptionsToggler
                        label="Use"
                        options={["dots", "digits"]}
                        value={getSetting("imagesModal.stepIndicator.use", settings, objectPath)}
                        onChange={(value) => handleSettingChange(`${objectPath}.imagesModal.stepIndicator.use`, value)}
                    />
                </div>
                {settings.gallery.imagesModal.stepIndicator.use === "digits" && (
                    <TextEditor
                        objectPath={`${objectPath}.imagesModal.stepIndicator.text`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["position", "fontFamily", "backgroundColor", "padding", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "textDecoration"]}
                    />
                )}
                {settings.gallery.imagesModal.stepIndicator.use === "dots" && (
                    <BackgroundEditor
                        objectPath={`${objectPath}.imagesModal.stepIndicator.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["height", "border", "color"]}
                        heightUnit='px'
                        responsiveSize
                    />
                )}  
            </SlidingPanel>
        )}
    </div>
  )
}

export default GalleryThumbnailSettings