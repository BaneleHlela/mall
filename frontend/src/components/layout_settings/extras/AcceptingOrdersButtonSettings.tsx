import React from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { updateSetting } from '../../../features/layouts/layoutSettingsSlice';
import TextEditor from '../text/TextEditor';
import BackgroundEditor from '../background/BackgroundEditor';
import SubSettingsContainer from './SubSettingsContainer';
import OptionsToggler from '../supporting/OptionsToggler';
import { getSetting } from '../../../utils/helperFunctions';

interface AcceptingOrdersButtonSettingsProps {
  objectPath: string;
  settings: any;
}

const AcceptingOrdersButtonSettings: React.FC<AcceptingOrdersButtonSettingsProps> = ({
  objectPath,
  settings,
}) => {
  const dispatch = useAppDispatch();

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  return (
    <div className="space-y-[.35vh]">
      <h3 className="text-[2.5vh] font-semibold text-center">Accepting Orders Button Settings</h3>
      <SubSettingsContainer
        name="Position"
        SettingsComponent={
          <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
            <OptionsToggler
              label="Position"
              options={["center", "start", "end"]}
              value={getSetting("position", settings, objectPath)}
              onChange={(value) => handleSettingChange(`${objectPath}.position`, value)}
            />
          </div>
        }
      />
      <SubSettingsContainer
        name="Text"
        SettingsComponent={
            <div className="px-2">
                <TextEditor
                    objectPath={`${objectPath}.text`}
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
            objectPath={`${objectPath}.background`}
            settings={settings}
            handleSettingChange={handleSettingChange}
            allow={["color",  "shadow", "border", "padding", "shadow", ]}
            widthUnit='%'
            responsiveSize={false}
          />
        }
      />
    </div>
  );
};

export default AcceptingOrdersButtonSettings;