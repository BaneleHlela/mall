import React, { useState } from "react";
import { getSetting } from "../../../utils/helperFunctions";
import type { EditorProps } from "../../../types/layoutSettingsType";
import ColorPicker from "../supporting/ColorPicker";
import OptionsToggler from "../supporting/OptionsToggler";
import SettingsSlider from "../supporting/SettingsSlider";
import SubSettingsContainer from "../extras/SubSettingsContainer";
import BorderEditor from "./BorderEditor";

interface BackgroundEditorProps extends EditorProps {
  responsivePadding?: boolean;
  responsiveSize?: boolean;
  heightUnit?: string;
  widthUnit?: string;
}

const BackgroundEditor: React.FC<BackgroundEditorProps> = ({
  objectPath,
  settings,
  handleSettingChange,
  allow,
  responsiveSize = false,
  heightUnit = "px",
  widthUnit = "px",
  responsivePadding
}) => {
  const isAllowed = (key: string) => !allow || allow.includes(key);

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleSettingChange(`${objectPath}.${field}`, e.target.value);
  };
  const handleClear = (field: string) => () => {
    handleSettingChange(`${objectPath}.${field}`, "transparent");
  };
  const createSliderChangeHandler = (field: string, unit: string) => (newVal: number) => {
    const event = {
      target: Object.assign(document.createElement("input"), {
        value: `${newVal}${unit}`,
      }),
    } as React.ChangeEvent<HTMLInputElement>;
    handleChange(field)(event);
  };

  const getSliderProps = (unit: string) => {
    if (unit === 'vw' || unit === 'vh' || unit === "%") {
      return { min: 0, max: 100, step: 1 };
    }
    return { min: 0, max: 500, step: 1 };
  };
  const animationOptions = [
    { value: "none", label: "None" },
    { value: "upToDown", label: "Up to Down" },
    { value: "downToUp", label: "Down to Up" },
    { value: "leftToRight", label: "Left to Right" },
    { value: "rightToLeft", label: "Right to Left" },
    { value: "fade", label: "Fade" },
  ];


  return (
    <div className="space-y-1 px-2">
      {isAllowed("color") && (
        <ColorPicker
          label="Color"
          value={getSetting("color", settings, objectPath)}
          onChange={handleChange("color")}
          onClear={handleClear("color")} // 👈 added
        />
      )}
       {/* ANIMATION */}
       {isAllowed("animation") && (
          <OptionsToggler
            label="Animation"
            value={getSetting("animation", settings, objectPath) || "none"}
            options={animationOptions.map(option => option.value)}
            onChange={(value) => handleSettingChange(`${objectPath}.animation`, value)}
          />
        )}

      {isAllowed("shadow") && (
        <OptionsToggler
          label="Shadow"
          options={["true", "false"]}
          value={String(getSetting("shadow", settings, objectPath))}
          onChange={(newValue) =>
            handleChange("shadow")({
              target: { value: newValue === "true" } as unknown as HTMLInputElement,
            } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
          }
        />
      )}

      {/* Position */}
      {isAllowed("position") && (
        <OptionsToggler
          label="Position"
          options={["start", "center", "end"]}
          value={getSetting("position", settings, objectPath) || "start"}
          onChange={(newValue) =>
            handleChange("position")({
              target: { value: newValue }
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
              unit={heightUnit}
              {...getSliderProps(heightUnit)}
              onChange={createSliderChangeHandler("height.mobile", heightUnit)}
            />
            <SettingsSlider
              label="Height (Desktop)"
              value={parseInt(getSetting("height.desktop", settings, objectPath) || "120")}
              unit={heightUnit}
              {...getSliderProps(heightUnit)}
              onChange={createSliderChangeHandler("height.desktop", heightUnit)}
            />
          </>
        ) : (
          <SettingsSlider
            label="Height"
            value={parseFloat(getSetting("height", settings, objectPath) || "120")}
            unit={"vh"}
            min={.1}
            max={20}
            step={.1}
            onChange={createSliderChangeHandler("height", "vh")}
          />
        ))}

      {/* WIDTH */}
      {isAllowed("width") &&
        (responsiveSize ? (
          <>
            <SettingsSlider
              label="Width (Mobile)"
              value={parseInt(getSetting("width.mobile", settings, objectPath) || "10")}
              unit={widthUnit}
              {...getSliderProps(widthUnit)}
              onChange={createSliderChangeHandler("width.mobile", widthUnit)}
            />
            <SettingsSlider
              label="Width (Desktop)"
              value={parseInt(getSetting("width.desktop", settings, objectPath) || "20")}
              unit={widthUnit}
              {...getSliderProps(widthUnit)}
              onChange={createSliderChangeHandler("width.desktop", widthUnit)}
            />
          </>
        ) : (
          <SettingsSlider
            label="Width"
            value={parseFloat(getSetting("width", settings, objectPath) || "95")}
            unit={"vh"}
            min={.1}
            max={40}
            step={.1}
            onChange={createSliderChangeHandler("width", "vh")}
          />
        ))}

      {/* PADDING */}
      {isAllowed("padding") && (
        responsivePadding ? (
          <>
            <SettingsSlider
              label="Padding Y (Mobile)"
              value={parseFloat(getSetting("padding.y.mobile", settings, objectPath) || "2")}
              unit="vh"
              min={0.1}
              max={15}
              step={0.1}
              onChange={createSliderChangeHandler("padding.y.mobile", "vh")}
            />
            <SettingsSlider
              label="Padding Y (Desktop)"
              value={parseFloat(getSetting("padding.y.desktop", settings, objectPath) || "4")}
              unit="vh"
              min={0.1}
              max={15}
              step={0.1}
              onChange={createSliderChangeHandler("padding.y.desktop", "vh")}
            />
            <SettingsSlider
              label="Padding X (Mobile)"
              value={parseFloat(getSetting("padding.x.mobile", settings, objectPath) || "2")}
              unit="vh"
              min={0.1}
              max={15}
              step={0.1}
              onChange={createSliderChangeHandler("padding.x.mobile", "vh")}
            />
            <SettingsSlider
              label="Padding X (Desktop)"
              value={parseFloat(getSetting("padding.x.desktop", settings, objectPath) || "4")}
              unit="vh"
              min={0.1}
              max={15}
              step={0.1}
              onChange={createSliderChangeHandler("padding.x.desktop", "vh")}
            />
          </>
        ) : (
          <>
            <SettingsSlider
              label="Padding Y"
              value={parseFloat(getSetting("padding.y", settings, objectPath) || "4")}
              unit="vh"
              min={0.1}
              max={15}
              step={0.1}
              onChange={createSliderChangeHandler("padding.y", "vh")}
            />
            <SettingsSlider
              label="Padding X"
              value={parseFloat(getSetting("padding.x", settings, objectPath) || "4")}
              unit="vh"
              min={0.1}
              max={15}
              step={0.1}
              onChange={createSliderChangeHandler("padding.x", "vh")}
            />
          </>
        )
      )}

      {/* margin */}
      {isAllowed("margin") && (
        <SettingsSlider
          label="margin"
          value={parseInt(getSetting("margin", settings, objectPath) || "100")}
          unit="px"
          min={0}
          max={100}
          step={1}
          onChange={createSliderChangeHandler("margin", "px")}
        />
      )}
      {/* OPACITY */}
      {isAllowed("opacity") && (
        <SettingsSlider
          label="Opacity"
          value={parseInt(getSetting("opacity", settings, objectPath) || "100")}
          unit="%"
          min={0}
          max={100}
          step={1}
          onChange={createSliderChangeHandler("opacity", "%")}
        />
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