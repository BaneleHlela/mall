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
import PopularRentalCardSettings from '../supporting/cards/PopularRentalCardSettings';
import BorderEditor from '../../../background/BorderEditor';
import { Underline } from 'lucide-react';
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings';
import ColorPicker from '../../../supporting/ColorPicker';
import StoreRentalsSectionBookingModalSettings from '../shared_rental_section_components/StoreRentalsSectionBookingModalSettings';


const PopularRentalsSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath ='sections.rentals';
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
            
            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Cards"
                onClick={() => setActivePanel("cards")}
            />
            <FirstOrderSubSettingsContainer
                name="Booking Modal"
                onClick={() => setActivePanel("bookingModal")}
            />
            <FirstOrderSubSettingsContainer
                name="Toggle Buttons"
                onClick={() => setActivePanel("main_toggle_buttons")}
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
                            <TextEditor
                              settings={settings}
                              handleSettingChange={handleSettingChange}
                              objectPath={`${objectPath}.text.subheading`}
                              useQuill
                              responsiveSize
                              responsivePadding
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
                            {/* Toggle Buttons */}
                            {((getSetting("stack.mobile", settings, objectPath) === "horizontal") ||
                                (getSetting("stack.desktop", settings, objectPath) === "horizontal")) && 
                                (
                                    <FirstOrderSubSettingsContainer
                                        name="Toggle Buttons"
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
                            objectPath={`${objectPath}.grid.container.toggleButtons`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["position", "fontFamily", "backgroundColor", "padding", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "textDecoration"]}
                        />
                        <BorderEditor
                            objectPath={`${objectPath}.grid.container.toggleButtons.background.border`}
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
                        {getSetting("grid.container.stepIndicator.use", settings, objectPath) === "digits" && (
                            <TextEditor
                                objectPath={`${objectPath}.grid.container.stepIndicator.text`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["position", "fontFamily", "backgroundColor", "padding", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "textDecoration"]}
                            />
                        )}
                        {getSetting("grid.container.stepIndicator.use", settings, objectPath) === "dots" && (
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
                {activePanel === "card" && (
                    <SlidingPanel key="card" isOpen={true} onClose={() => setActivePanel("cards")} title="Card Settings">
                        <PopularRentalCardSettings settings={settings} handleSettingChange={handleSettingChange}/>
                    </SlidingPanel>
                )}
                {activePanel === "bookingModal" && (
                    <SlidingPanel key="bookingModal" isOpen={true} onClose={closePanel} title="Booking Modal Settings">
                        <StoreRentalsSectionBookingModalSettings settings={settings} handleSettingChange={handleSettingChange}/>
                    </SlidingPanel>
                )}
                {activePanel === "main_toggle_buttons" && (
                    <SlidingPanel key="main_toggle_buttons" isOpen={true} onClose={closePanel} title="Main Toggle Buttons Settings">
                        <TextEditor
                            objectPath={`${objectPath}.toggleButtons`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["color", "backgroundColor", "fontSize"]}
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PopularRentalsSettings