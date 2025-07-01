import React from 'react'
import type { Section } from '../../../../../features/sections/sectionSlice';
import OptionsToggler from '../../../supporting/OptionsToggler';
import { getSetting } from '../../../../../utils/helperFunctions';
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import TextEditor from '../../../text/TextEditor';
import SettingsSlider from '../../../supporting/SettingsSlider';

export interface SectionSettingsProps {
    settings: any;
    handleSettingChange: (field: string, value: any) => void;
}

const GalleryWithImageSliderSettings: React.FC<SectionSettingsProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = "gallery"
    return (
        <div className='space-y-1'>
            <BackgroundEditor
                objectPath={`${objectPath}.background`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["color"]}
            />
            <OptionsToggler
                label="Slider Variation"
                options={["alwaysMoving", "stopAndGo"]}
                value={getSetting("sliderVariation", settings, objectPath)}
                onChange={(value) => handleSettingChange(`${objectPath}.sliderVariation`, value)}
            />
            <SubSettingsContainer
              name="Title"
              SettingsComponent={
                <>
                    <OptionsToggler
                        label="Slider Variation"
                        options={["Yes", "No"]}
                        value={getSetting("heading.show", settings, objectPath) ? "Yes" : "No"  }
                        onChange={(value) => handleSettingChange(`${objectPath}.heading.show`, value === "Yes")}
                    />
                    <OptionsToggler
                        label="Position"
                        options={["start", "center", "end"]}
                        value={getSetting("heading.position", settings, objectPath)}
                        onChange={(value) => handleSettingChange(`${objectPath}.heading.position`, value)}
                    />
                    <SettingsSlider
                        label="Bottom Margin"
                        value={parseInt(getSetting("heading.marginBottom", settings, objectPath) || '16')}
                        unit="px"
                        onChange={(newVal) => {
                            handleSettingChange(`${objectPath}.heading.marginBottom`, `${newVal}px`);
                        }}
                    />
                    <SubSettingsContainer 
                        name="Text"
                        SettingsComponent={
                            <TextEditor
                                objectPath={`${objectPath}.heading`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                                responsiveSize={true}
                            />
                        }
                    />
                    
                </>
              }
            />
            <SubSettingsContainer
                name="Slider"
                SettingsComponent={
                    <>
                        <SubSettingsContainer
                            name="Background"
                            SettingsComponent={
                                <BackgroundEditor
                                    objectPath={`${objectPath}.slider.background`}
                                    settings={settings}
                                    handleSettingChange={handleSettingChange}
                                    allow={["color", "height", "width", "border", "margin"]}
                                    responsiveSize
                                />
                            }
                        />
                        <SubSettingsContainer
                            name="Hover"
                            SettingsComponent={
                                <>
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.slider.hover.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "opacity"]}
                                        responsiveSize
                                    />
                                    <SubSettingsContainer
                                        name="View Button"
                                        SettingsComponent={
                                            <div className='px-2 py-1 space-y-1'>
                                                <SubSettingsContainer
                                                    name="Background"
                                                    SettingsComponent={
                                                        <BackgroundEditor
                                                            objectPath={`${objectPath}.slider.hover.viewButton.background`}
                                                            settings={settings}
                                                            handleSettingChange={handleSettingChange}
                                                            allow={["color", "height", "width", "border", "opacity"]}
                                                            widthUnit='%'
                                                            heightUnit='%'
                                                        />
                                                    }
                                                />
                                                <SubSettingsContainer
                                                    name="Text"
                                                    SettingsComponent={
                                                        <TextEditor
                                                            objectPath={`${objectPath}.slider.hover.viewButton.text`}
                                                            settings={settings}
                                                            handleSettingChange={handleSettingChange}
                                                            allow={["fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                                                        />
                                                    }
                                                />
                                                
                                            </div>
                                        }
                                    />
                                    <SubSettingsContainer
                                        name="Description Text"
                                        SettingsComponent={
                                            <>
                                                <OptionsToggler
                                                    label="Show Description"
                                                    options={["Yes", "No"]}
                                                    value={getSetting("slider.hover.descriptionText.show", settings, objectPath) ? "Yes" : "No"  }
                                                    onChange={(value) => handleSettingChange(`${objectPath}.slider.hover.descriptionText.show`, value === "Yes")}
                                                />
                                                <TextEditor
                                                    objectPath={`${objectPath}.slider.hover.descriptionText.style`}
                                                    settings={settings}
                                                    handleSettingChange={handleSettingChange}
                                                    allow={["fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                                                />
                                            </>
                                            
                                        }
                                    />
                                </>
                            }
                        />
                    </>
                }
            />
        </div>
    )
}

export default GalleryWithImageSliderSettings