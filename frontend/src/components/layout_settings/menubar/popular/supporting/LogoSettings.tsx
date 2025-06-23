import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import OptionsToggler from '../../../supporting/OptionsToggler';
import TextEditor from '../../../text/TextEditor';
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import LogoControl from '../../../logo/LogoControl';

interface LogoSettingsProps {
  objectPath: string;
  device: 'desktop' | 'mobile';
}

const LogoSettings: React.FC<LogoSettingsProps> = ({ objectPath, device }) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings);
  const logoSettings = useAppSelector((state) => 
    device === 'mobile' 
      ? state.layoutSettings.menubar.topbar.mobile.logo
      : state.layoutSettings.menubar.topbar.desktop.logo
  );
  
  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  return (
    <div className="space-y-1 px-2">
      <OptionsToggler
        label="Logo Type"
        options={['logo', 'text']}
        value={logoSettings.use}
        onChange={(value) => handleSettingChange(`${objectPath}.use`, value)}
      />

      {logoSettings.use === 'logo' && (
        <LogoControl />
      )}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <BackgroundEditor
            objectPath={`${objectPath}.background`}
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
              objectPath={`${objectPath}.text`}
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