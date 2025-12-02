import React, { useState } from 'react'
import type { SupportingSettingsProps } from '../../sections/gallery/with_grouped_images/SupportingImagesSettings'
import { getSetting } from '../../../../utils/helperFunctions'
import FirstOrderSubSettingsContainer from '../../FirstOrderSubSettingsContainer'
import SlidingPanel from '../../supporting/SlidingPanel'
import StoreButtonSettings from '../StoreButtonSettings'
import StoreAlertIconSettings from './supporting/StoreAlertIconSettings'
import BackgroundEditor from '../../background/BackgroundEditor'
import SubSettingsContainer from '../SubSettingsContainer'
import { AnimatePresence } from 'framer-motion'
import TextEditor from '../../text/TextEditor'



const StoreAlertDivSettings: React.FC<SupportingSettingsProps> = ({
    settings,
    objectPath,
    handleSettingChange
}) => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    // Ensure the three items exist with defaults
    const ensureItems = () => {
        const items = getSetting("items", settings, objectPath) || {};
        if (!items.text) {
            handleSettingChange(`${objectPath}.items.text`, {
                input: "Free shipping for first time buyers!",
                fontSize: { mobile: "2.5vh", desktop: "3vh" },
                color: "primary",
            });
        }
        if (!items.icon) {
            handleSettingChange(`${objectPath}.items.icon`, {
                show: true,
                name: "FaTruck",
                color: "primary",
                height: { mobile: "5vh", desktop: "5vh" },
            });
        }
        if (!items.button) {
            handleSettingChange(`${objectPath}.items.button`, {
                button: {
                    function: 'book',
                    show: true,
                    text: { input: "Book Now" },
                    background: {
                        width: { desktop: "17vh", mobile: "20vh" },
                        padding: { x: { mobile: "3vh", desktop: "3vh" }, y: { mobile: "1.5vh", desktop: "2vh" } },
                        border: { width: "0px", style: "solid", radius: "30px" }
                    }
                }
            });
        }
    };

    // Call ensureItems on mount
    React.useEffect(() => {
        ensureItems();
    }, []);


    return (
        <div className='space-y-[.3vh] w-full flex flex-col items-center'>
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                <div className="px-[.6vh] space-y-[.3vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["height", "color"]}
                        heightUnit="vh"
                        responsiveSize
                    />
                </div>
                }
            />
            <FirstOrderSubSettingsContainer
                name="Icon"
                onClick={() => setActivePanel("icon")}
            />
            <FirstOrderSubSettingsContainer
                name="Text"
                onClick={() => setActivePanel("text")}
            />
            <FirstOrderSubSettingsContainer
                name="Button"
                onClick={() => setActivePanel("button")}
            />

            <AnimatePresence>
                {activePanel === "text" && (
                    <SlidingPanel
                        isOpen={true}
                        onClose={closePanel}
                        title="Text Settings"
                    >
                        <TextEditor
                            settings={settings}
                            objectPath={`${objectPath}.items.text`}
                            handleSettingChange={handleSettingChange}
                            allow={["fontFamily", "color", "fontSize", "weight", "input"]}
                            responsiveSize
                        />
                    </SlidingPanel>
                )}

                {activePanel === "button" && (
                    <SlidingPanel
                        isOpen={true}
                        onClose={closePanel}
                        title="Button Settings"
                    >
                        <StoreButtonSettings
                            settings={settings}
                            objectPath={`${objectPath}.items.button`}
                            allowSimpleShow
                        />
                    </SlidingPanel>
                )}

                {activePanel === "icon" && (
                    <SlidingPanel
                        isOpen={true}
                        onClose={closePanel}
                        title="Icon Settings"
                    >
                        <StoreAlertIconSettings
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.items.icon`}
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default StoreAlertDivSettings