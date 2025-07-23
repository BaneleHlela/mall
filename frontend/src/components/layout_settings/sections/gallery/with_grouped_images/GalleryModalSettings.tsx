import React, { useState } from 'react'
import type { SupportingSettingsProps } from './SupportingImagesSettings'
import SubSettingsContainer from '../../../extras/SubSettingsContainer'
import TextEditor from '../../../text/TextEditor'
import BackgroundEditor from '../../../background/BackgroundEditor'
import ResponsiveGridSettings from '../../../extras/ResponsiveGridSettings'
import { getSetting } from '../../../../../utils/helperFunctions'
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer'
import SlidingPanel from '../../../supporting/SlidingPanel'
import BorderEditor from '../../../background/BorderEditor'
import OptionsToggler from '../../../supporting/OptionsToggler'
import { AnimatePresence } from 'framer-motion'
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings'

const GalleryModalSettings: React.FC<SupportingSettingsProps> = ({
    settings,
    handleSettingChange,
    objectPath,
}) => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
  return (
    <div className='space-y-[.3vh]'>
        <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
            <OptionsToggler
                label="Use Modal"
                options={["yes", "no"]}
                value={getSetting("imagesModal.addModal", settings, objectPath) ? "yes" : "no"}
                onChange={(value) => handleSettingChange(`${objectPath}.imagesModal.addModal`, value === "yes")}
            />
        </div>
        
        <SubSettingsContainer
                name="Grid"
                SettingsComponent={
                    <div>
                        <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                            <OptionsToggler
                                label="Mobile Stack"
                                options={["horizontal", "vertical"]}
                                value={getSetting("imagesModal.grids.modal.stack.mobile", settings, objectPath)}
                                onChange={(value) => handleSettingChange(`${objectPath}.imagesModal.grids.modal.stack.mobile`, value)}
                            />
                            <OptionsToggler
                                label="Desktop Stack"
                                options={["horizontal", "vertical"]}
                                value={getSetting("imagesModal.grids.modal.stack.desktop", settings, objectPath)}
                                onChange={(value) => handleSettingChange(`${objectPath}.imagesModal.grids.modal.stack.desktop`, value)}
                            />
                        </div>
                        <ResponsiveGridSettings
                            objectPath={`${objectPath}.imagesModal.grids.modal`}
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
         {((getSetting("imagesModal.grids.modal.stack.mobile", settings, objectPath) === "horizontal") ||
            (getSetting("imagesModal.grids.modal.stack.desktop", settings, objectPath) === "horizontal"))
            &&
            (
                <FirstOrderSubSettingsContainer
                    name="Toggle Buttons"
                    onClick={() => setActivePanel("toggle_buttons")}
                />
        )}
        {/* Background */}
        <SubSettingsContainer
            name="Background"
            SettingsComponent={
            <div className="px-2 space-y-2">
                <BackgroundEditor
                    objectPath={`${objectPath}.imagesModal.background.modal`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["color"]}
                    heightUnit='vh'
                    widthUnit='vw'
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
        {/* Background */}
        <SubSettingsContainer
            name="Image"
            SettingsComponent={
            <div className="px-2 space-y-2">
                <BackgroundEditor
                    objectPath={`${objectPath}.imagesModal.background.modalImage`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["height", "border"]}
                    heightUnit='vh'
                    responsiveSize
                />
            </div>
            }
        />
        {activePanel === "toggle_buttons" && 
            ((getSetting("imagesModal.grids.modal.stack.mobile", settings, objectPath) === "horizontal") ||
            (getSetting("imagesModal.grids.modal.stack.desktop", settings, objectPath) === "horizontal"))
            && (
            <SlidingPanel  key="toggle_buttons" isOpen={true} onClose={closePanel} title="Toggle Buttons Settings">
                <TextEditor
                    objectPath={`${objectPath}.imagesModal.toggleButtons`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["position", "fontFamily", "backgroundColor", "padding", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "textDecoration"]}
                />
                <BorderEditor
                    objectPath={`${objectPath}.imagesModal.toggleButtons.background.border`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                />
            </SlidingPanel>
        )}
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
                        {/* Text */}
                        <FirstOrderSubSettingsContainer
                            name="Group Description"
                            onClick={() => setActivePanel("group_description")}
                        />
                    </div>
                    
                </SlidingPanel>
            )}
            {activePanel === "group_name" && (
                <SlidingPanel key="group_name" isOpen={true} onClose={() => setActivePanel("Text")} title="Name Settings">
                    <div className="space-y-[.3vh]">
                        <UnderlinedTextSettings
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.imagesModal.text.groupName`}
                            allowInput
                        />
                    </div>
                </SlidingPanel>
            )}
            {activePanel === "group_description" && (
                <SlidingPanel key="group_description" isOpen={true} onClose={() => setActivePanel("Text")} title="Description Settings">
                    <div className="space-y-[.3vh]">
                        <UnderlinedTextSettings
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.imagesModal.text.groupDescription`}
                            allowInput
                        />
                    </div>
                </SlidingPanel>
            )}
        </AnimatePresence>
    </div>
  )
}

export default GalleryModalSettings