import React, { useState } from 'react'
import FirstOrderSubSettingsContainer from '../../FirstOrderSubSettingsContainer';
import SubSettingsContainer from '../../extras/SubSettingsContainer';
import { AnimatePresence } from 'framer-motion';
import SlidingPanel from '../../supporting/SlidingPanel';
import SimpleLogoSettings from '../popular/supporting/SimpleLogoSettings';
import BlueSidebarSettings from './BlueSidebarSettings';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import OrderDnD from '../../extras/OrderDnD';
import OptionsToggler from '../../supporting/OptionsToggler';
import BorderEditor from '../../background/BorderEditor';

const MenubarWithSearchbarSettings = () => {
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    const settings = useAppSelector((state) => state.layoutSettings);
    const dispatch = useAppDispatch();

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    
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
                    <div className='px-[.5vh] space-y-[1vh]'>
                        <FirstOrderSubSettingsContainer
                            name="Logo Settings"
                            onClick={() => setActivePanel('logo')}
                        />
                        <div className="rounded border-2 border-white text-center p-[.5vh] shadow">
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
                        </div>
                        <SubSettingsContainer
                            name="Cart Settings"
                            SettingsComponent={
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
                            }
                        />
                        <SubSettingsContainer
                            name="Search Settings"
                            SettingsComponent={
                                <BorderEditor
                                    objectPath="menubar.topbar.search.border"
                                    handleSettingChange={handleSettingChange}
                                    settings={settings}
                                />
                            }
                        />
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
                    onClose={closePanel}
                    title="Mobile Logo Settings"
                >
                    <SimpleLogoSettings
                        objectPath="menubar.topbar.logo"
                    />
                </SlidingPanel>
                )}
            </AnimatePresence>
        </div>
    )
}

export default MenubarWithSearchbarSettings