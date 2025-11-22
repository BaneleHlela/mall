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
import PopularProductCard from '../../../../store_layout/extras/cards/product/popular/PopularProductCard';
import PopularProductCardSettings from '../supporting/cards/PopularProductCardSettings';
import BorderEditor from '../../../background/BorderEditor';
import { Underline } from 'lucide-react';
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings';
import ColorPicker from '../../../supporting/ColorPicker';


const PopularProductsSectionSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath ='products';
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
                        {settings.products.grid.container.stepIndicator.use === "digits" && (
                            <TextEditor
                                objectPath={`${objectPath}.grid.container.stepIndicator.text`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["position", "fontFamily", "backgroundColor", "padding", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "textDecoration"]}
                            />
                        )}
                        {settings.products.grid.container.stepIndicator.use === "dots" && (
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
                            <BackgroundEditor
                                objectPath={`${objectPath}.categorySelector`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["width", "color", "padding"]}
                                widthUnit='%'
                                responsiveSize
                                responsivePadding
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
                                         allow={["fontFamily", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "lineHeight", "textDecoration"]}
                                         responsiveSize
                                     />
                                 }
                             />
                             <SubSettingsContainer
                                 name="Border"
                                 SettingsComponent={
                                     <BorderEditor
                                         objectPath={`${objectPath}.categorySelector.border`}
                                         settings={settings}
                                         handleSettingChange={handleSettingChange}
                                     />
                                 }
                             />
                             <SubSettingsContainer
                                name="Colors"
                                SettingsComponent={
                                    <div className="space-y-[.3vh]">
                                        <ColorPicker
                                            label="Selected Color"
                                            value={getSetting("categorySelector.selectedColor.color", settings, objectPath)}
                                            onChange={(newValue) => handleSettingChange(`${objectPath}.categorySelector.selectedColor.color`, newValue)}
                                            onClear={() => handleSettingChange(`${objectPath}.categorySelector.selectedColor.color`, "transparent")}
                                        />
                                        <ColorPicker
                                            label="Unselected Color"
                                            value={getSetting("categorySelector.unselectedColor.color", settings, objectPath)}
                                            onChange={(newValue) => handleSettingChange(`${objectPath}.categorySelector.unselectedColor.color`, newValue)}
                                            onClear={() => handleSettingChange(`${objectPath}.categorySelector.unselectedColor.color`, "transparent")}
                                        />
                                        <ColorPicker
                                            label="Underline Color"
                                            value={getSetting("categorySelector.underlineColor.color", settings, objectPath)}
                                            onChange={(newValue) => handleSettingChange(`${objectPath}.categorySelector.underlineColor.color`, newValue)}
                                            onClear={() => handleSettingChange(`${objectPath}.categorySelector.underlineColor.color`, "transparent")}
                                        />
                                    </div>
                                }
                            />

                             <SubSettingsContainer
                                 name="Layout"
                                 SettingsComponent={
                                     <div className="space-y-[.3vh]">
                                         <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                                             <OptionsToggler
                                                 label="Alignment"
                                                 options={["space-between", "center", "start", "end"]}
                                                 value={getSetting("alignment", settings, `${objectPath}.categorySelector`)}
                                                 onChange={(value) => handleSettingChange(`${objectPath}.categorySelector.alignment`, value)}
                                             />
                                         </div>
                                         <BackgroundEditor
                                             objectPath={`${objectPath}.categorySelector.spacing`}
                                             settings={settings}
                                             handleSettingChange={handleSettingChange}
                                             allow={["padding"]}
                                             responsivePadding
                                         />
                                     </div>
                                 }
                             />
                         </div>
                    </SlidingPanel>
                )}
                {activePanel === "card" && (
                    <SlidingPanel key="card" isOpen={true} onClose={() => setActivePanel("cards")} title="Card Settings">
                        <PopularProductCardSettings settings={settings} handleSettingChange={handleSettingChange}/>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PopularProductsSectionSettings