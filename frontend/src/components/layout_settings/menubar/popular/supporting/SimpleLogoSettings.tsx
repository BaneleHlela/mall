import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import OptionsToggler from '../../../supporting/OptionsToggler';
import TextEditor from '../../../text/TextEditor';
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import { getSetting } from '../../../../../utils/helperFunctions';
import MultipleLayoutImagesHandler from '../../../supporting/MultipleLayoutImagesHandler';

interface SimpleLogoSettingsProps {
  objectPath: string;
}

const SimpleLogoSettings: React.FC<SimpleLogoSettingsProps> = ({ objectPath }) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings);
  const logoSettings = getSetting("", settings, objectPath);
    
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
      {/* Logo Images */}
      {logoSettings.use === 'logo' && (
        <MultipleLayoutImagesHandler
          objectPath={`${objectPath}.logoUrl`}
          min={1}
          max={2}
          images={getSetting("logoUrl", settings, objectPath)}
        />
      )}

      {logoSettings.use === 'text' && (
        <SubSettingsContainer
          name="Text"
          SettingsComponent={
            <TextEditor
              objectPath={`${objectPath}.style.text`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={['input', 'fontSize', 'weight', 'letterSpacing', "textDecoration"]}
              responsiveSize
            />
          }
        />
      )}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <BackgroundEditor
            objectPath={`${objectPath}.style.background`}
            settings={settings}
            handleSettingChange={handleSettingChange}
            allow={['color', "width", "padding"]}
            responsiveSize
            responsivePadding
            widthUnit='%'
            heightUnit='%'
          />
        }
      />
    </div>
  );
};

export default SimpleLogoSettings;