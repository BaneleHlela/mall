import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import BackgroundEditor from '../../../background/BackgroundEditor';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../../supporting/SlidingPanel';
import TextEditor from '../../../text/TextEditor';
import BorderEditor from '../../../background/BorderEditor';
import UnderlinedTextSettings from '../../../extras/text/UnderlinedTextSettings';

const HorizontalProductSettings = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    const objectPath = "sections.products"
    return (
        <div className='text-[2vh] space-y-[.3vh]'>
            {/* Background Settings */}
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                <div className="px-[.15vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["height", "width", "color", "padding"]}
                        widthUnit="vw"
                        heightUnit="vh"
                        responsiveSize
                        responsivePadding
                    />
                </div>
                }
            />
            {/* Header Settings */}
            <SubSettingsContainer
                name="Header"
                SettingsComponent={
                <div className="px-[.15vh] space-y-[.3vh]">
                    <TextEditor
                        objectPath={`${objectPath}.text.header`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={[ "color", "fontFamily", "fontSize", "weight", "lineHeight", "animation", "letterSpacing" ]}
                        responsiveSize
                    />
                </div>
                }
            />
            {/* Card Settings */}
            <FirstOrderSubSettingsContainer
                name="Card"
                onClick={() => setActivePanel("card")}
            />
            <AnimatePresence>
                {activePanel === "card" && (
                    <SlidingPanel
                        key="card"
                        isOpen={true}
                        onClose={closePanel}
                        title="Card Settings"
                    >
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.card.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["height", "border"]}
                                        widthUnit="vw"
                                        heightUnit="vh"
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Image Border"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BorderEditor
                                        objectPath={`${objectPath}.card.image.background.border`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["width", "style", "color", "radius"]}
                                    />
                                </div>
                                }
                            />
                            {/* Details Settings */}
                            <FirstOrderSubSettingsContainer
                                name="Details"
                                onClick={() => setActivePanel("details")}
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "details" && (
                    <SlidingPanel
                        key="details"
                        isOpen={true}
                        onClose={() => setActivePanel("card")}
                        title="Details Settings"
                    >
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Price"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.card.details.price`}
                                        allow={[ "color", "fontFamily", "fontSize", "weight"]}
                                        responsiveSize
                                        responsivePadding
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Name"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.card.details.name`}
                                        allow={[ "color", "fontFamily", "fontSize", "weight"]}
                                        responsiveSize
                                        responsivePadding
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
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

export default HorizontalProductSettings