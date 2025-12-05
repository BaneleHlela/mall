import { useState } from "react";
import SettingsContainer from "../../SettingsContainer"
import SlidingPanel from "../../supporting/SlidingPanel";
import StoreFloatingSocialsSettings from "./StoreFloatingSocialsSettings";
import StoreFloatingButtonSettings from "./StoreFloatingButtonSettings";

const StoreFloatsSettings = () => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    return (
        <div className="w-full h-full space-y-[.3vh] ">
            <SettingsContainer
                name="socials"
                onClick={() => setActivePanel("socials")}
            />
            <SettingsContainer
                name="Buttons"
                onClick={() => setActivePanel("buttons")}
            />
            {activePanel === "socials" && (
                <SlidingPanel
                    key="socials"
                    isOpen={true}
                    onClose={closePanel}
                    title="Floating Socials Settings"
                >
                    <StoreFloatingSocialsSettings />
                </SlidingPanel>
            )}
            {activePanel === "buttons" && (
                <SlidingPanel
                    key="socials"
                    isOpen={true}
                    onClose={closePanel}
                    title="Floating Button Settings"
                >
                    <StoreFloatingButtonSettings />
                </SlidingPanel>
            )}
        </div>
    )
}

export default StoreFloatsSettings