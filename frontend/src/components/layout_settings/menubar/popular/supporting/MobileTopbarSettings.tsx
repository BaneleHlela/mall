import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import OrderDnD from '../../../extras/OrderDnD';
import LogoSettings from './LogoSettings';
import MenubarLinksSettings from './MenubarLinksSettings';
import IconsSettingsHandler from './IconsSettingsHandler';
import StoreButtonSettings from '../../../extras/StoreButtonSettings';
import OptionsToggler from '../../../supporting/OptionsToggler';
import HamburgerSettings from './HamburgerSettings';

const MobileTopbarSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    
    return (
        <div className="space-y-1 px-2 py-1">
            <OptionsToggler
                label="Hamburger First"
                options={['true', 'false']}
                value={String(settings.menubar.topbar.mobile.hamburgerFirst)}
                onChange={(value) => handleSettingChange('menubar.topbar.mobile.hamburgerFirst', value === "true")}
            />
            <OptionsToggler
                label="Display"
                options={['logo', 'extras']}
                value={settings.menubar.topbar.mobile.display}
                onChange={(value) => handleSettingChange('menubar.topbar.mobile.display', value)}
            />
            <SubSettingsContainer
                name="Logo Settings"
                SettingsComponent={
                <LogoSettings 
                    objectPath='menubar.topbar.mobile.logo'
                    device="mobile"
                />}
            />
            <SubSettingsContainer
                    name="Icons"
                    SettingsComponent={
                    <IconsSettingsHandler 
                        settings={settings} 
                        handleSettingChange={handleSettingChange} 
                        objectPath="menubar.topbar.mobile.extras.icons"
                    />}
            />
            <SubSettingsContainer
                name="Button"
                SettingsComponent={
                    <StoreButtonSettings
                        objectPath="menubar.topbar.mobile.extras.button"
                        settings={settings}
                    />
                }
            />
            <SubSettingsContainer
                name="Hamburger"
                SettingsComponent={
                    <HamburgerSettings
                    />
                }
            />
        </div>
    )
}

export default MobileTopbarSettings;