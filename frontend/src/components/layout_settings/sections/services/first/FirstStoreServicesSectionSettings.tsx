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
                    <div className='px-1 space-y-2 py-1'>
                        {/* Grid Columns */}
                        <div className="border rounded px-1 text-center">
                        <label className="block text-sm font-medium text-gray-700">Grid Columns</label>
                            {/* Grid Columns for Mobile */}
                            <div className="space-y-1">
                                <OptionsToggler
                                    label="Mobile"
                                    options={["1", "2"]}
                                    value={getSetting('mobile', settings, `${objectPath}.servicesDisplay.grid.columns`).toString()}
                                    onChange={(value) =>
                                        handleSettingChange(
                                            `${objectPath}.servicesDisplay.grid.columns.mobile`,
                                            parseInt(value)
                                        )
                                    }
                                />
                            </div>

                            {/* Grid Columns for Desktop */}
                            <div className="space-y-1">
                                <OptionsToggler
                                    label="Desktop"
                                    options={["3", "4", "5"]}
                                    value={getSetting('desktop', settings, `${objectPath}.servicesDisplay.grid.columns`).toString()}
                                    onChange={(value) =>
                                        handleSettingChange(
                                            `${objectPath}.servicesDisplay.grid.columns.desktop`,
                                            parseInt(value)
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="space-y-1 border rounded px-1 text-center">
                            <label className="block text-sm font-medium text-gray-700">Grid Gap</label>
                            {/* Mobile Grid Gap */}
                            <div className="space-y-2">
                                <SettingsSlider
                                    label="Mobile Gap"
                                    value={parseInt(getSetting('mobile', settings, `${objectPath}.servicesDisplay.grid.gap`))}
                                    unit="px"
                                    min={0}
                                    max={50}
                                    step={1}
                                    onChange={(newValue) =>
                                        handleSettingChange(
                                        `${objectPath}.servicesDisplay.grid.gap.mobile`,
                                        `${newValue}px`
                                        )
                                    }
                                />
                            </div>

                            {/* Desktop Grid Gap */}
                            <div className="space-y-2">
                                <SettingsSlider
                                    label="Desktop Gap"
                                    value={parseInt(getSetting('desktop', settings, `${objectPath}.servicesDisplay.grid.gap`))}
                                    unit="px"
                                    min={0}
                                    max={100}
                                    step={1}
                                    onChange={(newValue) =>
                                        handleSettingChange(
                                        `${objectPath}.servicesDisplay.grid.gap.desktop`,
                                        `${newValue}px`
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
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