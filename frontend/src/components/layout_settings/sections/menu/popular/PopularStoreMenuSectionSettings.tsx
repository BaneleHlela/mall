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
import BorderEditor from '../../../background/BorderEditor';
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings';
import PopularStoreMenuCardSettings from '../supporting/cards/PopularStoreMenuCardSettings';


const PopularStoreMenuSectionSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath ='sections.menu';
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    
    return (
        <div className='space-y-[.3vh]'>
            {/* Background Settings */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <div className="px-[.8vh] space-y-[.7vh]">
                        <BackgroundEditor
                            objectPath={`${objectPath}.background`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["width", "color", "padding",]}
                            widthUnit="%"
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
            <FirstOrderSubSettingsContainer
                name="Category Selector"
                onClick={() => setActivePanel("categorySelector")}
            />
            <FirstOrderSubSettingsContainer
                name="Category Divider"
                onClick={() => setActivePanel("categoryDivider")}
            />
            
            {/* Cards */}
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
                            <UnderlinedTextSettings
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                objectPath={`${objectPath}.text.heading`}
                                allowInput
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "subheading" && (
                    <SlidingPanel key="subheading" isOpen={true} onClose={() => setActivePanel("Text")} title="subheading Settings">
                        <div className="space-y-[.3vh]">
                            <UnderlinedTextSettings
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                objectPath={`${objectPath}.text.subheading`}
                                allowInput
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "cards" && (
                    <SlidingPanel key="card" isOpen={true} onClose={closePanel} title="Cards Settings">
                        <div className="space-y-[.3vh]">
                            {/* Container */}
                            <FirstOrderSubSettingsContainer
                                name="Contaner (Background for all cards)"
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
                    <SlidingPanel key="container" isOpen={true} onClose={() => setActivePanel("cards")} title="Container Settings">
                        <div className="space-y-[.3vh]">
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
                                    <>
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
                                    </> 
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "categorySelector" && (
                    <SlidingPanel key="categorySelector" isOpen={true} onClose={closePanel} title="Category Selector">
                        <div className="space-y-[.3vh] border-[.15vh] rounded-[.6vh]">
                            <div className="px-[.65vh]">
                                <OptionsToggler
                                    label="Show"
                                    options={["Yes", "No"]}
                                    value={getSetting("categorySelector.show", settings, objectPath) ? "Yes" : "No"}
                                    onChange={(newValue) =>
                                        handleSettingChange(`${objectPath}.categorySelector.show`, newValue === "Yes")
                                    }
                                />
                            </div>
                            <SubSettingsContainer
                                name="Width"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.categorySelector`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["width"]}
                                        widthUnit='%'
                                        responsiveSize
                                    />
                                }
                            />
                        </div>
                        <div className="space-y-[.3vh]">
                             <SubSettingsContainer
                                 name="Text"
                                 SettingsComponent={
                                     <TextEditor
                                         objectPath={`${objectPath}.categorySelector.text`}
                                         settings={settings}
                                         handleSettingChange={handleSettingChange}
                                         allow={["fontFamily", "fontSize", "color", "weight"]}
                                         responsiveSize
                                     />
                                 }
                             />
                             <SubSettingsContainer
                                 name="Selected Color"
                                 SettingsComponent={
                                     <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                         <OptionsToggler
                                             label="Selected Color"
                                             options={["primary", "secondary", "accent", "quad", "pent"]}
                                             value={getSetting("categorySelector.selectedColor", settings, objectPath)}
                                             onChange={(newValue) => handleSettingChange(`${objectPath}.categorySelector.selectedColor`, newValue)}
                                         />
                                     </div>
                                 }
                             />
                         </div>
                    </SlidingPanel>
                )}
                {activePanel === "categoryDivider" && (
                    <SlidingPanel key="categoryDivider" isOpen={true} onClose={closePanel} title="Category Divider">
                        <div className="space-y-[.3vh]">
                            <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={getSetting("categoryDivider.show", settings, objectPath)}
                                        onChange={(e) => handleSettingChange(`${objectPath}.categoryDivider.show`, e.target.checked)}
                                    />
                                    <label>Show Category Divider</label>
                                </div>
                            </div>
                            <TextEditor
                                objectPath={`${objectPath}.categoryDivider`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["fontFamily", "color", "textAlign", "weight", "fontSize", "padding"]}
                                responsivePadding
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "card" && (
                    <SlidingPanel key="card" isOpen={true} onClose={() => setActivePanel("cards")} title="Card Settings">
                        <PopularStoreMenuCardSettings settings={settings} handleSettingChange={handleSettingChange}/>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PopularStoreMenuSectionSettings
