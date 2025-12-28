import { useState } from "react";
import FirstOrderSubSettingsContainer from "../../../../FirstOrderSubSettingsContainer";
import { AnimatePresence } from "framer-motion";
import SlidingPanel from "../../../../supporting/SlidingPanel";
import ServiceDetailsSettings from "./supporting/ServiceDetailsSettings";
import CalenderSettings from "./supporting/CalenderSettings";
import AvailableSlotsSettings from "./supporting/AvailableSlotsSettings";
import SubSettingsContainer from "../../../../extras/SubSettingsContainer";
import TextEditor from "../../../../text/TextEditor";
import BackgroundEditor from "../../../../background/BackgroundEditor";

export interface SupportingSettingsProps {
    settings: any;
    handleSettingChange: (path: string, value: any) => void;
    objectPath: string;
}
const MainBookWithCalenderSettings: React.FC<SupportingSettingsProps> = ({
    settings,
    handleSettingChange,
    objectPath
}) => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    return (
        <div className="text-[2vh] space-y-[.3vh]">
            {/* Background */}
            <FirstOrderSubSettingsContainer
                name="Background"
                onClick={() => setActivePanel("background")}
            />
            {/* Ttiles */}
            {/* <FirstOrderSubSettingsContainer
                name="Titles"
                onClick={() => setActivePanel("titles")}
            /> */}
            {/* Service Details */}
            <FirstOrderSubSettingsContainer
                name="Service Details"
                onClick={() => setActivePanel("service_details")}
            />
            {/* Select Date */}
            <FirstOrderSubSettingsContainer
                name="Calender"
                onClick={() => setActivePanel("calender")}
            />
            {/* Available slot */}
            <FirstOrderSubSettingsContainer
                name="Available Slots"
                onClick={() => setActivePanel("available_slots")}
            />
            <AnimatePresence>
                {activePanel === "background" && (
                    <SlidingPanel key="background" isOpen={true} onClose={closePanel} title="Background Settings">
                        <div className="px-[.6vh] space-y-[.3vh] py-[.3vh]">
                            <BackgroundEditor
                                objectPath={`${objectPath}.background`}
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["color", "shadow", "border", "padding", "width", "height"]}
                                heightUnit="vh"
                                widthUnit="%"
                                responsivePadding
                                responsiveSize
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "titles" && (
                    <SlidingPanel key="titles" isOpen={true} onClose={closePanel} title="Titles Settings">
                        <div className="px-[.6vh] space-y-[.3vh] py-[.3vh]">
                            {/* <SettingsSlider
                                label="Bottom Margin"
                                value={parseInt(getSetting("heading.text.marginBottom", settings, objectPath) || '16')}
                                unit="px"
                                onChange={(newVal) =>
                                    handleSettingChange(`${objectPath}.heading.text.marginBottom`, `${newVal}px`)
                                }
                            /> */}
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                    <TextEditor
                                        objectPath={`${objectPath}.titles.text`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["position", "input", "fontFamily", "fontSize", "color", "weight", "lineHeight"]}
                                        responsiveSize
                                        responsivePadding
                                    />
                                }
                            />
                            {/* Background Settings */}
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                    <div className="px-[.15vh] space-y-1">
                                        <BackgroundEditor
                                            objectPath={`${objectPath}.titles.background`}
                                            settings={settings}
                                            handleSettingChange={handleSettingChange}
                                            allow={[ "border"]}
                                            widthUnit="vw"
                                            heightUnit="vh"
                                            responsiveSize
                                            responsivePadding
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "service_details" && (
                    <SlidingPanel
                        key="service_details"
                        isOpen={true}
                        onClose={closePanel}
                        title="Service Details"
                    >
                        <ServiceDetailsSettings 
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.serviceDetails`}
                        />
                    </SlidingPanel>
                )}
                {activePanel === "calender" && (
                    <SlidingPanel
                        key="calender"
                        isOpen={true}
                        onClose={closePanel}
                        title="Calender Settings"
                    >
                        <CalenderSettings 
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.calendar`}
                        />
                    </SlidingPanel>
                )}
                {activePanel === "available_slots" && (
                    <SlidingPanel
                        key="availables_slots"
                        isOpen={true}
                        onClose={closePanel}
                        title="Available Slots"
                    >
                        <AvailableSlotsSettings
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.availableSlots`}
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MainBookWithCalenderSettings;