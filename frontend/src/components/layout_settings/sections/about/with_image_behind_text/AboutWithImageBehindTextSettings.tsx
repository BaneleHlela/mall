import { useState } from "react";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import OptionsToggler from "../../../supporting/OptionsToggler";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import UnderlinedTextSettings from "../../../extras/text/UnderlinedTextSettings";
import TextEditor from "../../../text/TextEditor";

interface AboutWithImageBehindTextSettingsProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const AboutWithImageBehindTextSettings: React.FC<AboutWithImageBehindTextSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "sections.about";
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <div className="space-y-1">
      
        <FirstOrderSubSettingsContainer
            name="background"
            onClick={() => setActivePanel("backgroundSettings")}
        />

        {/* Image Settings */}
        <FirstOrderSubSettingsContainer
            name="image"
            onClick={() => setActivePanel("image")}
        />
      

        {/* Text Settings */}
        <FirstOrderSubSettingsContainer
            name="Div"
            onClick={() => setActivePanel("divSettings")}
        />

        {/* Sliding Panels */}
        <AnimatePresence>
            {activePanel === "backgroundSettings" && (
                <SlidingPanel
                key="backgroundSettings"
                isOpen={true}
                    onClose={closePanel}
                    title="Background Settings"
                >
                    <div className="px-[.65vh] space-y-[.4vh] py-1">
                        <BackgroundEditor
                            objectPath={`${objectPath}.background`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["color", "height", "width"]}
                            widthUnit="%"
                            heightUnit="vh"
                            responsiveSize
                        />
                    </div>
                </SlidingPanel>
            )}
            {activePanel === "image" && (
            <SlidingPanel
                key="image"
                title="About Image Settings"
                onClose={closePanel}
                isOpen
            >
                <div className="px-[.65vh] space-y-[.3vh] py-[.3vh]">
                <MultipleLayoutImagesHandler
                    objectPath={`${objectPath}.image.imageUrl`}
                    min={1}
                    max={1}
                    images={getSetting("image.imageUrl", settings, objectPath)}
                />
                <SubSettingsContainer
                    name="Background"
                    SettingsComponent={
                        <BackgroundEditor
                        objectPath={`${objectPath}.image.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["width", "height", "border"]}
                        responsiveSize
                        widthUnit="%"
                        heightUnit="%"
                        />
                    }
                />
                </div>
            </SlidingPanel>
            )}
            {activePanel === "divSettings" && (
                <SlidingPanel
                    key="divSettings"
                    isOpen={true}
                    onClose={closePanel}
                    title="Text & Button Settings"
                >
                    <div className="px-[.65vh] space-y-[.4vh] py-1">
                        <FirstOrderSubSettingsContainer
                            name="background Settings"
                            onClick={() => setActivePanel("divBackgroundSettings")}
                        />
                        <FirstOrderSubSettingsContainer
                            name="Text Settings"
                            onClick={() => setActivePanel("textSettings")}
                        />
                        <FirstOrderSubSettingsContainer
                            name="Button Settings"
                            onClick={() => setActivePanel("button")}
                        />
                    </div>
                </SlidingPanel>
            )}
            {activePanel === "divBackgroundSettings" && (
                <SlidingPanel
                    key="divBackgroundSettings"
                    isOpen={true}
                    onClose={() => setActivePanel("divSettings")}
                    title="Div Background Settings"
                >
                    <div className="px-[.65vh] space-y-[.4vh] py-[.4vh]">
                        <BackgroundEditor
                            objectPath={`${objectPath}.div.background`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["color", "height", "width", "padding"]}
                            widthUnit="%"
                            heightUnit="%"
                            responsiveSize
                            responsivePadding
                        />
                    </div>
                </SlidingPanel> 
            )}
            {activePanel === "textSettings" && (
                <SlidingPanel 
                    key="heading"
                    title="Div Text Settings"
                    onClose={() => setActivePanel("divSettings")}
                    isOpen={true}
                >
                    <div className="px-[.65vh] space-y-[.4vh] py-[.4vh]">
                        <FirstOrderSubSettingsContainer
                            name="heading"
                            onClick={() => setActivePanel("headingSettings")}
                        />
                        <FirstOrderSubSettingsContainer
                            name="paragraph"
                            onClick={() => setActivePanel("paragraphSettings")}
                        />
                    </div>
                </SlidingPanel>
            )}
            {activePanel === "headingSettings" && (
                <SlidingPanel
                key="headingSettings"
                isOpen={true}
                    onClose={() => setActivePanel("textSettings")}
                    title="Heading Text Settings"
                >
                    <div className="px-[.65vh] space-y-[.4vh] py-1">
                        <UnderlinedTextSettings
                            objectPath={`${objectPath}.div.text.heading.style`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allowInput
                            responsiveSize
                        />
                    </div>
                </SlidingPanel>
            )}
            {activePanel === "paragraphSettings" && (
                <SlidingPanel
                    key="paragraphSettings"
                    isOpen={true}
                    onClose={() => setActivePanel("textSettings")}
                    title="Paragraph Text Settings"
                >
                    <div className="px-[.65vh] space-y-[.4vh] py-1">
                        <TextEditor 
                            objectPath={`${objectPath}.div.text.paragraph`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            responsiveSize
                            allow={["fontFamily", "fontSize", "fontWeight", "color", "letterSpacing", "lineHeight", "input", "padding"]}
                            responsivePadding
                            useTextarea
                        />
                    </div>
                </SlidingPanel>
            )}
            

            {activePanel === "button" && (
            <SlidingPanel
                key="button"
                isOpen={true}
                onClose={closePanel}
                title="Button Settings"
            >
                <StoreButtonSettings
                    objectPath={`${objectPath}.div.button`}
                    settings={settings}
                    allowFunction
                />
            </SlidingPanel>
            )}

            {["firstLine", "secondLine", "thirdLine"].map((lineKey) => (
            activePanel === lineKey && (
                <SlidingPanel
                key={lineKey}
                isOpen={true}
                onClose={() => setActivePanel("textSettings")}
                title={`Text Line: ${lineKey.replace("Line", " Line")}`}
                >
                <div className="px-[.65vh] space-y-[.4vh]">
                    <OptionsToggler
                    label="Show"
                    options={["true", "false"]}
                    value={
                        getSetting(`text.${lineKey}.show`, settings, objectPath)
                        ? "true"
                        : "false"
                    }
                    onChange={(value) =>
                        handleSettingChange(
                        `${objectPath}.text.${lineKey}.show`,
                        value === "true"
                        )
                    }
                    />

                    <UnderlinedTextSettings
                    objectPath={`${objectPath}.text.${lineKey}`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allowInput
                    responsiveSize
                    />
                </div>
                </SlidingPanel>
            )
            ))}
        </AnimatePresence>
    </div>
  );
};

export default AboutWithImageBehindTextSettings;
