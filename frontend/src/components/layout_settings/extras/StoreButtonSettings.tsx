import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import TextEditor from '../text/TextEditor';
import BackgroundEditor from '../background/BackgroundEditor';
import SubSettingsContainer from './SubSettingsContainer';
import OptionsToggler from '../supporting/OptionsToggler';
import { getSetting } from '../../../utils/helperFunctions';

interface StoreButtonSettingsProps {
  objectPath: string;
  settings: any;
  allowPosition?: boolean;
  allowShow?: boolean;
  allowFunction?: boolean;
}

const StoreButtonSettings: React.FC<StoreButtonSettingsProps> = ({ 
  objectPath, 
  settings, 
  allowPosition,
  allowShow = false,
  allowFunction = false
}) => {
  const dispatch = useAppDispatch();

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };
  const buttonFunctions = ['book', 'call', 'buy', 'subscribe'];

  return (
    <div className="space-y-1 p-2 ">
      <h3 className="text-lg font-semibold text-center">Button Settings</h3>
      {allowFunction && (
        <OptionsToggler
          label="Button Function"
          options={buttonFunctions}
          value={getSetting('function', settings, objectPath)}
          onChange={(value) => handleSettingChange(`${objectPath}.function`, value)}
        />
      )}

      {allowPosition && (
        <OptionsToggler
          label="Position"
          options={["center", "start", "end"]}
          value={getSetting('position', settings, objectPath)}
          onChange={(value) => handleSettingChange(`${objectPath}.position`, value)}
        />
      )}
      {allowShow && (
        <>
          <OptionsToggler
            label="Show (Mobile)"
            options={["never", "on-hover", "always"]}
            value={getSetting('show.mobile', settings, objectPath)}
            onChange={(value) => handleSettingChange(`${objectPath}.show.mobile`, value)}
          />
          <OptionsToggler
            label="Show (Desktop)"
            options={["never", "on-hover", "always"]}
            value={getSetting('show.desktop', settings, objectPath)}
            onChange={(value) => handleSettingChange(`${objectPath}.show.desktop`, value)}
          />
        </>
      )}
      <SubSettingsContainer
        name="Text"
        SettingsComponent={
            <div className="px-2">
                <TextEditor
                    objectPath={`${objectPath}.style.text`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["input", "fontFamily", "color", "fontSize", "weight", "animation", "lineHeight"]}
                    responsiveSize={false}
                />
            </div> 
        }
      />

      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <BackgroundEditor
            objectPath={`${objectPath}.style.background`}
            settings={settings}
            handleSettingChange={handleSettingChange}
            allow={["color", "width", "height", "shadow", "border", "padding", "shadow", ]}
            widthUnit='%'
            responsiveSize={false}
          />
        }
      />
    </div>
  );
};

export default StoreButtonSettings;