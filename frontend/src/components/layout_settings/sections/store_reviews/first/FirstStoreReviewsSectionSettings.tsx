import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import OptionsToggler from "../../../supporting/OptionsToggler";
import SettingsSlider from "../../../supporting/SettingsSlider";
import TextEditor from "../../../text/TextEditor";
import type { SectionSettingsProps } from "../../gallery/with_image_slider/GalleryWithImageSliderSettings"

const FirstStoreReviewsSectionSettings: React.FC<SectionSettingsProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = "reviews";

    return (
        <div className="space-y-1 px-2 py-1">
            <BackgroundEditor
                objectPath={`${objectPath}.background`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["color"]}
            />
            <SubSettingsContainer
                name="Heading"
                SettingsComponent={
                <>
                    <TextEditor
                        objectPath={`${objectPath}.text.title`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["input", "color", "fontFamily", "fontSize", "position"]}
                        responsiveSize={true}
                    />
                </>
                }
            />
            <SubSettingsContainer
                name="Button"
                SettingsComponent={
                <>
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
                </>}
            />
            <SubSettingsContainer
                name="Review Card"
                SettingsComponent={
                    <>
                        <SubSettingsContainer
                            name="Stars"
                            SettingsComponent={
                                <>
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
                                    allow={["color", "border", "shadow"]}
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
                    </>
                }
            />
        </div>
    )
}

export default FirstStoreReviewsSectionSettings