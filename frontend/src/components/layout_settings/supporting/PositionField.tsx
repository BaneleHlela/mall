import React from "react";
import { getSetting } from "../../../utils/helperFunctions";
import OptionsToggler from "./OptionsToggler";
import SettingsSlider from "./SettingsSlider";

// A responsive (mobile/desktop) numeric setting that can be switched off entirely,
// removing it from the settings object so it stops overriding layout defaults
// (e.g. so a flex-based justify/position setting can take over instead of a fixed value).
interface PositionFieldProps {
  label: string;
  path: string; // dot path relative to objectPath, e.g. "placement.top"
  settings: any;
  objectPath: string;
  handleSettingChange: (field: string, value: any) => void;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
}

const PositionField: React.FC<PositionFieldProps> = ({
  label,
  path,
  settings,
  objectPath,
  handleSettingChange,
  unit = "%",
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
}) => {
  const current = getSetting(path, settings, objectPath);
  const isEnabled = current !== undefined && current !== null;

  const toggleEnabled = (enabled: boolean) => {
    handleSettingChange(
      `${objectPath}.${path}`,
      enabled
        ? { mobile: `${defaultValue}${unit}`, desktop: `${defaultValue}${unit}` }
        : undefined
    );
  };

  return (
    <div className="space-y-[.3vh]">
      <OptionsToggler
        label={label}
        options={["Off", "On"]}
        value={isEnabled ? "On" : "Off"}
        onChange={(newValue) => toggleEnabled(newValue === "On")}
      />
      {isEnabled && (
        <div className="pl-[1.2vh] space-y-[.3vh]">
          <SettingsSlider
            label="Mobile"
            value={parseFloat(getSetting(`${path}.mobile`, settings, objectPath) ?? defaultValue)}
            unit={unit}
            step={step}
            min={min}
            max={max}
            onChange={(newVal) => handleSettingChange(`${objectPath}.${path}.mobile`, `${newVal}${unit}`)}
          />
          <SettingsSlider
            label="Desktop"
            value={parseFloat(getSetting(`${path}.desktop`, settings, objectPath) ?? defaultValue)}
            unit={unit}
            step={step}
            min={min}
            max={max}
            onChange={(newVal) => handleSettingChange(`${objectPath}.${path}.desktop`, `${newVal}${unit}`)}
          />
        </div>
      )}
    </div>
  );
};

export default PositionField;
