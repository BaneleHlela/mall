import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import type { EditorProps } from "../../../types/layoutSettingsType";
import { getSetting } from "../../../utils/helperFunctions";
import InputHandler from "../supporting/InputHandler";
import OptionsToggler from "../supporting/OptionsToggler";
import RichTextEditor from "../supporting/RichTextEditor";
import SettingsSlider from "../supporting/SettingsSlider";
import TextareaHandler from "../supporting/TextareaHandler";
import TipTapHandler from "../supporting/TipTapHandler";


const TextEditor: React.FC<EditorProps> = ({
    objectPath,
    settings,
    handleSettingChange,
    allow,
    responsiveSize = false,
    responsivePadding = false,
    useTextarea = false,
    useQuill = false
}) => {
    const isAllowed = (key: string) => !allow || allow.includes(key);
    const storeColors = useAppSelector((state) => state.layoutSettings.colors);

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

    const animationOptions = [
      "none",
      "fade-in",
      "slide-in-left",
      "slide-in-right",
      "slide-in-top",
      "slide-in-bottom",
      "bounce-in",
      "rotate-in",
      "blur-in",
      "glitch",
      "typewriter"
    ];
    const createSliderChangeHandler = (field: string, unit: string) => (newVal: number) => {
      const event = {
        target: Object.assign(document.createElement("input"), {
          value: `${newVal}${unit}`,
        }),
      } as React.ChangeEvent<HTMLInputElement>;
      handleChange(field)(event);
    };

    return (
        <div className="space-y-[.35vh]">
          {/* Input/Text Section */}
          {isAllowed("input") && (
            <div className="bg-white rounded-xl p-[1vh] shadow-sm border border-stone-100">
              <h4 className="text-[1.6vh] font-semibold text-stone-500 uppercase tracking-wide mb-2">Content</h4>
              {useQuill ? (
                <RichTextEditor
                  label=""
                  value={getSetting("input", settings, objectPath)}
                  onChange={(newValue) =>
                    handleChange("input")({
                      target: { value: newValue },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                  onFontFamilyChange={(fontFamily) =>
                    handleChange("fontFamily")({
                      target: { value: fontFamily }
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
              ) : useTextarea ? (
                <TextareaHandler
                  label="Custom Text"
                  value={getSetting("input", settings, objectPath)}
                  onChange={(newValue) =>
                    handleChange("input")({
                      target: { value: newValue },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
              ) : (
                <InputHandler
                  label="Custom Text"
                  value={getSetting("input", settings, objectPath)}
                  onChange={(newValue) =>
                    handleChange("input")({
                      target: { value: newValue },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                />
              )}
            </div>
          )}

          {/* Show/Hide Toggle */}
          {isAllowed("show") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler
                label="Show"
                options={["Yes", "No"]}
                value={getSetting("show", settings, objectPath) ? "Yes" : "No"}
                onChange={(newValue) =>
                  handleSettingChange(`${objectPath}.show`, newValue === "Yes")
                }
              />
            </div>
          )}

          {/* Animation Section */}
          {isAllowed("animation") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler
                  label="Text Animation"
                  options={animationOptions}
                  value={getSetting("animation", settings, objectPath) || "none"}
                  onChange={(newValue) =>
                      handleChange("animation")({
                          target: { value: newValue }
                      } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
                  }
              />
            </div>
          )}

          {/* Font Family Section */}
          {isAllowed("fontFamily") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler
                label="Font Family"
                options={["primary", "secondary", "tertiary"]}
                value={getSetting("fontFamily", settings, objectPath)}
                onChange={(newValue) =>
                  handleChange("fontFamily")({
                    target: { value: newValue }
                  } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
                }
                showFontPreview={true}
              />
            </div>
          )}
          
          {/* Text Color Section */}
          {isAllowed("color") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler
                label="Text Color"
                options={["primary", "secondary", "accent", "quad", "pent"]}
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

          {/* Weight Section */}
          {isAllowed("weight") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler
                label="Weight"
                options={["normal", "bold", "bolder", "lighter"]}
                value={getSetting("weight", settings, objectPath)}
                onChange={(newValue) =>
                  handleChange("weight")({
                    target: { value: newValue } } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
                  )
                }
              />
            </div>
          )}
          
          {/* Position Section */}
          {isAllowed("position") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler
                label="Text Position"
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

          {/* Background Color Section */}
          {isAllowed("backgroundColor") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler
                label="Background Color"
                options={["primary", "secondary", "accent", "quad", "pent"]}
                value={getSetting("backgroundColor", settings, objectPath)}
                onChange={(newValue) =>
                  handleChange("backgroundColor")({
                    target: { value: newValue }
                  } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
                }
                showColorSwatches={true}
              />
            </div>
          )}

          {/* Font Size Section */}
          {isAllowed("fontSize") && (
            <div className="bg-white rounded-xl p-[1.2vh] shadow-sm border border-stone-100">
              <h4 className="text-[1.6vh] font-semibold text-stone-500 uppercase tracking-wide">Font Size</h4>
              {responsiveSize ? (
                <>
                  <SettingsSlider
                    label="Mobile"
                    value={parseFloat(getSetting("fontSize.mobile", settings, objectPath) || '2.1')}
                    unit="vh"
                    step={0.1}
                    min={0.5}
                    max={20}
                    onChange={(newVal) => {
                      const event = {
                        target: Object.assign(document.createElement("input"), { value: `${newVal}vh` })
                      } as React.ChangeEvent<HTMLInputElement>;
                      handleChange("fontSize.mobile")(event);
                    }}
                  />
                  <SettingsSlider
                    label="Desktop"
                    value={parseFloat(getSetting("fontSize.desktop", settings, objectPath) || '2')}
                    unit="vh"
                    step={0.1}
                    min={0.5}
                    max={20}
                    onChange={(newVal) => {
                      const event = {
                        target: Object.assign(document.createElement("input"), { value: `${newVal}vh` })
                      } as React.ChangeEvent<HTMLInputElement>;
                      handleChange("fontSize.desktop")(event);
                    }}
                  />
                </>
              ) : (
                <SettingsSlider
                  label="Font Size"
                  value={parseFloat(getSetting("fontSize", settings, objectPath))}
                  step={0.1}
                  min={0.5}
                  max={20}
                  onChange={(newVal) => {
                    const event = {
                      target: Object.assign(document.createElement("input"), { value: `${newVal}vh` })
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleChange("fontSize")(event);
                  }}
                />
              )}
            </div>
          )}


          {/* Font Style Section */}
          {isAllowed("fontStyle") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler 
                label="Font Style"
                options={["normal", "italic", "oblique"]}
                value={getSetting("fontStyle", settings, objectPath)}
                onChange={(newValue) =>
                  handleChange("fontStyle")({
                    target: { value: newValue } } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
                  )
                }
              />
            </div>
          )}
      
          {/* Letter Spacing Section */}
          {isAllowed("letterSpacing") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <SettingsSlider
                label="Letter Spacing"
                value={parseInt(getSetting("letterSpacing", settings, objectPath))}
                unit="px"
                min={0}
                onChange={(newVal) => {
                  const event = {
                    target: Object.assign(document.createElement("input"), { value: `${newVal}px` })
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleChange("letterSpacing")(event);
                }}
              />
            </div>
          )}
      
          {/* Text Decoration Section */}
          {isAllowed("textDecoration") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler
                label="Text Decoration"
                options={["none", "underline", "through", "overline"]}
                value={getSetting("textDecoration", settings, objectPath)}
                onChange={(newValue) =>
                  handleChange("textDecoration")({
                    target: { value: newValue } } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
                  )
                }
              />
            </div>
          )}
      
          {/* Text Transform Section */}
          {isAllowed("textTransform") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler 
                label="Text Transform"
                options={["none", "uppercase", "lowercase", "capitalize"]}
                value={getSetting("textTransform", settings, objectPath)}
                onChange={(newValue) =>
                  handleChange("textTransform")({
                    target: { value: newValue } } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
                  )
                }
              />
            </div>
          )}

          {/* Line Height Section */}
          {isAllowed("lineHeight") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <SettingsSlider
                label="Line Height"
                value={parseFloat(getSetting("lineHeight", settings, objectPath) || '1.5')}
                unit=""
                step={0.1}
                min={0.5}
                max={5}
                onChange={(newVal) => {
                  const event = {
                    target: Object.assign(document.createElement("input"), { value: newVal.toString() })
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleChange("lineHeight")(event);
                }}
              />
            </div>
          )}

          {/* Text Align Section */}
          {isAllowed("textAlign") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler
                label="Text Align"
                options={["center", "left", "right", "justify"]}
                value={getSetting("textAlign", settings, objectPath)}
                onChange={(newValue) =>
                  handleSettingChange(`${objectPath}.textAlign`, newValue)
                }
              />
            </div>
          )}

          {/* Text Max Width Section */}
          {isAllowed("textMaxWidth") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <h4 className="text-[1.6vh] font-semibold text-stone-500 uppercase tracking-wide">Max Width</h4>
              <SettingsSlider
                label="Mobile"
                value={parseFloat(getSetting("textMaxWidth.mobile", settings, objectPath) || "100") }
                unit="%"
                min={10}
                max={100}
                step={1}
                onChange={createSliderChangeHandler("textMaxWidth.mobile", "%")}
              />
              <SettingsSlider
                label="Desktop"
                value={parseFloat(getSetting("textMaxWidth.desktop", settings, objectPath) || "100") }
                unit="%"
                min={10}
                max={100}
                step={1}
                onChange={createSliderChangeHandler("textMaxWidth.desktop", "%")}
              />
            </div>
          )}

          
          {/* Text Shadow Section */}
          {isAllowed("textShadow") && (
            <div className="bg-white rounded-xl px-[1vh] shadow-sm border border-stone-100">
              <OptionsToggler
                label="Text Shadow"
                options={["On", "Off"]}
                value={getSetting("textShadow", settings, objectPath) ? "On" : "Off"}
                onChange={(newValue) =>
                  handleSettingChange(`${objectPath}.textShadow`, newValue === "On")
                }
              />
            </div>
          )}

          {/* Padding Section */}
          {isAllowed("padding") && (
            <div className="bg-white rounded-xl p-[1.2vh] shadow-sm border border-stone-100">
              <h4 className="text-[1.6vh] font-semibold text-stone-500 uppercase tracking-wide">Padding</h4>
              {responsivePadding ? (
                <>
                  <SettingsSlider
                    label="Y (Mobile)"
                    value={parseFloat(getSetting("padding.y.mobile", settings, objectPath) || "2")}
                    unit="vh"
                    min={0.1}
                    max={20}
                    step={0.1}
                    onChange={createSliderChangeHandler("padding.y.mobile", "vh")}
                  />
                  <SettingsSlider
                    label="Y (Desktop)"
                    value={parseFloat(getSetting("padding.y.desktop", settings, objectPath) || "4")}
                    unit="vh"
                    min={0.1}
                    max={20}
                    step={0.1}
                    onChange={createSliderChangeHandler("padding.y.desktop", "vh")}
                  />
                  <SettingsSlider
                    label="X (Mobile)"
                    value={parseFloat(getSetting("padding.x.mobile", settings, objectPath) || "2")}
                    unit="vh"
                    min={0.1}
                    max={20}
                    step={0.1}
                    onChange={createSliderChangeHandler("padding.x.mobile", "vh")}
                  />
                  <SettingsSlider
                    label="X (Desktop)"
                    value={parseFloat(getSetting("padding.x.desktop", settings, objectPath) || "4")}
                    unit="vh"
                    min={0.1}
                    max={20}
                    step={0.1}
                    onChange={createSliderChangeHandler("padding.x.desktop", "vh")}
                  />
                </>
              ) : (
                <>
                  <SettingsSlider
                    label="Y"
                    value={parseFloat(getSetting("padding.y", settings, objectPath) || "4")}
                    unit="vh"
                    min={0.1}
                    max={20}
                    step={0.1}
                    onChange={createSliderChangeHandler("padding.y", "vh")}
                  />
                  <SettingsSlider
                    label="X"
                    value={parseFloat(getSetting("padding.x", settings, objectPath) || "4")}
                    unit="vh"
                    min={0.1}
                    max={20}
                    step={0.1}
                    onChange={createSliderChangeHandler("padding.x", "vh")}
                  />
                </>
              )}
            </div>
          )}
        </div>
      );  
}

export default TextEditor;
