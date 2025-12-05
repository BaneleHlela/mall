import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import OptionsToggler from '../../supporting/OptionsToggler';
import BackgroundEditor from '../../background/BackgroundEditor';
import TextEditor from '../../text/TextEditor';
import SubSettingsContainer from '../../extras/SubSettingsContainer';
import SingleLayoutImageHandler from '../../supporting/SingleLayoutImageHandler';
import StoreButtonSettings from '../../extras/StoreButtonSettings';
import ColorPicker from '../../supporting/ColorPicker';
import FirstOrderSubSettingsContainer from '../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../supporting/SlidingPanel';
import { AnimatePresence } from 'framer-motion';

const RestuarantSidebarSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <>
            <div className='px-[.5vh] space-y-[.3vh]'>
                {/* Animation */}
                <OptionsToggler
                    label="Animation"
                    options={['leftToRight', 'rightToLeft', 'upToDown', 'downToUp', 'fade']}
                    value={settings.menubar.sidebar.animation}
                    onChange={(value) => handleSettingChange('menubar.sidebar.animation', value)}
                />
                {/* Background */}
                <SubSettingsContainer
                    name="Background"
                    SettingsComponent={
                        <BackgroundEditor
                            objectPath="menubar.sidebar.background"
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["color"]}
                        />
                    }
                />
                {/* Links */}
                <SubSettingsContainer
                    name="Links"
                    SettingsComponent={
                        <div className='space-y-[1vh]'>
                            <TextEditor
                                objectPath="menubar.sidebar.links"
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["color", "fontFamily"]}
                            />
                            <OptionsToggler
                                label="Alignment"
                                options={['left', 'center', 'right']}
                                value={settings.menubar.sidebar.links.alignment}
                                onChange={(value) => handleSettingChange('menubar.sidebar.links.alignment', value)}
                            />
                            <ColorPicker
                                label="Border Color"
                                value={settings.menubar.sidebar.links.borderColor}
                                onChange={(value) => handleSettingChange('menubar.sidebar.links.borderColor', value)}
                            />
                        </div>
                    }
                />
                {/* Image */}
                <SubSettingsContainer
                    name="Image"
                    SettingsComponent={
                        <div className='space-y-[1vh]'>
                            <SingleLayoutImageHandler
                                label="Image"
                                image={settings.menubar.sidebar.image?.imageUrl?.[0]}
                                onImageSelect={(url) => handleSettingChange('menubar.sidebar.image.imageUrl', [url])}
                                onDelete={() => handleSettingChange('menubar.sidebar.image.imageUrl', [])}
                            />
                            <BackgroundEditor
                                objectPath="menubar.sidebar.image.background"
                                settings={settings}
                                handleSettingChange={handleSettingChange}
                                allow={["border"]}
                            />
                        </div>
                    }
                />
                {/* Div */}
                <SubSettingsContainer
                    name="Div Background"
                    SettingsComponent={
                        <BackgroundEditor
                            objectPath="menubar.sidebar.div.background"
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["color", "border"]}
                        />
                    }
                />
                {/* Button */}
                <FirstOrderSubSettingsContainer
                    name="Button Settings"
                    onClick={() => setActivePanel('button')}
                />
            </div>
            <AnimatePresence>
                {activePanel === 'button' && (
                    <SlidingPanel
                        key="button"
                        isOpen={true}
                        onClose={closePanel}
                        title="Button Settings"
                    >
                        <StoreButtonSettings
                            objectPath="menubar.sidebar.button"
                            settings={settings}
                            allowFunction={true}
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </>
    );
};

export default RestuarantSidebarSettings;