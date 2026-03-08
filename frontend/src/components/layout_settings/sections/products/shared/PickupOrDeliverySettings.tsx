import React from 'react';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';
import OptionsToggler from '../../../supporting/OptionsToggler';
import BackgroundEditor from '../../../background/BackgroundEditor';
import { getSetting } from '../../../../../utils/helperFunctions';

interface PickupOrDeliverySettingsProps {
  settings: any;
  handleSettingChange: (path: string, value: any) => void;
  objectPath: string;
}

const PickupOrDeliverySettings: React.FC<PickupOrDeliverySettingsProps> = ({
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
            checked={getSetting("pickupOrDelivery.show", settings, objectPath) ?? true}
            onChange={(e) => handleSettingChange(`${objectPath}.pickupOrDelivery.show`, e.target.checked)}
          />
          <label>Show Pickup or Delivery</label>
        </div>
      </div>

      <SubSettingsContainer
        name="Position"
        SettingsComponent={
          <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
            <OptionsToggler
              label="Position"
              options={["center", "start", "end"]}
              value={getSetting("pickupOrDelivery.position", settings, objectPath)}
              onChange={(value: string) => handleSettingChange(`${objectPath}.pickupOrDelivery.position`, value)}
            />
          </div>
        }
      />
      <SubSettingsContainer
        name="Font Family"
        SettingsComponent={
          <div className="border-[.1vh] rounded-[.6vh] px-[.6vh]">
            <select
              value={getSetting("pickupOrDelivery.fontFamily", settings, objectPath)}
              onChange={(e) => handleSettingChange(`${objectPath}.pickupOrDelivery.fontFamily`, e.target.value)}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>
        }
      />
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <div className="space-y-[.3vh]">
            <BackgroundEditor
              objectPath={`${objectPath}.pickupOrDelivery.background`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["width", "padding", "border"]}
              widthUnit="%"
              responsiveSize
              responsivePadding
            />
          </div>
        }
      />
    </div>
  );
};

export default PickupOrDeliverySettings;
