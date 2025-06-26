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
}

const StoreButtonSettings: React.FC<StoreButtonSettingsProps> = ({ objectPath, settings }) => {
  const dispatch = useAppDispatch();

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };
  const buttonFunctions = ['bookNow', 'callNow', 'getQuote', 'orderOnline'];

  return (
    <div className="space-y-1 p-2 ">
      <h3 className="text-lg font-semibold text-center">Button Settings</h3>
      
      <OptionsToggler
            label="Button Function"
            options={buttonFunctions}
            value={getSetting('function', settings, objectPath)}
            onChange={(value) => handleSettingChange(`${objectPath}.function`, value)}
        />

      <SubSettingsContainer
        name="Text"
        SettingsComponent={
            <div className="px-2">
                <TextEditor
                    objectPath={`${objectPath}.style.text`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["input", "fontFamily", "color", "fontSize", "weight"]}
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
            allow={["color", "height", "width", "shadow", "border", "padding", "shadow"]}
            responsiveSize={false}
          />
        }
      />
    </div>
  );
};

export default StoreButtonSettings;