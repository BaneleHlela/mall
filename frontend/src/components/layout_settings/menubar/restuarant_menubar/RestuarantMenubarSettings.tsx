import React, { useState } from 'react'
import FirstOrderSubSettingsContainer from '../../FirstOrderSubSettingsContainer';
import SubSettingsContainer from '../../extras/SubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../supporting/SlidingPanel';
import LogoSettings from '../popular/supporting/StoreLayoutLogoSettings';
import SimpleLogoSettings from '../popular/supporting/SimpleLogoSettings';
import RestuarantSidebarSettings from './RestuarantSidebarSettings';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import OrderDnD from '../../extras/OrderDnD';
import OptionsToggler from '../../supporting/OptionsToggler';
import InputHandler from '../../supporting/InputHandler';
import ColorPicker from '../../supporting/ColorPicker';
import SettingsSlider from '../../supporting/SettingsSlider';
import BackgroundEditor from '../../background/BackgroundEditor';
import TextEditor from '../../text/TextEditor';
import StoreButtonSettings from '../../extras/StoreButtonSettings';

const RestuarantMenubarSettings = () => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    const settings = useAppSelector((state) => state.layoutSettings);
    const dispatch = useAppDispatch();

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    
    return (
        <div className='p-[.6vh] space-y-[.3vh] w-full'>
            {/* Topbar */}
            <FirstOrderSubSettingsContainer
                name="Topbar"
                onClick={() => setActivePanel('topbar')}
            />
            {/* Sidebar */}
            <FirstOrderSubSettingsContainer
                name="Sidebar"
                onClick={() => setActivePanel('sidebar')}
            />
            <AnimatePresence>
                {activePanel === 'topbar' && (
                <SlidingPanel
                    key="topbar"
                    isOpen={true}
                    onClose={closePanel}
                    title="Topbar Settings"
                >
                    <div className='px-[.5vh] space-y-[.3vh]'>
                        {/* Background */}
                        <SubSettingsContainer
                            name="Background"
                            SettingsComponent={
                                <div className='space-y-[1vh]'>
                                     <BackgroundEditor
                                        objectPath={`menubar.topbar.background`}
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["height", "color", "padding"]}
                                        responsivePadding
                                        widthUnit="vw"
                                        heightUnit="vh"
                                        responsiveSize
                                    />
                                </div>
                            }
                        />
                        {/* Links Text */}
                        <SubSettingsContainer
                            name="Desktop Links Text"
                            SettingsComponent={
                                <TextEditor
                                    objectPath={`menubar.topbar.links.text`}
                                    settings={settings}
                                    handleSettingChange={handleSettingChange}
                                    allow={["fontFamily", "fontSize", "fontWeight", "color"]}
                                />
                            }
                        /> 
                        <SubSettingsContainer
                            name="Cart Settings"
                            SettingsComponent={
                                <div className="space-y-[1vh]">
                                    <OptionsToggler
                                        label="Variation"
                                        options={[
                                            "default",
                                            "bag",
                                            "basket",
                                            "outline",
                                            "medical",
                                            "trolley2",
                                            "trolley3",
                                            "paperbag",
                                            "beachbag",
                                            "shoppingbag",
                                        ]}
                                        value={settings.menubar.topbar.cart.variation}
                                        onChange={(value) => handleSettingChange('menubar.topbar.cart.variation', value)}
                                    />
                                    <SettingsSlider
                                           label="Size"
                                            value={settings.menubar.topbar.cart.size}
                                            onChange={(value) => handleSettingChange('menubar.topbar.cart.size', value)}
                                           min={10}
                                            max={50}
                                            step={1}
                                    />
                                    <OptionsToggler
                                        label="color"
                                        options={["primary", "secondary", "accent", "quad", "pent"]}
                                        value={settings.menubar.topbar.cart.color}
                                        onChange={(value) => handleSettingChange('menubar.topbar.cart.color', value)}
                                    />
                                </div>
                            }
                        /> 
                        <FirstOrderSubSettingsContainer
                            name="Logo Settings"
                            onClick={() => setActivePanel('logo')}
                        />
                        <FirstOrderSubSettingsContainer
                            name="Desktop Button Settings"
                            onClick={() => setActivePanel('button')}
                        />
                        {/* <div className="rounded border-2 border-white text-center p-[.5vh] shadow">
                            <p className="mb-[1vh]">Mobile Topbar Layout</p>
                            <div className="space-y-[1vh]">
                                <div>
                                    <p className="text-sm font-medium">Order</p>
                                    <OrderDnD
                                        order={settings.menubar.topbar.order}
                                        objectPath="menubar.topbar.order"
                                    />
                                </div>
                            </div>
                        </div> */}
                        
                        {/* <SubSettingsContainer
                            name="Button Settings"
                            SettingsComponent={
                                <StoreButtonSettings
                                    objectPath="menubar.topbar.button"
                                    settings={settings}
                                    allowFunction={true}
                                />
                            }
                        /> */}
                        {/* <SubSettingsContainer
                            name="Heart Settings"
                            SettingsComponent={
                                <div className="space-y-[1vh]">
                                    <InputHandler
                                        label="Size"
                                        value={settings.menubar.topbar.heart.size}
                                        onChange={(value) => handleSettingChange('menubar.topbar.heart.size', value)}
                                    />
                                    <ColorPicker
                                        label="Color"
                                        value={settings.menubar.topbar.heart.color}
                                        onChange={(value) => handleSettingChange('menubar.topbar.heart.color', value)}
                                    />
                                </div>
                            }
                        /> */}
                    </div>
                </SlidingPanel>
                )}

                {activePanel === 'sidebar' && (
                <SlidingPanel
                    key="sidebar"
                    isOpen={true}
                    onClose={closePanel}
                    title="Sidebar Settings"
                >
                    <RestuarantSidebarSettings />
                </SlidingPanel>
                )}
                {activePanel === 'logo' && (
                <SlidingPanel
                    key="logo"
                    isOpen={true}
                    onClose={closePanel}
                    title="Mobile Logo Settings"
                >
                    <SimpleLogoSettings
                        objectPath="menubar.topbar.logo"
                    />
                </SlidingPanel>
                )}
                {activePanel === "button" && (
                    <SlidingPanel
                        key="button"
                        isOpen={true}
                        onClose={closePanel}
                        title="Button Settings"
                    >
                        <StoreButtonSettings
                            objectPath="menubar.topbar.button"
                            settings={settings}
                            allowFunction={true}
                        />
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default RestuarantMenubarSettings