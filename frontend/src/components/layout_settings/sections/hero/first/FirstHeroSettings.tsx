import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import { updateSetting } from "../../../../../features/layouts/layoutSettingsSlice";
import TextEditor from "../../../text/TextEditor";
import DivAnimationSettings from "../../background/DivAnimationSettings";

const FirstHeroSettings = () => {
  const settings = useAppSelector((state: any) => state.layoutSettings);
  const dispatch = useAppDispatch();

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  return (
    <div className="hero-settings space-y-6">
      <h2 className="text-xl font-bold">Hero Section Settings</h2>

      {/* Background Gradient */}
      <div className="space-y-2">
        <h3 className="font-semibold">Background Gradient</h3>
        <label>Color A:</label>
        <input
          type="color"
          value={settings?.hero?.background?.colorA || "#ffffff"}
          onChange={(e) =>
            handleSettingChange("hero.background.colorA", e.target.value)
          }
        />
        <label>Color B:</label>
        <input
          type="color"
          value={settings?.hero?.background?.colorB || "#f0f0f0"}
          onChange={(e) =>
            handleSettingChange("hero.background.colorB", e.target.value)
          }
        />
      </div>

      {/* Hero Image */}
      <div className="space-y-2">
        <h3 className="font-semibold">Hero Image</h3>
        <input
          type="text"
          value={settings?.hero?.image?.url || ""}
          onChange={(e) =>
            handleSettingChange("hero.image.url", e.target.value)
          }
          placeholder="Image URL"
          className="border px-2 py-1 rounded-md w-full"
        />
        <DivAnimationSettings
            value={settings?.hero?.image?.animation || "upToDown"}
            onChange={(val) => handleSettingChange("hero.image.animation", val)}
        />
      </div>

      {/* Hero Text Inputs */}
      <div className="space-y-2">
        <h3 className="font-semibold">Hero Text</h3>
        {["textA", "textB", "textC", "textD"].map((field) => (
          <input
            key={field}
            type="text"
            value={settings?.hero?.text?.input?.[field] || ""}
            onChange={(e) =>
              handleSettingChange(`hero.text.input.${field}`, e.target.value)
            }
            placeholder={`Enter ${field}`}
            className="border px-2 py-1 rounded-md w-full"
          />
        ))}
      </div>

      {/* Text Style Editor */}
      <div className="space-y-2">
        <h3 className="font-semibold">Text Style</h3>
        <TextEditor
          objectPath="hero.text.style"
          settings={settings}
          handleSettingChange={handleSettingChange}
          allow={["fontFamily", "fontSize", "color"]}
        />
      </div>

      {/* Text Box Settings */}
      <div className="space-y-2">
        <h3 className="font-semibold">Text Box</h3>
        <label>Background Color:</label>
        <input
          type="color"
          value={settings?.hero?.textBox?.backgroundColor || "#cccccc"}
          onChange={(e) =>
            handleSettingChange(
              "hero.textBox.backgroundColor",
              e.target.value
            )
          }
        />     
        <DivAnimationSettings
            value={settings?.hero?.textBox?.animation || "upToDown"}
            onChange={(val) => handleSettingChange("hero.textBox.animation", val)}
        />
      </div>

      {/* Button Settings */}
      <div className="space-y-2">
        <h3 className="font-semibold">Button</h3>
        <label>Text:</label>
        <input
          type="text"
          value={settings?.hero?.button?.text?.input || ""}
          onChange={(e) =>
            handleSettingChange("hero.button.text.input", e.target.value)
          }
          placeholder="Button Text"
          className="border px-2 py-1 rounded-md w-full"
        />
        <label>URL:</label>
        <input
          type="text"
          value={settings?.hero?.button?.url || ""}
          onChange={(e) =>
            handleSettingChange("hero.button.url", e.target.value)
          }
          placeholder="Button Link"
          className="border px-2 py-1 rounded-md w-full"
        />
      </div>

      {/* Pattern Settings */}
      <div className="space-y-2">
        <h3 className="font-semibold">Pattern</h3>
        <select
          value={settings?.hero?.pattern?.type || "striped"}
          onChange={(e) =>
            handleSettingChange("hero.pattern.type", e.target.value)
          }
          className="border rounded-md px-2 py-1"
        >
          <option value="striped">Striped</option>
          <option value="dots">Dots</option>
          <option value="grid">Grid</option>
          <option value="none">None</option>
        </select>
        <DivAnimationSettings
            value={settings?.hero?.pattern?.animation || "upToDown"}
            onChange={(val) => handleSettingChange("hero.pattern.animation", val)}
        />
      </div>
    </div>
  );
};

export default FirstHeroSettings;
