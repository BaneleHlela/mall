import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import OrderDnD from '../../../extras/OrderDnD';
import LogoSettings from './LogoSettings';
import MenubarLinksSettings from './MenubarLinksSettings';
import IconsSettingsHandler from './IconsSettingsHandler';
import StoreButtonSettings from '../../../extras/StoreButtonSettings';

const DesktopTopbarSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const order = settings.menubar.topbar.desktop.order;

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    
    return (
        <div className="space-y-1 px-2 py-1">
            <div className="flex flex-col items-center text-center border rounded py-1">
                <p className="">Order</p>
                <OrderDnD 
                    order={order} 
                    objectPath="menubar.topbar.desktop.order"
                />
            </div>
            <SubSettingsContainer
                name="Logo Settings"
                SettingsComponent={<LogoSettings />}
            />
            <SubSettingsContainer
                name="Links Settings"
                SettingsComponent={<MenubarLinksSettings />}
            />
            <SubSettingsContainer
                    name="Icons"
                    SettingsComponent={
                    <IconsSettingsHandler 
                        settings={settings} 
                        handleSettingChange={handleSettingChange} 
                        objectPath="menubar.topbar.desktop.extras.icons"
                    />}
            />
            <SubSettingsContainer
                name="Button"
                SettingsComponent={
                    <StoreButtonSettings
                        objectPath="menubar.topbar.desktop.extras.button"
                        settings={settings}
                    />
                }
            />
            {/* Add other desktop topbar settings here */}
        </div>
    )
}

export default DesktopTopbarSettings;