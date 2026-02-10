import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import LayoutColorSelector from "../../../extras/LayoutColorSelector";
import LayoutFontsSelector from "../../../extras/LayoutFontsSelector";
import ResponsiveGridSettings from "../../../extras/ResponsiveGridSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import UnderlinedTextSettings from "../../../extras/text/UnderlinedTextSettings";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import OptionsToggler from "../../../supporting/OptionsToggler";
import SlidingPanel from "../../../supporting/SlidingPanel";
import TextEditor from "../../../text/TextEditor";
import type { SectionEditorProps } from "../../SectionSettings";
import PopularPackageCardSettings from "./supporting/cards/PopularPackageCardSettings";



const PopularStorePackagesSectionsSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath ='sections.packages';
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
                            allow={["width", "color", "padding", "image"]}
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
            
            {/* Category Selector */}
            <FirstOrderSubSettingsContainer
                name="Category Selector"
                onClick={() => setActivePanel("categorySelector")}
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
                            {/* Heading */}
                            <FirstOrderSubSettingsContainer
                                name="Heading"
                                onClick={() => setActivePanel("heading")}
                            />
                            {/* Subheading */}
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
                    <SlidingPanel key="subheading" isOpen={true} onClose={() => setActivePanel("Text")} title="Subheading Settings">
                        <div className="space-y-[.3vh]">
                            <TextEditor
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                objectPath={`${objectPath}.text.subheading`}
                                responsiveSize
                                responsivePadding
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "categorySelector" && (
                    <SlidingPanel key="categorySelector" isOpen={true} onClose={closePanel} title="Category Selector">
                    <div className="space-y-[.3vh]">
                        <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={getSetting("categorySelector.show", settings, objectPath)}
                                    onChange={(e) => handleSettingChange(`${objectPath}.categorySelector.show`, e.target.checked)}
                                />
                                <label>Show Category Selector</label>
                            </div>
                        </div>
                        <TextEditor
                            objectPath={`${objectPath}.categorySelector.text`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["fontFamily", "color", "textAlign", "weight", "fontSize", "padding"]}
                            responsivePadding
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
                                name="Container (Background for all cards)"
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
                {activePanel === "card" && (
                    <SlidingPanel key="card" isOpen={true} onClose={() => setActivePanel("cards")} title="Card Settings">
                        <PopularPackageCardSettings settings={settings} handleSettingChange={handleSettingChange}/>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default PopularStorePackagesSectionsSettings
