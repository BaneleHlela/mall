import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import FirstOrderSubSettingsContainer from '../../FirstOrderSubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import BorderEditor from '../../background/BorderEditor';
import OrderDnD from '../../extras/OrderDnD';
import SubSettingsContainer from '../../extras/SubSettingsContainer';
import OptionsToggler from '../../supporting/OptionsToggler';
import SlidingPanel from '../../supporting/SlidingPanel';
import SimpleLogoSettings from '../popular/supporting/SimpleLogoSettings';
import BlueSidebarSettings from '../with_searchbar/BlueSidebarSettings';
import BackgroundEditor from '../../background/BackgroundEditor';
import SettingsSlider from '../../supporting/SettingsSlider';
import TextEditor from '../../text/TextEditor';
import StoreButtonSettings from '../../extras/StoreButtonSettings';

const ArtMenubarSettings = () => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const store = useAppSelector((state) => state.storeAdmin.store);
    const closePanel = () => setActivePanel(null);
    const settings = useAppSelector((state) => state.layoutSettings);
    const dispatch = useAppDispatch();

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    const hamburgerSize = Number(
        settings.menubar.topbar.hamburger?.size?.toString().replace("vh", "")
    ) || 2;
    
    return (
        <div className='p-[.6vh] space-y-[.6vh] w-full'>
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
                    <div className='px-[.5vh] space-y-[.6vh]'>
                        {/* Background */}
                        <SubSettingsContainer   
                            name="Background"
                            SettingsComponent={
                                <BackgroundEditor
                                    objectPath="menubar.topbar.background"
                                    handleSettingChange={handleSettingChange}
                                    settings={settings}
                                    responsivePadding
                                    responsiveSize
                                    allow={["color", "height", "padding", "border", "opacity"]}
                                />
                            }
                        />
                        
                        {/* <div className="rounded border-2 border-white text-center p-[.5vh] shadow">
                            <p className="mb-[1vh]">Mobile Topbar Layout</p>
                            <div className="space-y-[1vh]">
                                <div>
                                    <p className="text-sm font-medium">Stack</p>
                                    <OrderDnD
                                        order={settings.menubar.topbar.stack}
                                        objectPath="menubar.topbar.stack"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Order</p>
                                    <OrderDnD
                                        order={settings.menubar.topbar.order}
                                        objectPath="menubar.topbar.order"
                                    />
                                </div>
                            </div>
                        </div> */}
                        <SubSettingsContainer
                            name="Cart & Like Settings"
                            SettingsComponent={
                                <div className='px-[1vh]'>
                                    {store?.trades.includes('products') && (
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
                                    )}
                                    {/* Color */}
                                    <OptionsToggler
                                        label="Color"
                                        options={[
                                            "primary",
                                            "secondary",
                                            "accent",
                                            "pent", 
                                            "quad",
                                        ]}
                                        value={settings.menubar.topbar.cart.color}
                                        onChange={(value) => handleSettingChange('menubar.topbar.cart.color', value)}
                                    />
                                    {/* Size using slider */}
                                    <SettingsSlider
                                        label="Size"
                                        value={settings.menubar.topbar.cart.size ? Number(settings.menubar.topbar.cart.size.toString().replace("vh", "")) : 2}
                                        min={1}
                                        max={10}
                                        step={.1}
                                        onChange={(value) => handleSettingChange('menubar.topbar.cart.size', `${value}vh`)}
                                    />
                                </div>
                            }
                        />
                        {/* Hamburger */}
                        <SubSettingsContainer
                            name="Hambuger Settings"
                            SettingsComponent={
                                <div className=''>
                                    <OptionsToggler
                                        label="Variation"
                                        options={[
                                            "cross",
                                            "squash",
                                            "twirl",
                                            "fade",
                                            "spiral",
                                            "divice",
                                            "turn",
                                            "pivot",
                                            "squeeze",
                                            "spin",
                                            'rotate'
                                        ]}
                                        value={settings.menubar.topbar.hamburger?.variation || "cross"}
                                        onChange={(value) => handleSettingChange('menubar.topbar.hamburger.variation', value)}
                                    />
                                    {/* Color */}
                                    <OptionsToggler
                                        label="Color"
                                        options={[
                                            "primary",
                                            "secondary",
                                            "accent",
                                            "pent", 
                                            "quad",
                                        ]}
                                        value={settings.menubar.topbar.hamburger?.color || "cross"}
                                        onChange={(value) => handleSettingChange('menubar.topbar.hamburger.color', value)}
                                    />
                                    {/* Size using slider */}
                                    <SettingsSlider
                                        label="Size"
                                        value={hamburgerSize}
                                        min={10}
                                        max={50}
                                        step={1}
                                        onChange={(value) => handleSettingChange('menubar.topbar.hamburger.size', value)}
                                    />
                                </div>
                            }
                        />
                        <FirstOrderSubSettingsContainer
                            name="Logo Settings"
                            onClick={() => setActivePanel('logo')}
                        />
                        <FirstOrderSubSettingsContainer
                            name="Desktop Settings"
                            onClick={() => setActivePanel('desktop')}
                        />
                        {/* <SubSettingsContainer
                            name="Search Settings"
                            SettingsComponent={
                                <BorderEditor
                                    objectPath="menubar.topbar.search.border"
                                    handleSettingChange={handleSettingChange}
                                    settings={settings}
                                />
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
                        <BlueSidebarSettings />
                    </SlidingPanel>
                )}
                {activePanel === 'logo' && (
                    <SlidingPanel
                        key="logo"
                        isOpen={true}
                        onClose={() => setActivePanel('topbar')}
                        title="Mobile Logo Settings"
                    >
                        <SimpleLogoSettings
                            objectPath="menubar.topbar.logo"
                        />
                    </SlidingPanel>
                )}
                {(activePanel === 'desktop') && (
                    <SlidingPanel
                        key="desktop"
                        isOpen={true}
                        onClose={() => setActivePanel('topbar')}
                        title="Desktop Topbar Settings"
                    >
                        <>
                            {/* Links */}
                            <SubSettingsContainer
                                key="desktop_links"
                                name="Links"
                                SettingsComponent={
                                    <TextEditor
                                        objectPath="menubar.topbar.desktop.links"
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "fontFamily", 'fontSize', "weight"]}
                                    />
                                }
                            />
                            {/* Button */}
                            <FirstOrderSubSettingsContainer
                                name="Desktop Button"
                                onClick={() => setActivePanel('desktop_button')}
                            />
                        </>
                    </SlidingPanel>
                )}
                {activePanel === 'desktop_button' && (
                    <SlidingPanel
                        key="desktop_button"
                        isOpen={true}
                        onClose={() => setActivePanel('desktop')}
                        title="Desktop Button Settings"
                    >
                        <>
                            {/* Background */}
                            {/* <SubSettingsContainer
                                name="Background"
                                SettingsComponent={
                                    <BackgroundEditor
                                        objectPath="menubar.topbar.desktop.button.background"
                                        handleSettingChange={handleSettingChange}
                                        settings={settings}
                                        allow={["color", "padding", "border", "opacity"]}
                                    />
                                }
                            /> */}
                            {/* Text */}
                            {/* <SubSettingsContainer
                                name="Text"
                                SettingsComponent={
                                    <TextEditor
                                        objectPath="menubar.topbar.desktop.button.text"
                                        settings={settings}
                                        handleSettingChange={handleSettingChange}
                                        allow={["color", "fontFamily", 'fontSize', "weight", "input"]}
                                    />
                                }
                            /> */}
                            <StoreButtonSettings
                                objectPath="menubar.topbar.desktop.button"
                                settings={settings}
                                allowSimpleShow
                                allowFunction
                            />
                        </>
                    </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ArtMenubarSettings