import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import BackgroundEditor from '../../../background/BackgroundEditor';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../../supporting/SlidingPanel';
import TextEditor from '../../../text/TextEditor';
import { getSetting } from '../../../../../utils/helperFunctions';

const FirstFAQsSettings = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    const objectPath = "sections.FAQs"
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
                        allow={["color"]}
                        widthUnit="vw"
                        heightUnit="vh"
                        responsiveSize
                        responsivePadding
                    />
                </div>
                }
            />
            {/* Text Settings */}
            <FirstOrderSubSettingsContainer
                name="Text"
                onClick={() => setActivePanel("text")}
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
                                name="Header"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.text.header`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "color", "fontFamily", "fontSize", "weight", "input" ]}
                                        responsiveSize
                                    />
                                </div>
                                }
                            />
                            {/* QnAs Settings */}
                            <FirstOrderSubSettingsContainer
                                name="QnAs"
                                onClick={() => setActivePanel("qnas")}
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "qnas" && (
                    <SlidingPanel
                        key="qnas"
                        isOpen={true}
                        onClose={() => setActivePanel("text")}
                        title="QnAs Settings"
                    >
                        <div className="space-y-[.3vh]">
                            {/* Inputs Settings */}
                            <FirstOrderSubSettingsContainer
                                name="Inputs"
                                onClick={() => setActivePanel("inputs")}
                            />
                            {/* Style Settings */}
                            <FirstOrderSubSettingsContainer
                                name="Style"
                                onClick={() => setActivePanel("style")}
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "inputs" && (
                    <SlidingPanel
                        key="inputs"
                        isOpen={true}
                        onClose={() => setActivePanel("qnas")}
                        title="Inputs Settings"
                    >
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="First"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Title</label>
                                        <input
                                            type="text"
                                            value={getSetting("title", settings, `${objectPath}.text.QnAs.inputs.first`)}
                                            onChange={(e) => handleSettingChange(`${objectPath}.text.QnAs.inputs.first.title`, e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Paragraph</label>
                                        <textarea
                                            value={getSetting("paragraph", settings, `${objectPath}.text.QnAs.inputs.first`)}
                                            onChange={(e) => handleSettingChange(`${objectPath}.text.QnAs.inputs.first.paragraph`, e.target.value)}
                                            className="w-full p-2 border rounded h-20"
                                        />
                                    </div>
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Second"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Title</label>
                                        <input
                                            type="text"
                                            value={getSetting("title", settings, `${objectPath}.text.QnAs.inputs.second`)}
                                            onChange={(e) => handleSettingChange(`${objectPath}.text.QnAs.inputs.second.title`, e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Paragraph</label>
                                        <textarea
                                            value={getSetting("paragraph", settings, `${objectPath}.text.QnAs.inputs.second`)}
                                            onChange={(e) => handleSettingChange(`${objectPath}.text.QnAs.inputs.second.paragraph`, e.target.value)}
                                            className="w-full p-2 border rounded h-20"
                                        />
                                    </div>
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Third"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Title</label>
                                        <input
                                            type="text"
                                            value={getSetting("title", settings, `${objectPath}.text.QnAs.inputs.third`)}
                                            onChange={(e) => handleSettingChange(`${objectPath}.text.QnAs.inputs.third.title`, e.target.value)}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium">Paragraph</label>
                                        <textarea
                                            value={getSetting("paragraph", settings, `${objectPath}.text.QnAs.inputs.third`)}
                                            onChange={(e) => handleSettingChange(`${objectPath}.text.QnAs.inputs.third.paragraph`, e.target.value)}
                                            className="w-full p-2 border rounded h-20"
                                        />
                                    </div>
                                </div>
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "style" && (
                    <SlidingPanel
                        key="style"
                        isOpen={true}
                        onClose={() => setActivePanel("qnas")}
                        title="Style Settings"
                    >
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Title"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.text.QnAs.style.title`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "color", "fontFamily", "fontSize", "weight" ]}
                                        responsiveSize
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Paragraph"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.text.QnAs.style.paragraph`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={[ "color", "fontFamily", "fontSize", "weight"]}
                                        responsiveSize
                                        responsivePadding
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

export default FirstFAQsSettings