import React from 'react';
import { getSetting } from '../../../utils/helperFunctions';
import OptionsToggler from '../supporting/OptionsToggler';
import SettingsSlider from '../supporting/SettingsSlider';


interface ResponsiveGridSettingsProps {
  objectPath: string;
  settings: any;
  handleSettingChange: (path: string, value: any) => void;
  columnOptions?: {
    mobile: string[];
    desktop: string[];
  };
  gapRange?: {
    mobile: { min: number; max: number };
    desktop: { min: number; max: number };
  };
}

const ResponsiveGridSettings: React.FC<ResponsiveGridSettingsProps> = ({
  objectPath,
  settings,
  handleSettingChange,
  columnOptions = { mobile: ['1', '2'], desktop: ['3', '4', '5'] },
  gapRange = {
    mobile: { min: 0, max: 5 },
    desktop: { min: 0, max: 10 },
  },
}) => {
  return (
    <div className="px-1 space-y-2 py-1">
      {/* Grid Columns */}
      <div className="border rounded px-1 text-center space-y-2">
        <label className="block text-[1.4vh] font-medium text-gray-700">Grid Columns</label>
        <OptionsToggler
          label="Mobile"
          options={columnOptions.mobile}
          value={getSetting('mobile', settings, `${objectPath}.columns`).toString()}
          onChange={(value) =>
            handleSettingChange(`${objectPath}.columns.mobile`, parseInt(value))
          }
        />

        <OptionsToggler
          label="Desktop"
          options={columnOptions.desktop}
          value={getSetting('desktop', settings, `${objectPath}.columns`).toString()}
          onChange={(value) =>
            handleSettingChange(`${objectPath}.columns.desktop`, parseInt(value))
          }
        />
      </div>

      {/* Grid Gap */}
      <div className="border rounded px-1 text-center space-y-2">
        <label className="block text-[1.4vh] font-medium text-gray-700">Grid Gap</label>

        <SettingsSlider
          label="Mobile Gap"
          value={parseFloat(getSetting('mobile', settings, `${objectPath}.gap`))}
          unit="vh"
          min={gapRange.mobile.min}
          max={gapRange.mobile.max}
          step={.1}
          onChange={(newValue) =>
            handleSettingChange(`${objectPath}.gap.mobile`, `${newValue}vh`)
          }
        />

        <SettingsSlider
          label="Desktop Gap"
          value={parseInt(getSetting('desktop', settings, `${objectPath}.gap`))}
          unit="vh"
          min={gapRange.desktop.min}
          max={gapRange.desktop.max}
          step={.1}
          onChange={(newValue) =>
            handleSettingChange(`${objectPath}.gap.desktop`, `${newValue}vh`)
          }
        />
      </div>
    </div>
  );
};

export default ResponsiveGridSettings;
