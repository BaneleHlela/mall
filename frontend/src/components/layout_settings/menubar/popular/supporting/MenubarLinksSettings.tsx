import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import BackgroundEditor from '../../../background/BackgroundEditor';
import OptionsToggler from '../../../supporting/OptionsToggler';
import TextEditor from '../../../text/TextEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';


const MenubarLinksSettings: React.FC = () => {
    const dispatch = useAppDispatch();
    const linksSettings = useAppSelector((state) => state.layoutSettings.menubar.topbar.desktop.links);
    const settings = useAppSelector((state) => state.layoutSettings); 
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };



    return (
        <div className="space-y-1 px-2 py-1">
            <h3 className="text-lg font-semibold">Menubar Links Settings</h3>

            <OptionsToggler
                label="Links Position"
                options={['left', 'center', 'right']}
                value={linksSettings.text.position}
                onChange={(value) => handleSettingChange('menubar.topbar.desktop.links.text.position', value)}
            />
            <SubSettingsContainer 
                name="Text"
                SettingsComponent={
                <TextEditor
                    objectPath="menubar.topbar.desktop.links.text"
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={['fontFamily', 'color', 'fontSize', 'fontWeight', 'letterSpacing']}
                />} 
            />
            
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <BackgroundEditor
                        objectPath="menubar.topbar.desktop.links.background"
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={['color', 'border', 'padding']}
                    />
                }
            />
        </div>
    );
};

export default MenubarLinksSettings;