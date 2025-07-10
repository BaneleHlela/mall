import React, { useState } from 'react'
import type { SectionEditorProps } from '../../SectionSettings'
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import TextEditor from '../../../text/TextEditor';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../../supporting/SlidingPanel';
import OptionsToggler from '../../../supporting/OptionsToggler';
import { getSetting } from '../../../../../utils/helperFunctions';
import SettingsSlider from '../../../supporting/SettingsSlider';
import ServiceCardSettings from '../cards/ServiceCardSettings';
import ResponsiveGridSettings from '../../../extras/ResponsiveGridSettings';

const FirstStoreServicesSectionSettings: React.FC<SectionEditorProps> = ({
    settings,
    handleSettingChange
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
                        allow={["width", "color"]}
                        widthUnit="%"
                        responsiveSize
                        />
                    </div>
                }
            />
            <SubSettingsContainer
                name="Grid"
                SettingsComponent={
                    <ResponsiveGridSettings
                        objectPath={`${objectPath}.servicesDisplay.grid`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        columnOptions={{
                            mobile: ['1', '2'],
                            desktop: ['3', '4', '5']
                        }}
                        gapRange={{
                            mobile: { min: 0, max: 50 },
                            desktop: { min: 0, max: 100 }
                        }}
                    />
                }
            />
            <FirstOrderSubSettingsContainer
                name="Heading"
                onClick={() => setActivePanel("Heading")}
            />
            <FirstOrderSubSettingsContainer
                name="Category Selector"
                onClick={() => setActivePanel("categorySelector")}
            />
            <FirstOrderSubSettingsContainer
                name="Card"
                onClick={() => setActivePanel("Card")}
            />
            <AnimatePresence>
                {activePanel === "Heading" && (
                    <SlidingPanel key="heading" isOpen={true} onClose={closePanel} title="Heading Settings">
                        <div className="space-y-1">
                            <SubSettingsContainer
                                name="Heading"
                                SettingsComponent={
                                    <TextEditor
                                        objectPath={`${objectPath}.header.text`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["input", "fontFamily", "fontSize", "color", "weight", "fontStyle", "letterSpacing", "textTransform", "lineHeight", "textDecoration"]}
                                        responsiveSize
                                    />
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "categorySelector" && (
                    <SlidingPanel key="categorySelector" isOpen={true} onClose={closePanel} title="Category Selector">
                        <div className="space-y-1">
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
                        </div>
                        <div className="space-y-1">
                            <BackgroundEditor
                                objectPath={`${objectPath}.categorySelector`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["width"]}
                                widthUnit='%'
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "Card" && (
                    <SlidingPanel key="Card" isOpen={true} onClose={closePanel} title="Service Card Settings">
                        <ServiceCardSettings settings={settings} handleSettingChange={handleSettingChange}/>
                    </SlidingPanel>
                )}
            </AnimatePresence>
           
        </div>
    )
}

export default FirstStoreServicesSectionSettings