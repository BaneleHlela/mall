import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import BackgroundEditor from '../../../background/BackgroundEditor';
import OptionsToggler from '../../../supporting/OptionsToggler';
import TextEditor from '../../../text/TextEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';

interface MenubarLinksSettingsProps {
  type: 'desktop' | 'sidebar';
  allowPositioning?: boolean;
}

const MenubarLinksSettings: React.FC<MenubarLinksSettingsProps> = ({ type, allowPositioning = false }) => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    
    const linksSettings = useAppSelector((state) => 
      type === 'desktop' 
        ? state.layoutSettings.menubar.topbar.desktop.links
        : state.layoutSettings.menubar.sidebar.links
    );

    const objectPath = type === 'desktop' 
      ? 'menubar.topbar.desktop.links' 
      : 'menubar.sidebar.links';
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <div className="space-y-1 px-2 py-1">
            <h3 className="text-lg font-semibold text-center">
              {type === 'desktop' ? 'Menubar' : 'Sidebar'} Links Settings
            </h3>
            {allowPositioning && (
                <OptionsToggler
                    label="Links Position"
                    options={['left', 'center', 'right',]}
                    value={linksSettings.alignment}
                    onChange={(value) => handleSettingChange(`${objectPath}.alignment`, value)}
                />
            )}
            
            <SubSettingsContainer 
                name="Text"
                SettingsComponent={
                <TextEditor
                    objectPath={`${objectPath}.text`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={['fontFamily', 'color', 'fontSize', 'weight', 'letterSpacing', "textDecoration", "textTransform", "lineHeight", "animation"]}
                />} 
            />
            
            <SubSettingsContainer
                name="Background"
                SettingsComponent={
                    <BackgroundEditor
                        objectPath={`${objectPath}.background`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={['color', 'border', 'padding', "height", "width", "shadow"]}
                        heightUnit='%'
                    />
                }
            />
            <SubSettingsContainer
                name="Background For all links"
                SettingsComponent={
                    <BackgroundEditor
                        objectPath={`${objectPath}.allLinksBackground`}
                        settings={settings}
                        handleSettingChange={handleSettingChange}
                        allow={['color', 'border', 'padding', "height", "width", "shadow"]}
                        heightUnit='%'
                        widthUnit='%'
                    />
                }
            />
        </div>
    );
};

export default MenubarLinksSettings;