import React from 'react';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import OptionsToggler from '../../../supporting/OptionsToggler';
import TextEditor from '../../../text/TextEditor';
import BackgroundEditor from '../../../background/BackgroundEditor';
import { getSetting } from '../../../../../utils/helperFunctions';

interface AcceptingOrdersButtonSettingsProps {
  settings: any;
  handleSettingChange: (path: string, value: any) => void;
  objectPath: string;
}

const AcceptingOrdersButtonSettings: React.FC<AcceptingOrdersButtonSettingsProps> = ({
  settings,
  handleSettingChange,
  objectPath,
}) => {
  return (
    <div className="space-y-[.3vh]">
      {/* Show Toggle */}
      <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={getSetting("acceptingOrdersButton.show", settings, objectPath) ?? true}
            onChange={(e) => handleSettingChange(`${objectPath}.acceptingOrdersButton.show`, e.target.checked)}
          />
          <label>Show Accepting Orders Button</label>
        </div>
      </div>

      <SubSettingsContainer
        name="Position"
        SettingsComponent={
          <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
            <OptionsToggler
              label="Position"
              options={["center", "start", "end"]}
              value={getSetting("acceptingOrdersButton.position", settings, objectPath)}
              onChange={(value) => handleSettingChange(`${objectPath}.acceptingOrdersButton.position`, value)}
            />
          </div>
        }
      />
      <SubSettingsContainer
        name="Text"
        SettingsComponent={
          <div className="px-2">
            <TextEditor
              objectPath={`${objectPath}.acceptingOrdersButton.text`}
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
            objectPath={`${objectPath}.acceptingOrdersButton.background`}
            settings={settings}
            handleSettingChange={handleSettingChange}
            allow={["color", "shadow", "border", "padding", "shadow"]}
            widthUnit='%'
            responsiveSize={false}
          />
        }
      />
    </div>
  );
};

export default AcceptingOrdersButtonSettings;
