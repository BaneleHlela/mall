import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import { AnimatePresence } from 'framer-motion';
import BackgroundEditor from '../../background/BackgroundEditor';
import BorderEditor from '../../background/BorderEditor';
import StoreButtonSettings from '../../extras/StoreButtonSettings';
import SubSettingsContainer from '../../extras/SubSettingsContainer';
import UnderlinedTextSettings from '../../extras/text/UnderlinedTextSettings';
import FirstOrderSubSettingsContainer from '../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../supporting/SlidingPanel';
import TextEditor from '../../text/TextEditor';

const StoreSearchResultsSectionSettings = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    const objectPath = "sections.searchResults";
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
                        allow={["color", "padding"]}
                        widthUnit="vw"
                        heightUnit="vh"
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
                        allow={["input", "color", "fontFamily", "fontSize", "weight", "padding"]}
                        responsiveSize
                        responsivePadding
                    />
                </div>
                }
            />
            {/* Sort Settings */}
            <FirstOrderSubSettingsContainer
                name="Sort"
                onClick={() => setActivePanel("sort")}
            />
            {/* Card Settings */}
            <FirstOrderSubSettingsContainer
                name="Card"
                onClick={() => setActivePanel("card")}
            />
            {/* Filters Settings */}
            <FirstOrderSubSettingsContainer
                name="Filters"
                onClick={() => setActivePanel("filters")}
            />
            <AnimatePresence>
                {activePanel === "sort" && (
                    <SlidingPanel
                        key="sort"
                        isOpen={true}
                        onClose={closePanel}
                        title="Sort Settings"
                    >
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.sort.text`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["fontFamily", "color"]}
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BackgroundEditor
                                        objectPath={`${objectPath}.sort.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "border"]}
                                        widthUnit="vw"
                                        heightUnit="vh"
                                    />
                                </div>
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
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
                                        allow={["border"]}
                                        widthUnit="vw"
                                        heightUnit="vh"
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
                                        allow={["width", "style", "radius"]}
                                    />
                                </div>
                                }
                            />
                            {/* Details Settings */}
                            <FirstOrderSubSettingsContainer
                                name="Details"
                                onClick={() => setActivePanel("details")}
                            />
                            {/* Button Settings */}
                            <FirstOrderSubSettingsContainer
                                name="Button"
                                onClick={() => setActivePanel("button")}
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
                                        allow={["color", "weight", "fontSize"]}
                                        responsiveSize
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
                                    <UnderlinedTextSettings
                                        objectPath={`${objectPath}.card.details.name`}
                                        allowInput={false}
                                        responsiveSize
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
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
                        onClose={() => setActivePanel("card")}
                        title="Button Settings"
                    >
                        <div className="space-y-[.3vh]">
                            <StoreButtonSettings
                                objectPath={`${objectPath}.card.button`}
                                settings={settings}
                                responsiveBackground
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "filters" && (
                    <SlidingPanel
                        key="filters"
                        isOpen={true}
                        onClose={closePanel}
                        title="Filters Settings"
                    >
                        <div className="space-y-[.3vh]">
                            <FirstOrderSubSettingsContainer
                                name="Text"
                                onClick={() => setActivePanel("text")}
                            />
                            <SubSettingsContainer
                                name="Checkbox Border"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <BorderEditor
                                        objectPath={`${objectPath}.filters.checkbox.border`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "width", "radius"]}
                                    />
                                </div>
                                }
                            />
                        </div>
                    </SlidingPanel>
                )}
                {activePanel === "text" && (
                    <SlidingPanel
                        key="text"
                        isOpen={true}
                        onClose={() => setActivePanel("filters")}
                        title="Text Settings"
                    >
                        <div className="space-y-[.3vh]">
                            <SubSettingsContainer
                                name="Title"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.filters.text.title`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["input", "fontSize", "weight"]}
                                        responsiveSize
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Categories"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.filters.text.categories`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["fontFamily", "weight", "fontSize"]}
                                        responsiveSize
                                    />
                                </div>
                                }
                            />
                            <SubSettingsContainer
                                name="Category"
                                SettingsComponent={
                                <div className="px-[.15vh] space-y-[.3vh]">
                                    <TextEditor
                                        objectPath={`${objectPath}.filters.text.category`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["fontFamily", "weight", "fontSize"]}
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

export default StoreSearchResultsSectionSettings