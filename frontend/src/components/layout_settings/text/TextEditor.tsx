import { useAppSelector } from "../../../app/hooks";
import type { EditorProps } from "../../../types/layoutSettingsType";
import { getSetting } from "../../../utils/helperFunctions";
import ColorPicker from "../supporting/ColorPicker";
import InputHandler from "../supporting/InputHandler";
import OptionsToggler from "../supporting/OptionsToggler";
import SettingsSlider from "../supporting/SettingsSlider";
import TextareaHandler from "../supporting/TextareaHandler";


const TextEditor: React.FC<EditorProps> = ({
    objectPath,
    settings,
    handleSettingChange,
    allow,
    responsiveSize = false,
    responsivePadding = false
}) => {
    const isAllowed = (key: string) => !allow || allow.includes(key);
    const availableFonts = useAppSelector((state) => state.layoutSettings.fonts);


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

    const handleClear = (field: string) => () => {
      handleSettingChange(`${objectPath}.${field}`, "transparent");
    };

    return (
        <div className="space-y-1 px-2">
          {isAllowed("input") && (
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
          {isAllowed("textArea") && (
            <TextareaHandler
              label="Custom Long Text"
              value={getSetting("textArea", settings, objectPath)}
              onChange={(newValue) =>
                handleChange("textArea")({
                  target: { value: newValue },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            />
          )}
          {isAllowed("show") && (
            <OptionsToggler
              label="Show"
              options={["Yes", "No"]}
              value={getSetting("show", settings, objectPath) ? "Yes" : "No"}
              onChange={(newValue) =>
                handleSettingChange(`${objectPath}.show`, newValue === "Yes")
              }
            />
          )}
          {isAllowed("animation") && (
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
          )}
          {isAllowed("fontFamily") && (
            <OptionsToggler
              label="Font Family"
              options={Object.values(availableFonts || {})}
              value={getSetting("fontFamily", settings, objectPath)}
              onChange={(newValue) =>
                handleChange("fontFamily")({
                  target: { value: newValue }
                } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
              }
            />
          )}
          
          {isAllowed("color") && (
            <ColorPicker
              label="Color"
              value={getSetting("color", settings, objectPath)}
              onChange={handleChange("color")}
            />
          )}

      
          {isAllowed("weight") && (
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
          )}
          
          {isAllowed("position") && (
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
          )}

          {isAllowed("backgroundColor") && (
            <ColorPicker
              label="Background Color"
              value={getSetting("backgroundColor", settings, objectPath)}
              onChange={handleChange("backgroundColor")}
              onClear={handleClear("backgroundColor")} // 👈 added
            />
          )}
      
          {isAllowed("fontSize") && (
            responsiveSize ? (
              <>
                <SettingsSlider
                  label="Font Size (Phone)"
                  value={parseFloat(getSetting("fontSize.mobile", settings, objectPath) || '2.1')}
                  unit="vh"
                  step={0.1}
                  min={0.5}
                  max={15}
                  onChange={(newVal) => {
                    const event = {
                      target: Object.assign(document.createElement("input"), { value: `${newVal}vh` })
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleChange("fontSize.mobile")(event);
                  }}
                />
                <SettingsSlider
                  label="Font Size (PC)"
                  value={parseFloat(getSetting("fontSize.desktop", settings, objectPath) || '2')}
                  unit="vh"
                  step={0.1}
                  min={0.5}
                  max={15}
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
                max={15}
                onChange={(newVal) => {
                  const event = {
                    target: Object.assign(document.createElement("input"), { value: `${newVal}vh` })
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleChange("fontSize")(event);
                }}
              />
            )
          )}


          {isAllowed("fontStyle") && (
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
          )}
      
          {isAllowed("letterSpacing") && (
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
          )}
      
          {isAllowed("textDecoration") && (
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
          )}
      
          {isAllowed("textTransform") && (
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
          )}

          {isAllowed("lineHeight") && (
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
          )}
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
        </div>
      );
      
}

export default TextEditor;