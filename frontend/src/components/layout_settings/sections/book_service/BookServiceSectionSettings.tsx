import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import FirstOrderSubSettingsContainer from '../../FirstOrderSubSettingsContainer';
import SubSettingsContainer from '../../extras/SubSettingsContainer';
import BackgroundEditor from '../../background/BackgroundEditor';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../supporting/SlidingPanel';
import TextEditor from '../../text/TextEditor';
import { getSetting } from '../../../../utils/helperFunctions';
import UnderlinedTextSettings from '../../extras/text/UnderlinedTextSettings';
import MainBookWithCalenderSettings from '../book/basic_book_with_open_calendar/supporting/MainBookWithCalenderSettings';

const BookServiceSectionSettings = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    const objectPath = "bookService"

    console.log(getSetting(`background.color`, settings, "bookService"))
    console.log(settings.background.color)
    
    return (
        <div className='space-y-[.35vh]'>
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
                        widthUnit="%"
                        heightUnit="vh"
                        responsiveSize
                        responsivePadding
                    />
                </div>
                }
            />
            <FirstOrderSubSettingsContainer
                name="Exit Button"
                onClick={() => setActivePanel("exit")}
            />

            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Text"
                onClick={() => setActivePanel("Text")}
            />

            {/* Book */}
            <FirstOrderSubSettingsContainer
                name="Booking Box"
                onClick={() => setActivePanel("box")}
            />

            <AnimatePresence>
                {activePanel === "exit" && (
                    <SlidingPanel
                        key="exit"
                        isOpen={true}
                        onClose={closePanel}
                        title="Exit Button"
                    >    
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.text.exit`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "color", "fontFamily", "fontSize", "weight", "lineHeight", "animation", "letterSpacing" ]}
                                        responsiveSize
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.text.exit.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["height", "width", "color", "padding", "border"]}
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
                                allowWidth
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "box" && (
                    <SlidingPanel key="box" isOpen={true} onClose={closePanel} title="Booking Box Settings">
                        <MainBookWithCalenderSettings 
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={`${objectPath}.main`} 
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default BookServiceSectionSettings