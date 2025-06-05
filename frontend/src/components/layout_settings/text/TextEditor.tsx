import type { EditorProps } from "../../../types/layoutSettingsType";
import { getSetting } from "../../../utils/helperFunctions";
import GoogleFontsSelector from "./GoogleFontsSelector";



const TextEditor: React.FC<EditorProps> = ({
    objectPath,
    settings,
    handleSettingChange,
    allow,
}) => {
    const isAllowed = (key: string) => !allow || allow.includes(key);


    const isFontLoaded = (font: string) => {
        return Array.from(document.styleSheets).some((styleSheet) =>
          styleSheet.href?.includes(font.replace(/ /g, "+"))
        );
    };
      
    const handleFontSelect = (font: string) => {
    handleSettingChange(`${objectPath}.fontFamily`, font);
    
    if (!isFontLoaded(font)) {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }
    };
    

    const handleChange =
        (field: string) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        handleSettingChange(`${objectPath}.${field}`, e.target.value);
    };

    return (
        <div>
          {isAllowed("fontFamily") && (
            <GoogleFontsSelector onFontSelect={handleFontSelect} />
          )}
      
          {isAllowed("color") && (
            <div className="flex items-center gap-2">
              <label className="w-32">Color</label>
              <input
                type="color"
                onChange={handleChange("color")}
                className="w-10 h-10 rounded-md border"
              />
            </div>
          )}
      
          {isAllowed("weight") && (
            <div className="flex items-center gap-2">
              <label className="w-32">Weight</label>
              <select
                value={getSetting("weight", settings, objectPath)}
                onChange={handleChange("weight")}
                className="border rounded-md px-2 py-1"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="bolder">Bolder</option>
                <option value="lighter">Lighter</option>
              </select>
            </div>
          )}
      
          {isAllowed("fontSize") && (
            <div className="flex items-center gap-2">
              <label className="w-32">Font Size</label>
              <input
                type="text"
                value={getSetting("fontSize", settings, objectPath)}
                onChange={handleChange("fontSize")}
                className="border rounded-md px-2 py-1 w-full"
                placeholder="e.g., 16px"
              />
            </div>
          )}
      
          {isAllowed("fontStyle") && (
            <div className="flex items-center gap-2">
              <label className="w-32">Font Style</label>
              <select
                value={getSetting("fontStyle", settings, objectPath)}
                onChange={handleChange("fontStyle")}
                className="border rounded-md px-2 py-1"
              >
                <option value="normal">Normal</option>
                <option value="italic">Italic</option>
                <option value="oblique">Oblique</option>
              </select>
            </div>
          )}
      
          {isAllowed("letterSpacing") && (
            <div className="flex items-center gap-2">
              <label className="w-32">Letter Spacing</label>
              <input
                type="text"
                value={getSetting("letterSpacing", settings, objectPath)}
                onChange={handleChange("letterSpacing")}
                className="border rounded-md px-2 py-1 w-full"
                placeholder="e.g., normal"
              />
            </div>
          )}
      
          {isAllowed("textDecoration") && (
            <div className="flex items-center gap-2">
              <label className="w-32">Text Decoration</label>
              <select
                value={getSetting("textDecoration", settings, objectPath)}
                onChange={handleChange("textDecoration")}
                className="border rounded-md px-2 py-1"
              >
                <option value="none">None</option>
                <option value="underline">Underline</option>
                <option value="line-through">Line Through</option>
                <option value="overline">Overline</option>
              </select>
            </div>
          )}
      
          {isAllowed("textTransform") && (
            <div className="flex items-center gap-2">
              <label className="w-32">Text Transform</label>
              <select
                value={getSetting("textTransform", settings, objectPath)}
                onChange={handleChange("textTransform")}
                className="border rounded-md px-2 py-1"
              >
                <option value="none">None</option>
                <option value="capitalize">Capitalize</option>
                <option value="uppercase">Uppercase</option>
                <option value="lowercase">Lowercase</option>
              </select>
            </div>
          )}
      
          {isAllowed("textShadow") && (
            <div className="flex items-center gap-2">
              <label className="w-32">Text Shadow</label>
              <input
                type="text"
                value={getSetting("textShadow", settings, objectPath) || "none"}
                onChange={handleChange("textShadow")}
                className="border rounded-md px-2 py-1 w-full"
                placeholder="e.g., 2px 2px 5px rgba(0,0,0,0.3)"
              />
            </div>
          )}
        </div>
      );
      
}

export default TextEditor;