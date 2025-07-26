import { AnimatePresence } from "framer-motion";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import ResponsiveGridSettings from "../../../extras/ResponsiveGridSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import OptionsToggler from "../../../supporting/OptionsToggler";
import SettingsSlider from "../../../supporting/SettingsSlider";
import TextEditor from "../../../text/TextEditor";
import type { SectionSettingsProps } from "../../gallery/with_image_slider/GalleryWithImageSliderSettings"
import { useState } from "react";
import UnderlinedTextSettings from "../../../extras/text/UnderlinedTextSettings";
import SlidingPanel from "../../../supporting/SlidingPanel";

const ReviewsWithBackgroundImageAndCardSettings: React.FC<SectionSettingsProps>  = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "reviews";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
        <div className="space-y-1 px-2 py-1">
            <SubSettingsContainer 
              name="Background"
              SettingsComponent={
                <div>
                  <MultipleLayoutImagesHandler
                    objectPath={`${objectPath}.background.image`}
                    min={0}
                    max={1}
                    images={getSetting("background.image", settings, objectPath)}
                  />
                  <BackgroundEditor
                    objectPath={`${objectPath}.background`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["opacity", "color"]}
                  />
                </div>
              }
            />
            
            <SubSettingsContainer 
              name="Container Background"
              SettingsComponent={
                <div>
                  <BackgroundEditor
                    objectPath={`${objectPath}.containerBackground`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["width", "color", "padding"]}
                    responsiveSize
                    responsivePadding
                    widthUnit='%'
                  />
                </div>
              }
            />
            <FirstOrderSubSettingsContainer
                name="Text"
                onClick={() => setActivePanel("Text")}
            />
            {/* Cards */}
            <FirstOrderSubSettingsContainer
                name="Cards"
                onClick={() => setActivePanel("cards")}
            />
            <FirstOrderSubSettingsContainer
                name="Add Review Button"
                onClick={() => setActivePanel("add_review_button")}
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
                    <SlidingPanel key="card" isOpen={true} onClose={closePanel} title="Card Settings">
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
                                                value={getSetting("grid.container.stack.mobile", settings, objectPath)}
                                                onChange={(value) => handleSettingChange(`${objectPath}.grid.container.stack.mobile`, value)}
                                            />
                                            <OptionsToggler
                                                label="Desktop Stack"
                                                options={["horizontal", "vertical"]}
                                                value={getSetting("grid.container.stack.desktop", settings, objectPath)}
                                                onChange={(value) => handleSettingChange(`${objectPath}.grid.container.stack.desktop`, value)}
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
                    <SlidingPanel
                        key="card"
                        isOpen
                        onClose={() => setActivePanel("cards")}
                        title="Review Card Settings"
                    >
                        <div className="space-y-1 px-2 py-1">
                            <SubSettingsContainer
                                name="Stars"
                                SettingsComponent={
                                    <>
                                        <TextEditor
                                            objectPath={`${objectPath}.reviewCard.stars`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={["color"]}
                                        />
                                        <div className="px-2 py-1">
                                            <OptionsToggler
                                                label="Type"
                                                options={["sharp", "rounded", "playful", "normal"]}
                                                value={getSetting("stars.type", settings, `${objectPath}.reviewCard`)}
                                                onChange={(value) =>
                                                    handleSettingChange(`${objectPath}.reviewCard.stars.type`, value)
                                                }
                                            />
                                            <OptionsToggler
                                                label="position"
                                                options={["start", "center", "end"]}
                                                value={getSetting("stars.position", settings, `${objectPath}.reviewCard`)}
                                                onChange={(value) =>
                                                    handleSettingChange(`${objectPath}.reviewCard.stars.position`, value)
                                                }
                                            />
                                            
                                            <SettingsSlider
                                                label="Size"
                                                unit=""
                                                value={parseInt(getSetting("stars.size", settings, `${objectPath}.reviewCard`)) || 20}
                                                min={10}
                                                max={50}
                                                onChange={(newVal) =>
                                                    handleSettingChange(`${objectPath}.reviewCard.stars.size`, newVal)
                                                }
                                            />
                                        </div>
                                    </>
                                    
                                }
                            />
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.reviewCard.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "border", "shadow", "padding"]}
                                    />
                                }
                            />
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                    <div className='px-2 py-1 space-y-1'>
                                        <SubSettingsContainer
                                            name="Comment"
                                            SettingsComponent={
                                                <TextEditor
                                                    objectPath={`${objectPath}.reviewCard.text.comment`}
                                                    settings={settings}
                                                    handleSettingChange={handleSettingChange}
                                                    allow={["fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                                                />
                                            }
                                        />
                                        <SubSettingsContainer
                                            name="Reviewer Name"
                                            SettingsComponent={
                                            <TextEditor
                                                objectPath={`${objectPath}.reviewCard.text.name`}
                                                settings={settings}
                                                handleSettingChange={handleSettingChange}
                                                allow={["position", "fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                                            />
                                        }/>
                                    </div>
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "add_review_button" && (
                    <SlidingPanel
                        isOpen
                        onClose={closePanel}
                        title="Add Review Button Settings"
                        key="add_review_button"
                    >
                        <div className="space-y-1 px-2 py-1">
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.addReviewBtn.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "border", "width", "padding", "shadow"]}
                                    />
                                }
                            />
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                    <TextEditor
                                        objectPath={`${objectPath}.addReviewBtn.text`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["input", "color", "fontFamily", "fontSize", "weight"]}
                                    />
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ReviewsWithBackgroundImageAndCardSettings