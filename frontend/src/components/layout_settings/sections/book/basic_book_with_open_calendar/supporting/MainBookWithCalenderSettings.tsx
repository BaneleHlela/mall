import { useState } from "react";
import FirstOrderSubSettingsContainer from "../../../../FirstOrderSubSettingsContainer";
import { AnimatePresence } from "framer-motion";
import SlidingPanel from "../../../../supporting/SlidingPanel";
import ServiceDetailsSettings from "./supporting/ServiceDetailsSettings";
import CalenderSettings from "./supporting/CalenderSettings";
import AvailableSlotsSettings from "./supporting/AvailableSlotsSettings";

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
                            objectPath={`${objectPath}.calender`}
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