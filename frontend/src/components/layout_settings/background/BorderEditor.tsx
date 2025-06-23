import React from "react";
import { getSetting } from "../../../utils/helperFunctions";
import type { EditorProps } from "../../../types/layoutSettingsType";
import ColorPicker from "../supporting/ColorPicker";
import OptionsToggler from "../supporting/OptionsToggler";
import SettingsSlider from "../supporting/SettingsSlider";

const BorderEditor: React.FC<EditorProps> = ({
  objectPath,
  settings,
  handleSettingChange,
  allow,
}) => {
  const isAllowed = (key: string) => !allow || allow.includes(key);

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleSettingChange(`${objectPath}.${field}`, e.target.value);
    };

  return (
    <div className="space-y-1 p-2">

      {isAllowed("style") && (
        <OptionsToggler
          label="Border Style"
          options={["none", "solid", "dashed", "dotted", "double", "groove"]}
          value={getSetting("style", settings, objectPath)}
          onChange={(newValue) =>
            handleChange("style")({
              target: { value: newValue },
            } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
          }
        />
      )}
      
      {isAllowed("width") && (
        <SettingsSlider
          label="Border Width"
          value={parseInt(getSetting("width", settings, objectPath) || "3")}
          unit="px"
          min={0}
          onChange={(newVal) => {
            const event = {
              target: Object.assign(document.createElement("input"), {
                value: `${newVal}px`,
              }),
            } as React.ChangeEvent<HTMLInputElement>;
            handleChange("width")(event);
          }}
        />
      )}

      {isAllowed("color") && (
        <ColorPicker
          label="Border Color"
          value={getSetting("color", settings, objectPath)}
          onChange={handleChange("color")}
        />
      )}

      {isAllowed("radius") && (
        <SettingsSlider
          label="Border Radius"
          value={parseInt(getSetting("radius", settings, objectPath) || "0")}
          unit="px"
          min={0}
          onChange={(newVal) => {
            const event = {
              target: Object.assign(document.createElement("input"), {
                value: `${newVal}px`,
              }),
            } as React.ChangeEvent<HTMLInputElement>;
            handleChange("radius")(event);
          }}
        />
      )}
    </div>
  );
};

export default BorderEditor;
