import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import OptionsToggler from '../../../supporting/OptionsToggler';
import TextEditor from '../../../text/TextEditor';
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import LogoControl from '../../../logo/LogoControl';

interface SimpleLogoSettingsProps {
  objectPath: string;
}

const SimpleLogoSettings: React.FC<SimpleLogoSettingsProps> = ({ objectPath }) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings);
  const logoSettings = useAppSelector((state) => state.layoutSettings.menubar.topbar.logo);
  
  console.log(logoSettings)
  
  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  return (
    <div className="flex flex-col items-center space-y-[1vh]">
      <OptionsToggler
        label="Logo Type"
        options={['logo', 'text']}
        value={logoSettings.use}
        onChange={(value) => handleSettingChange(`${objectPath}.use`, value)}
      />

      {logoSettings.use === 'logo' && (
        <LogoControl />
      )}

      {logoSettings.use === 'text' && (
        <SubSettingsContainer
          name="Text"
          SettingsComponent={
            <TextEditor
              objectPath={`${objectPath}.text`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={['input', 'fontSize', 'weight', 'letterSpacing', "textDecoration"]}
              responsiveSize
            />
          }
        />
      )}
    </div>
  );
};

export default SimpleLogoSettings;