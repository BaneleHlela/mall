
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import OptionsToggler from '../../../supporting/OptionsToggler';
import TextEditor from '../../../text/TextEditor';
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import LogoControl from '../../../logo/LogoControl';

const LogoSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const logoSettings = useAppSelector((state) => state.layoutSettings.menubar.topbar.desktop.logo);
  const settings = useAppSelector((state) => state.layoutSettings);
  
  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  return (
    <div className="space-y-1 px-2">
      <OptionsToggler
        label="Logo Type"
        options={['logo', 'text']}
        value={logoSettings.use}
        onChange={(value) => handleSettingChange('menubar.topbar.desktop.logo.use', value)}
      />

      {logoSettings.use === 'logo' && (
        <LogoControl />
      )}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <BackgroundEditor
            objectPath="menubar.topbar.desktop.logo.background"
            settings={settings}
            handleSettingChange={handleSettingChange}
            allow={['padding', 'color', 'border', "height", "width"]}
            responsiveSize={false}
          />
        }
      />

      {logoSettings.use === 'text' && (
        <SubSettingsContainer
          name="Text"
          SettingsComponent={
            <TextEditor
              objectPath="menubar.topbar.desktop.logo.text"
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={['input', 'fontFamily', 'color', 'fontSize', 'weight', 'letterSpacing']}
            />
          }
        />
      )}
    </div>
  );
};

export default LogoSettings;