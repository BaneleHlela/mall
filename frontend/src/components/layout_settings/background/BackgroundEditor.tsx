import React from "react";
import { getSetting } from "../../../utils/helperFunctions";
import type { EditorProps } from "../../../types/layoutSettingsType";
import ColorPicker from "../supporting/ColorPicker";
import OptionsToggler from "../supporting/OptionsToggler";
import SettingsSlider from "../supporting/SettingsSlider";
import SubSettingsContainer from "../extras/SubSettingsContainer";
import BorderEditor from "./BorderEditor";

interface BackgroundEditorProps extends EditorProps {
  responsiveSize?: boolean; // NEW: Optional prop
  unit?: string;
}

const BackgroundEditor: React.FC<BackgroundEditorProps> = ({
  objectPath,
  settings,
  handleSettingChange,
  allow,
  responsiveSize = false, 
  unit = "px",
}) => {
  const isAllowed = (key: string) => !allow || allow.includes(key);


  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleSettingChange(`${objectPath}.${field}`, e.target.value);
  };

  const createSliderChangeHandler = (field: string) => (newVal: number) => {
    const event = {
      target: Object.assign(document.createElement("input"), {
        value: `${newVal}${unit}`,
      }),
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(field)(event);
  };

  return (
    <div className="space-y-1 px-2 py-1">
      {isAllowed("color") && (
        <ColorPicker
          label="Background Color"
          value={getSetting("color", settings, objectPath)}
          onChange={handleChange("color")}
        />
      )}

      {isAllowed("shadow") && (
        <OptionsToggler
          label="Shadow"
          options={["true", "false"]}
          value={String(getSetting("shadow", settings, objectPath))} // Convert value to boolean
          onChange={(newValue) =>
            handleChange("shadow")({
              target: { value: newValue === "true" } as unknown as HTMLInputElement, // Convert newValue to boolean
            } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
          }
        />
      )}

      {/* HEIGHT */}
      {isAllowed("height") &&
        (responsiveSize ? (
          <>
            <SettingsSlider
              label="Height (Mobile)"
              value={parseInt(getSetting("height.mobile", settings, objectPath) || "110")}
              unit={unit}
              min={0}
              max={500}
              onChange={createSliderChangeHandler("height.mobile")}
            />
            <SettingsSlider
              label="Height (Desktop)"
              value={parseInt(getSetting("height.desktop", settings, objectPath) || "120")}
              unit={unit}
              min={0}
              max={500}
              onChange={createSliderChangeHandler("height.desktop")}
            />
          </>
        ) : (
          <SettingsSlider
            label="Height"
            value={parseInt(getSetting("height", settings, objectPath) || "120")}
            unit={unit}
            min={0}
            max={500}
            onChange={createSliderChangeHandler("height")}
          />
        ))}

      {/* WIDTH */}
      {isAllowed("width") &&
        (responsiveSize ? (
          <>
            <SettingsSlider
              label="Width (Mobile)"
              value={parseInt(getSetting("width.mobile", settings, objectPath) || "10")}
              unit={unit}
              min={10}
              step={1}
              max={500}
              onChange={createSliderChangeHandler("width.mobile")}
            />
            <SettingsSlider
              label="Width (Desktop)"
              value={parseInt(getSetting("width.desktop", settings, objectPath) || "20")}
              unit={unit}
              min={10}
              step={1}
              max={500}
              onChange={createSliderChangeHandler("width.desktop")}
            />
          </>
        ) : (
          <SettingsSlider
            label="Width"
            value={parseInt(getSetting("width", settings, objectPath) || "95")}
            unit={unit}
            min={0}
            step={1}
            max={500}
            onChange={createSliderChangeHandler("width")}
          />
        ))}

      {/* PADDING */}
      {isAllowed("padding") && (
        <>
          <SettingsSlider
            label="Padding Y"
            value={parseInt(getSetting("padding.y", settings, objectPath) || "50")}
            unit={unit}
            min={0}
            max={100}
            step={1}
            onChange={createSliderChangeHandler("padding.y")}
          />
          <SettingsSlider
            label="Padding X"
            value={parseInt(getSetting("padding.x", settings, objectPath) || "50")}
            unit={unit}
            min={0}
            max={100}
            step={1}
            onChange={createSliderChangeHandler("padding.x")}
          />
        </>
      )}

      {/* BORDER */}
      {isAllowed("border") && (
        <SubSettingsContainer
          name="Border"
          SettingsComponent={
            <BorderEditor
              objectPath={`${objectPath}.border`}
              handleSettingChange={handleSettingChange}
              settings={settings}
            />
          }
        />
      )}
    </div>
  );
};

export default BackgroundEditor;