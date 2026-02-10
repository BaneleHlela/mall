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
          value={parseFloat(getSetting("width", settings, objectPath) || "3")}
          unit="vh"
          min={0}
          max={5}
          step={0.1}
          onChange={(newVal) => {
            const event = {
              target: Object.assign(document.createElement("input"), {
                value: `${newVal}vh`,
              }),
            } as React.ChangeEvent<HTMLInputElement>;
            handleChange("width")(event);
          }}
        />
      )}

      {isAllowed("color") && (
        <OptionsToggler
          label="Border Color"
          options={["primary", "secondary", "accent", "quad", "pent"]}
          value={getSetting("color", settings, objectPath)}
          onChange={(newValue) =>
            handleChange("color")({
              target: { value: newValue }
            } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
          }
        />
      )}

      {isAllowed("radius") && (
        <SettingsSlider
          label="Border Radius"
          value={parseFloat(getSetting("radius", settings, objectPath) || "0")}
          unit="vh"
          min={0}
          max={60}
          step={.1}
          onChange={(newVal) => {
            const event = {
              target: Object.assign(document.createElement("input"), {
                value: `${newVal}vh`,
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
