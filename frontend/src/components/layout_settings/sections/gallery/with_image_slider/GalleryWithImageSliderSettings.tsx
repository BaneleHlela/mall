import React, { useState } from 'react';
import { getSetting } from '../../../../../utils/helperFunctions';
import BackgroundEditor from '../../../background/BackgroundEditor';
import TextEditor from '../../../text/TextEditor';
import OptionsToggler from '../../../supporting/OptionsToggler';
import SettingsSlider from '../../../supporting/SettingsSlider';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../../supporting/SlidingPanel';
import { AnimatePresence } from 'framer-motion';

interface SectionSettingsProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const GalleryWithImageSliderSettings: React.FC<SectionSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "gallery";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className="space-y-1">
      {/* Top-Level Background + Slider Variation */}
      <div className="border rounded">
        <BackgroundEditor
          objectPath={`${objectPath}.background`}
          settings={settings}
          handleSettingChange={handleSettingChange}
          allow={["color"]}
        />
        <div className="px-2">
          <OptionsToggler
            label="Slider Variation"
            options={["alwaysMoving", "stopAndGo"]}
            value={getSetting("sliderVariation", settings, objectPath)}
            onChange={(value) => handleSettingChange(`${objectPath}.sliderVariation`, value)}
          />
        </div>
      </div>

      {/* First Order Panels */}
      <FirstOrderSubSettingsContainer name="Title" onClick={() => setActivePanel("title")} />
      <FirstOrderSubSettingsContainer name="Slider" onClick={() => setActivePanel("slider")} />

      <AnimatePresence>
        {activePanel === "title" && (
          <SlidingPanel key="title" isOpen={true} onClose={closePanel} title="Gallery Title">
            <div className="px-2 space-y-1 py-1">
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
                onChange={(newVal) =>
                  handleSettingChange(`${objectPath}.heading.marginBottom`, `${newVal}px`)
                }
              />
              <SubSettingsContainer
                name="Text"
                SettingsComponent={
                  <TextEditor
                    objectPath={`${objectPath}.heading`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["input", "fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                    responsiveSize
                  />
                }
              />
            </div>
          </SlidingPanel>
        )}

        {activePanel === "slider" && (
          <SlidingPanel key="slider" isOpen={true} onClose={closePanel} title="Image Slider">
            <div className="px-2 space-y-1 py-1 pb-1">
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
                  <div className='space-y-1 pb-1'>
                    <BackgroundEditor
                      objectPath={`${objectPath}.slider.hover.background`}
                      settings={settings}
                      handleSettingChange={handleSettingChange}
                      allow={["color", "opacity"]}
                      responsiveSize
                    />
                    <div className="px-2 space-y-1">
                        <SubSettingsContainer
                        name="View Button"
                        SettingsComponent={
                            <div className="px-2 py-1 space-y-1">
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                <BackgroundEditor
                                    objectPath={`${objectPath}.slider.hover.viewButton.background`}
                                    settings={settings}
                                    handleSettingChange={handleSettingChange}
                                    allow={["color", "height", "width", "border", "opacity"]}
                                    widthUnit="%"
                                    heightUnit="%"
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
                    </div>
                    
                    <div className="px-2 space-y-1">
                        <SubSettingsContainer
                        name="Description Text"
                        SettingsComponent={
                            <>
                                <div className="px-2">
                                    <OptionsToggler
                                        label="Show Description"
                                        options={["Yes", "No"]}
                                        value={
                                        getSetting("slider.hover.descriptionText.show", settings, objectPath)
                                            ? "Yes"
                                            : "No"
                                        }
                                        onChange={(value) =>
                                        handleSettingChange(
                                            `${objectPath}.slider.hover.descriptionText.show`,
                                            value === "Yes"
                                        )
                                        }
                                    />
                                </div>
                                <TextEditor
                                    objectPath={`${objectPath}.slider.hover.descriptionText.style`}
                                    settings={settings}
                                    handleSettingChange={handleSettingChange}
                                    allow={["fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                                />
                            </>
                        }
                        />
                    </div>
                  </div>
                }
              />
            </div>
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryWithImageSliderSettings;
