import { getSetting } from "../../../utils/helperFunctions";
import ColorPicker from "../supporting/ColorPicker";
import SettingsSlider from "../supporting/SettingsSlider";
import OptionsToggler from "../supporting/OptionsToggler";
import BackgroundEditor from "../background/BackgroundEditor";
import SubSettingsContainer from "../extras/SubSettingsContainer";

interface CartSettingsProps {
  settings: any;
  handleSettingChange: (path: string, value: any) => void;
}

const CartSettings: React.FC<CartSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const cartPath = "menubar.cart";

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleSettingChange(`${cartPath}.${field}`, e.target.value);
    };


  return (
    <div className="space-y-1 px-2">
      <OptionsToggler
        label="Variation"
        options={[
          "default",
          "bag",
          "basket",
          "outline",
          "medical",
          "trolley2",
          "trolley3",
          "paperbag",
          "beachbag",
          "shoppingbag",
        ]}
        value={getSetting("variation", settings, cartPath)}
        onChange={(newValue) =>
          handleChange("variation")({
            target: { value: newValue },
          } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
        }
      />

        <SettingsSlider
            label="Size"
            unit="px"
            value={parseInt(getSetting("size", settings, cartPath) || "42")}
            onChange={(val) =>
            handleSettingChange(`${cartPath}.size`, parseInt(val.toString()))
            }
            min={10}
            max={100}
        />
            
        <ColorPicker
            label="Color"
            value={getSetting("color", settings, cartPath)}
            onChange={handleChange("color")}
        />
        <SubSettingsContainer
            name="Background"
            SettingsComponent={
                <BackgroundEditor
                settings={settings}
                handleSettingChange={handleSettingChange}
                objectPath={`${cartPath}.background`}
                allow={["color", "border"]}
            />
            }
        />

{/*       

      <h4 className="text-sm font-semibold pt-2">Count</h4>
      <BackgroundEditor
        settings={settings}
        handleSettingChange={handleSettingChange}
        objectPath={`${cartPath}.count`}
      />

      <SettingsSlider
        label="Scale"
        value={parseFloat(getSetting("count.scale", settings, cartPath) || "1")}
        unit="x"
        min={0.5}
        max={3}
        step={0.1}
        onChange={(val) =>
          handleSettingChange(`${cartPath}.count.scale`, parseFloat(val.toString()))
        }
      />

      <OptionsToggler
        label="Shadow"
        options={["true", "false"]}
        value={getSetting("shadow", settings, cartPath)?.toString() || "false"}
        onChange={(newValue) =>
          handleSettingChange(`${cartPath}.shadow`, newValue === "true")
        }
      /> */}
    </div>
  );
};

export default CartSettings;
