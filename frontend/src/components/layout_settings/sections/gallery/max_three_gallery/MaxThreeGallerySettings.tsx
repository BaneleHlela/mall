import { useState } from "react";
import type { SectionSettingsProps } from "../with_image_slider/GalleryWithImageSliderSettings"
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import TextEditor from "../../../text/TextEditor";
import InputHandler from "../../../supporting/InputHandler";
import TextareaHandler from "../../../supporting/TextareaHandler";
import BackgroundEditor from "../../../background/BackgroundEditor";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";
import UnderlinedTextSettings from "../../../extras/text/UnderlinedTextSettings";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import OptionsToggler from "../../../supporting/OptionsToggler";
import { AnimatePresence } from "framer-motion";
import { getSetting } from "../../../../../utils/helperFunctions";

const MaxThreeGallerySettings: React.FC<SectionSettingsProps> = ({
    settings,
    handleSettingChange,
}) => {
    const objectPath = "sections.gallery";

    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    return (
        <div className="space-y-[.35vh]">
            {/* Background */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["width", "color", "padding"]}
                        responsivePadding
                        widthUnit="%"
                        responsiveSize
                    />
                }
            />
            {/* Heading */}
            <SubSettingsContainer
                name="Heading"
                SettingsComponent={
                    <div className="px-[1vh] space-y-[.6vh]">
                        <UnderlinedTextSettings
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.heading`}
                            allowInput
                            responsiveSize
                        />
                    </div>
                }
            />
            {/* Cards */}
            <FirstOrderSubSettingsContainer
                name="Cards"
                onClick={() => setActivePanel("Cards")}
            />
            <AnimatePresence>
                {activePanel === "Cards" && (
                    <SlidingPanel
                        key="cards" isOpen={true} onClose={closePanel} title="Cards Settings"
                    >
                        <div className="space-y-[.8vh]">
                            {/* Groups */}
                            <FirstOrderSubSettingsContainer
                                name="Groups"
                                onClick={() => setActivePanel("groups")}
                            />
                            {/* Style */}
                            <FirstOrderSubSettingsContainer
                                name="Style"
                                onClick={() => setActivePanel("style")}
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "groups" && (
                    <SlidingPanel key="groups" isOpen={true} onClose={() => setActivePanel("Cards")} title="Groups Settings">
                        <div className="space-y-[.3vh]">
                            {/* First Group */}
                            <SubSettingsContainer
                                name="First Group"
                                SettingsComponent={
                                    <div>
                                        <OptionsToggler
                                            label="Show"
                                            options={["Yes", "No"]}
                                            value={getSetting("show", settings, `${objectPath}.cards.firstGroup`) ? "Yes" : "No"}
                                            onChange={(option) => handleSettingChange(`${objectPath}.cards.firstGroup.show`, option === "Yes")}
                                        />
                                        <InputHandler
                                            label="Title"
                                            value={getSetting("title", settings, `${objectPath}.cards.firstGroup`)}
                                            onChange={(newValue) => handleSettingChange(`${objectPath}.cards.firstGroup.title`, newValue)}
                                        />
                                        <TextareaHandler
                                            label="Description"
                                            value={getSetting("description", settings, `${objectPath}.cards.firstGroup`)}
                                            onChange={(newValue) => handleSettingChange(`${objectPath}.cards.firstGroup.description`, newValue)}
                                        />
                                        <MultipleLayoutImagesHandler
                                            images={getSetting("imageUrls", settings, `${objectPath}.cards.firstGroup`) || []}
                                            min={1}
                                            max={10}
                                            objectPath={`${objectPath}.cards.firstGroup.imageUrls`}
                                        />
                                    </div>
                                }
                            />
                            {/* Second Group */}
                            <SubSettingsContainer
                                name="Second Group"
                                SettingsComponent={
                                    <div className="px-[1vh] space-y-[.6vh]">
                                        <OptionsToggler
                                            label="Show"
                                            options={["Yes", "No"]}
                                            value={getSetting("show", settings, `${objectPath}.cards.secondGroup`) ? "Yes" : "No"}
                                            onChange={(option) => handleSettingChange(`${objectPath}.cards.secondGroup.show`, option === "Yes")}
                                        />
                                        <InputHandler
                                            label="Title"
                                            value={getSetting("title", settings, `${objectPath}.cards.secondGroup`)}
                                            onChange={(newValue) => handleSettingChange(`${objectPath}.cards.secondGroup.title`, newValue)}
                                        />
                                        <TextareaHandler
                                            label="Description"
                                            value={getSetting("description", settings, `${objectPath}.cards.secondGroup`)}
                                            onChange={(newValue) => handleSettingChange(`${objectPath}.cards.secondGroup.description`, newValue)}
                                        />
                                        <MultipleLayoutImagesHandler
                                            images={getSetting("imageUrls", settings, `${objectPath}.cards.secondGroup`) || []}
                                            min={1}
                                            max={10}
                                            objectPath={`${objectPath}.cards.secondGroup.imageUrls`}
                                        />
                                    </div>
                                }
                            />
                            {/* Third Group */}
                            <SubSettingsContainer
                                name="Third Group"
                                SettingsComponent={
                                    <div className="px-[1vh] space-y-[.6vh]">
                                        <OptionsToggler
                                            label="Show"
                                            options={["Yes", "No"]}
                                            value={getSetting("show", settings, `${objectPath}.cards.thirdGroup`) ? "Yes" : "No"}
                                            onChange={(option) => handleSettingChange(`${objectPath}.cards.thirdGroup.show`, option === "Yes")}
                                        />
                                        <InputHandler
                                            label="Title"
                                            value={getSetting("title", settings, `${objectPath}.cards.thirdGroup`)}
                                            onChange={(newValue) => handleSettingChange(`${objectPath}.cards.thirdGroup.title`, newValue)}
                                        />
                                        <TextareaHandler
                                            label="Description"
                                            value={getSetting("description", settings, `${objectPath}.cards.thirdGroup`)}
                                            onChange={(newValue) => handleSettingChange(`${objectPath}.cards.thirdGroup.description`, newValue)}
                                        />
                                        <MultipleLayoutImagesHandler
                                            images={getSetting("imageUrls", settings, `${objectPath}.cards.thirdGroup`) || []}
                                            min={1}
                                            max={10}
                                            objectPath={`${objectPath}.cards.thirdGroup.imageUrls`}
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "style" && (
                    <SlidingPanel key="style" isOpen={true} onClose={() => setActivePanel("Cards")} title="Style Settings">
                        <div className="space-y-[.3vh]">
                            {/* Image */}
                            <SubSettingsContainer
                                name="Image"
                                SettingsComponent={
                                    <div className="space-y-[.6vh]">
                                        <BackgroundEditor
                                            objectPath={`${objectPath}.cards.style.image`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={["border"]}
                                        />
                                    </div>
                                }
                            />
                            {/* Title */}
                            <SubSettingsContainer
                                name="Title"
                                SettingsComponent={
                                    <div className="px-[1vh] space-y-[.6vh]">
                                        <TextEditor
                                            objectPath={`${objectPath}.cards.style.title`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={["fontFamily",  "color", "fontSize", "weight", "textAlign", "padding"]}
                                            responsivePadding
                                            responsiveSize
                                        />
                                    </div>
                                }
                            />
                            {/* Description */}
                            <SubSettingsContainer
                                name="Description"
                                SettingsComponent={
                                    <div className="px-[1vh] space-y-[.6vh]">
                                        <TextEditor
                                            objectPath={`${objectPath}.cards.style.description`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={["fontSize", "weight", "color", "fontFamily", "lineHeight"]}
                                            responsiveSize
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MaxThreeGallerySettings