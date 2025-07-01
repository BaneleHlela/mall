import { useAppSelector } from "../../../app/hooks";
import type { EditorProps } from "../../../types/layoutSettingsType";
import { getSetting } from "../../../utils/helperFunctions";
import ColorPicker from "../supporting/ColorPicker";
import InputHandler from "../supporting/InputHandler";
import OptionsToggler from "../supporting/OptionsToggler";
import SettingsSlider from "../supporting/SettingsSlider";


const TextEditor: React.FC<EditorProps> = ({
    objectPath,
    settings,
    handleSettingChange,
    allow,
    responsiveSize = false,
}) => {
    const isAllowed = (key: string) => !allow || allow.includes(key);
    const availableFonts = useAppSelector((state) => state.layoutSettings.fonts);


    const handleChange =
        (field: string) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        handleSettingChange(`${objectPath}.${field}`, e.target.value);
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
      
          {isAllowed("fontSize") && (
            responsiveSize ? (
              <>
                <SettingsSlider
                  label="Font Size (Phone)"
                  value={parseInt(getSetting("fontSize.mobile", settings, objectPath) || '16')}
                  unit="px"
                  onChange={(newVal) => {
                    const event = {
                      target: Object.assign(document.createElement("input"), { value: `${newVal}px` })
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleChange("fontSize.mobile")(event);
                  }}
                />
                <SettingsSlider
                  label="Font Size (PC)"
                  value={parseInt(getSetting("fontSize.desktop", settings, objectPath) || '16')}
                  unit="px"
                  onChange={(newVal) => {
                    const event = {
                      target: Object.assign(document.createElement("input"), { value: `${newVal}px` })
                    } as React.ChangeEvent<HTMLInputElement>;
                    handleChange("fontSize.desktop")(event);
                  }}
                />
              </>
            ) : (
              <SettingsSlider
                label="Font Size"
                value={parseInt(getSetting("fontSize", settings, objectPath))}
                unit="px"
                onChange={(newVal) => {
                  const event = {
                    target: Object.assign(document.createElement("input"), { value: `${newVal}px` })
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

        </div>
      );
      
}

export default TextEditor;