import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import OptionsToggler from '../../../supporting/OptionsToggler';
import MenubarLinksSettings from './MenubarLinksSettings';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import IconsSettingsHandler from './IconsSettingsHandler';
import StoreButtonSettings from '../../../extras/StoreButtonSettings';

const SidebarSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state: any) => state.layoutSettings);
    const sidebarAnimation = settings.menubar.sidebar.animation;

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    const animationOptions = [
        "leftToRight",
        "rightToLeft",
        "upToDown",
        "downToUp",
        "fade"
    ];

    return (
        <div className="space-y-1 px-2 py-1">
            <OptionsToggler
                label="Animation"
                options={animationOptions}
                value={sidebarAnimation}
                onChange={(value) => handleSettingChange('menubar.sidebar.animation', value)}
            />
            <SubSettingsContainer
                name="Links"
                SettingsComponent={<MenubarLinksSettings type="sidebar" />}
            />

            <SubSettingsContainer 
                name="Extras"
                SettingsComponent={
                <div className='px-2 space-y-1 py-1'>
                    <OptionsToggler
                        label="Display"
                        options={['icons', 'button', "none"]}
                        value={settings.menubar.sidebar.display}
                        onChange={(value) => handleSettingChange('menubar.sidebar.display', value )}
                    />
                    <SubSettingsContainer
                        name="Icons"
                        SettingsComponent={
                            <IconsSettingsHandler 
                                settings={settings} 
                                handleSettingChange={handleSettingChange} 
                                objectPath="menubar.sidebar.icons"
                            />
                        }
                    />
                    <SubSettingsContainer
                        name="Button"
                        SettingsComponent={
                            <StoreButtonSettings
                                objectPath="menubar.sidebar.button"
                                settings={settings}
                            />
                        }
                    />
                </div>
            }
            />
            {/* Add other sidebar settings here */}
        </div>
    );
};

export default SidebarSettings;