import React, { useState } from 'react';
import { getSetting } from '../../../../../utils/helperFunctions';
import BackgroundEditor from '../../../background/BackgroundEditor';
import TextEditor from '../../../text/TextEditor';
import OptionsToggler from '../../../supporting/OptionsToggler';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../../supporting/SlidingPanel';
import { AnimatePresence } from 'framer-motion';
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings';
import MultipleLayoutImagesHandler from '../../../supporting/MultipleLayoutImagesHandler';

export interface SectionSettingsProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const GalleryWithImageSliderSettings: React.FC<SectionSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "sections.gallery";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className="space-y-[.8vh]">
      {/* Top-Level Background + Slider Variation */}
      <div className="border rounded-[.5vh]">
        {/* <div className="p-[1vh]">
          <OptionsToggler
            label="Slider Variation"
            options={["alwaysMoving", "stopAndGo"]}
            value={getSetting("sliderVariation", settings, objectPath)}
            onChange={(value) => handleSettingChange(`${objectPath}.sliderVariation`, value)}
          />
        </div> */}
        <BackgroundEditor
          objectPath={`${objectPath}.background`}
          settings={settings}
          handleSettingChange={handleSettingChange}
          allow={["color", "padding", "width", ]}
          responsivePadding
          responsiveSize
        />
      </div>

      {/* Text */}
      <FirstOrderSubSettingsContainer
        name="Text"
        onClick={() => setActivePanel("Text")}
      />

      <FirstOrderSubSettingsContainer 
        name="Slider" 
        onClick={() => setActivePanel("slider")} 
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

        {activePanel === "slider" && (
          <SlidingPanel key="slider" isOpen={true} onClose={closePanel} title="Image Slider">
            <div className="px-[.6vh] space-y-[.3vh] py-[.3vh] pb-1">
              <FirstOrderSubSettingsContainer
                name="Images"
                onClick={() => setActivePanel("images")}
              />
              <FirstOrderSubSettingsContainer
                name="Background"
                onClick={() => setActivePanel("slider_background")}
              />
              <FirstOrderSubSettingsContainer
                name="Hover Settings"
                onClick={() => setActivePanel("hover")}
              />
            </div>
          </SlidingPanel>
        )}
        {activePanel === "images" && (
          <SlidingPanel
            key="images"
            title="Slider Images"
            onClose={() => setActivePanel("slider")}
            isOpen
          >
            <MultipleLayoutImagesHandler
              images={getSetting("slider.images", settings, objectPath) || []}
              max={50}
              objectPath={`${objectPath}.slider.images`}
            />
          </SlidingPanel>
        )}
        {activePanel === "slider_background" && (
          <SlidingPanel
            key="slider_background"
            title="Slider Background"
            onClose={() => setActivePanel("slider")}
            isOpen
          >
            <BackgroundEditor
              objectPath={`${objectPath}.slider.background`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["height", "width", "border", "margin"]}
              heightUnit='vh'
              widthUnit='vh'
              responsiveSize
            />
          </SlidingPanel>
        )}
        {activePanel === "hover" && (
          <SlidingPanel
            key="hover"
            title="Image Hover Settings"
            onClose={() => setActivePanel("slider")}
            isOpen
          >
              <div className='space-y-[.6vh] pb-1'>
                <BackgroundEditor
                  objectPath={`${objectPath}.slider.hover.background`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["color", "opacity"]}
                  responsiveSize
                />
                <div className="px-[.6vh] space-y-[.6vh]">
                    <FirstOrderSubSettingsContainer 
                      name="View Button" 
                      onClick={() => setActivePanel("view_button")} 
                    />
                    {/* <SubSettingsContainer
                    name="View Button"
                    SettingsComponent={
                        <div className="px-[.6vh] py-[.3vh] space-y-[.3vh]">
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
                    /> */}
                </div>
                
                <div className="px-[.6vh] space-y-[.3vh]">
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
          </SlidingPanel>

        )}
        {activePanel === "view_button" && (
          <SlidingPanel
            key="view_button"
            title="View Button Settings"
            onClose={() => setActivePanel("hover")}
            isOpen
          >
            <div className="px-[.6vh] py-[.3vh] space-y-[.3vh]">
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
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryWithImageSliderSettings;
