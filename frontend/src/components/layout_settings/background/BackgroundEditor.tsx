import React, { useEffect } from "react";
import { getSetting } from "../../../utils/helperFunctions";
import type { EditorProps } from "../../../types/layoutSettingsType";
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
  heightUnit = "vh",
  widthUnit = "vw",
  responsivePadding
}) => {
  const isAllowed = (key: string) => !allow || allow.includes(key);

  useEffect(() => {
    if (responsivePadding) {
      const currentPadding = getSetting("padding", settings, objectPath);
      if (currentPadding && typeof currentPadding === 'object' && currentPadding.x && currentPadding.y && typeof currentPadding.x === 'string' && typeof currentPadding.y === 'string' && !currentPadding.x.mobile) {
        // It's the old format { x: "val", y: "val" }, convert to responsive
        handleSettingChange(`${objectPath}.padding`, {
          x: { mobile: currentPadding.x, desktop: currentPadding.x },
          y: { mobile: currentPadding.y, desktop: currentPadding.y }
        });
      }
    }
  }, [responsivePadding, settings, objectPath, handleSettingChange]);

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
    if (unit === 'vw' || unit === 'vh' ) {
      return { min: 0, max: 150, step: 1 };
    }
    if (unit === "%") {
      return { min: 0, max: 100, step: 1 };
    }
    return { min: .1, max: 35, step: .1 };
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
    <div className="space-y-[.4vh]">
        {/* Color Section */}
        {isAllowed("color") && (
          <div className="bg-white rounded-xl shadow-sm border border-stone-100 px-[1vh]">
            <OptionsToggler
              label="Color"
              options={["primary", "secondary", "accent", "quad", "pent", "transparent"]}
              value={getSetting("color", settings, objectPath)}
              onChange={(newValue) =>
                handleChange("color")({
                  target: { value: newValue }
                } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
              }
              showColorSwatches={true}
            />
          </div>
        )}
       
        {/* Animation Section */}
        {isAllowed("animation") && (
          <div className="bg-white rounded-xl p-[1.5vh] shadow-sm border border-stone-100">
            <OptionsToggler
              label="Animation"
              value={getSetting("animation", settings, objectPath) || "none"}
              options={animationOptions.map(option => option.value)}
              onChange={(value) => handleSettingChange(`${objectPath}.animation`, value)}
            />
          </div>
        )}

      {/* Shadow Section */}
      {isAllowed("shadow") && (
        <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
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
        </div>
      )}

      {/* Position Section */}
      {isAllowed("position") && (
        <div className="bg-white rounded-xl p-[1.5vh] shadow-sm border border-stone-100">
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
        </div>
      )}

      {/* Height Section */}
      {isAllowed("height") && (
        <div className="bg-white rounded-xl p-[1.5vh] shadow-sm border border-stone-100">
          <h4 className="text-[1.5vh] font-semibold text-stone-500 uppercase tracking-wide">Height</h4>
          {responsiveSize ? (
            <>
              <SettingsSlider
                label="Mobile"
                value={parseInt(getSetting("height.mobile", settings, objectPath) || "110")}
                unit={heightUnit}
                {...getSliderProps(heightUnit)}
                onChange={createSliderChangeHandler("height.mobile", heightUnit)}
              />
              <SettingsSlider
                label="Desktop"
                value={parseInt(getSetting("height.desktop", settings, objectPath) || "120")}
                unit={heightUnit}
                {...getSliderProps(heightUnit)}
                onChange={createSliderChangeHandler("height.desktop", heightUnit)}
              />
            </>
          ) : heightUnit ? (
            <SettingsSlider
              label="Height"
              value={parseInt(getSetting("height", settings, objectPath) || "10")}
              unit={heightUnit}
              {...getSliderProps(heightUnit)}
              onChange={createSliderChangeHandler("height", heightUnit)}
            />
          ) : (
            <SettingsSlider
              label="Height"
              value={parseFloat(getSetting("height", settings, objectPath) || "10")}
              unit={"vh"}
              min={.1}
              max={20}
              step={.1}
              onChange={createSliderChangeHandler("height", "vh")}
            />)
          }
        </div>
      )}

      {/* Width Section */}
      {isAllowed("width") && (
        <div className="bg-white rounded-xl p-[1.5vh] shadow-sm border border-stone-100">
          <h4 className="text-[1.5vh] font-semibold text-stone-500 uppercase tracking-wide">Width</h4>
          {responsiveSize ? (
            <>
              <SettingsSlider
                label="Mobile"
                value={parseInt(getSetting("width.mobile", settings, objectPath) || "10")}
                unit={widthUnit}
                {...getSliderProps(widthUnit)}
                onChange={createSliderChangeHandler("width.mobile", widthUnit)}
              />
              <SettingsSlider
                label="Desktop"
                value={parseInt(getSetting("width.desktop", settings, objectPath) || "20")}
                unit={widthUnit}
                {...getSliderProps(widthUnit)}
                onChange={createSliderChangeHandler("width.desktop", widthUnit)}
              />
            </>
          ) : widthUnit ? (
            <SettingsSlider
              label="Width"
              value={parseInt(getSetting("width", settings, objectPath) || "20")}
              unit={widthUnit}
              {...getSliderProps(widthUnit)}
              onChange={createSliderChangeHandler("width", widthUnit)}
            />
          ) : (
            <SettingsSlider
              label="Width"
              value={parseFloat(getSetting("width", settings, objectPath) || "20")}
              unit={"vw"}
              min={.1}
              max={100}
              step={.1}
              onChange={createSliderChangeHandler("width", "vw")}
            />
          )}
        </div>
      )}

      {/* Padding Section */}
      {isAllowed("padding") && (
        <div className="bg-white rounded-xl p-[1.5vh] shadow-sm border border-stone-100">
          <h4 className="text-[1.5vh] font-semibold text-stone-500 uppercase tracking-wide">Padding</h4>
          {responsivePadding ? (
            <>
              <SettingsSlider
                label="Y (Mobile)"
                value={parseFloat(getSetting("padding.y.mobile", settings, objectPath) || "2")}
                unit="vh"
                min={0}
                max={30}
                step={0.2}
                onChange={createSliderChangeHandler("padding.y.mobile", "vh")}
              />
              <SettingsSlider
                label="Y (Desktop)"
                value={parseFloat(getSetting("padding.y.desktop", settings, objectPath) || "4")}
                unit="vh"
                min={0}
                max={30}
                step={0.2}
                onChange={createSliderChangeHandler("padding.y.desktop", "vh")}
              />
              <SettingsSlider
                label="X (Mobile)"
                value={parseFloat(getSetting("padding.x.mobile", settings, objectPath) || "2")}
                unit="vh"
                min={0}
                max={30}
                step={0.2}
                onChange={createSliderChangeHandler("padding.x.mobile", "vh")}
              />
              <SettingsSlider
                label="X (Desktop)"
                value={parseFloat(getSetting("padding.x.desktop", settings, objectPath) || "4")}
                unit="vh"
                min={0}
                max={30}
                step={0.2}
                onChange={createSliderChangeHandler("padding.x.desktop", "vh")}
              />
            </>
          ) : (
            <>
              <SettingsSlider
                label="Y"
                value={parseFloat(getSetting("padding.y", settings, objectPath) || "4")}
                unit="vh"
                min={0}
                max={30}
                step={0.2}
                onChange={createSliderChangeHandler("padding.y", "vh")}
              />
              <SettingsSlider
                label="X"
                value={parseFloat(getSetting("padding.x", settings, objectPath) || "4")}
                unit="vh"
                min={0}
                max={30}
                step={0.2}
                onChange={createSliderChangeHandler("padding.x", "vh")}
              />
            </>
          )}
        </div>
      )}

      {/* Margin Section */}
      {isAllowed("margin") && (
        <div className="bg-white rounded-xl p-[1.5vh] shadow-sm border border-stone-100">
          <SettingsSlider
            label="Margin"
            value={parseInt(getSetting("margin", settings, objectPath) || "100")}
            unit="px"
            min={0}
            max={100}
            step={1}
            onChange={createSliderChangeHandler("margin", "px")}
          />
        </div>
      )}
      
      {/* Opacity Section */}
      {isAllowed("opacity") && (
        <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
          <SettingsSlider
            label="Opacity"
            value={parseInt(getSetting("opacity", settings, objectPath) || "100")}
            unit="%"
            min={0}
            max={100}
            step={1}
            onChange={createSliderChangeHandler("opacity", "%")}
          />
        </div>
      )}
      
      {/* Border Section */}
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
