import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import BackgroundEditor from '../../../background/BackgroundEditor';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../../supporting/SlidingPanel';
import TextEditor from '../../../text/TextEditor';
import MainBookWithCalenderSettings from '../basic_book_with_open_calendar/supporting/MainBookWithCalenderSettings';
import { getSetting } from '../../../../../utils/helperFunctions';

const BookSectionWithContrastColorSettings = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    // Object path for the book section settings (background, text, button)
    const objectPath = "sections.book";
    
    // Object path for the main booking calendar component
    const mainObjectPath = "sections.bookService.main";

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
                        allow={["color",]}
                        widthUnit="%"
                        heightUnit="vh"
                        responsiveSize
                        responsivePadding
                    />
                </div>
                }
            />

            {/* Heading And Button Container Settings */}
            <SubSettingsContainer
                name="Heading & Button Container"
                SettingsComponent={
                <div className="px-[.15vh]">
                    <BackgroundEditor
                        objectPath={`${objectPath}.background.headingAndButton`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={["color", "padding"]}
                        widthUnit="%"
                        heightUnit="vh"
                        responsiveSize
                        responsivePadding
                    />
                </div>
                }
            />

            {/* Text */}
            <FirstOrderSubSettingsContainer
                name="Text"
                onClick={() => setActivePanel("text")}
            />

            {/* Button */}
            <FirstOrderSubSettingsContainer
                name="Button"
                onClick={() => setActivePanel("button")}
            />

            {/* Main Book With Calendar */}
            <FirstOrderSubSettingsContainer
                name="Booking Box"
                onClick={() => setActivePanel("main")}
            />

            <AnimatePresence>
                {activePanel === "text" && (
                    <SlidingPanel
                        key="text"
                        isOpen={true}
                        onClose={closePanel}
                        title="Text Settings"
                    >    
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Heading"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.text.heading`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["input", "padding", "color", "fontFamily", "fontSize", "weight"]}
                                        responsiveSize
                                        responsivePadding
                                    />
                                </div>
                                }
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
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.button.text`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["input", "color", "fontFamily", "fontSize", "weight", "letterSpacing"]}
                                        responsiveSize={false}
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.button.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "padding", "width", "border"]}
                                        widthUnit="%"
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
                {activePanel === "main" && (
                    <SlidingPanel
                        key="main"
                        isOpen={true}
                        onClose={closePanel}
                        title="Booking Box Settings"
                    >
                        <MainBookWithCalenderSettings 
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            objectPath={mainObjectPath}
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default BookSectionWithContrastColorSettings