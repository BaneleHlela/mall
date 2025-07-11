import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import ResponsiveGridSettings from "../../../extras/ResponsiveGridSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import OptionsToggler from "../../../supporting/OptionsToggler";
import SettingsSlider from "../../../supporting/SettingsSlider";
import TextEditor from "../../../text/TextEditor";
import type { SectionSettingsProps } from "../../gallery/with_image_slider/GalleryWithImageSliderSettings"

const ReviewsWithBackgroundImageAndCardSettings: React.FC<SectionSettingsProps>  = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "reviews";

  return (
        <div className="space-y-1 px-2 py-1">
            <SubSettingsContainer 
              name="Background"
              SettingsComponent={
                <div>
                  <MultipleLayoutImagesHandler
                    objectPath={`${objectPath}.background.image`}
                    min={1}
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
                    allow={["width", "color"]}
                    responsiveSize
                    widthUnit='%'
                  />
                </div>
              }
            />
            <SubSettingsContainer
                name="Heading"
                SettingsComponent={
                <>
                    <TextEditor
                        objectPath={`${objectPath}.text.title`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["input", "color", "fontFamily", "fontSize", "position", "lineHeight", "textDecotation", "weight"]}
                        responsiveSize={true}
                    />
                </>
                }
            />
            <SubSettingsContainer
                name="Sub Heading"
                SettingsComponent={
                <>
                    <TextEditor
                        objectPath={`${objectPath}.text.subheading`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["input", "color", "fontFamily", "fontSize", "position", "lineHeight", "textDecotation", "weight", "position"]}
                        responsiveSize={true}
                    />
                </>
                }
            />
            <SubSettingsContainer
                name="Grid"
                SettingsComponent={
                    <ResponsiveGridSettings
                        objectPath={`${objectPath}.grid`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        columnOptions={{
                            mobile: ['1'],
                            desktop: ['1', '2', '3', '4', '5']
                        }}
                        gapRange={{
                            mobile: { min: 0, max: 50 },
                            desktop: { min: 0, max: 100 }
                        }}
                    />
                }
            />
            <SubSettingsContainer
                name="Button"
                SettingsComponent={
                <div className="space-y-1 px-2 py-1">
                    <SubSettingsContainer
                        name="Background"
                        SettingsComponent={
                            <BackgroundEditor
                                objectPath={`${objectPath}.addReviewBtn`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["color", "border", "width", "padding",]}
                            />
                        }
                    />
                    <SubSettingsContainer
                        name="Text"
                        SettingsComponent={
                            <TextEditor
                                objectPath={`${objectPath}.text.addReviewBtn`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["input", "color", "fontFamily", "fontSize"]}
                            />
                        }
                    />
                </div>}
            />
            <SubSettingsContainer
                name="Review Card"
                SettingsComponent={
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
                }
            />
        </div>
    )
}

export default ReviewsWithBackgroundImageAndCardSettings