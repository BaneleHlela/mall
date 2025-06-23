import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import ColorPicker from "../../../supporting/ColorPicker";
import OptionsToggler from "../../../supporting/OptionsToggler";
import SettingsSlider from "../../../supporting/SettingsSlider";


interface IconsSettingsHandlerProps {
  settings: any;
  handleSettingChange: (path: string, value: any) => void;
  objectPath: string;
}

const IconsSettingsHandler: React.FC<IconsSettingsHandlerProps> = ({
  settings,
  handleSettingChange,
  objectPath,
}) => {
  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleSettingChange(`${objectPath}.${field}`, e.target.value);
    };

  return (
    <div className="space-y-1 px-2 py-1">
        {/* <OptionsToggler
            label="Display"
            options={["true", "false"]}
            value={getSetting("display", settings, objectPath)?.toString() || "true"}
            onChange={(newValue) =>
            handleSettingChange(`${objectPath}.display`, newValue === "true")
            }
        /> */}

        <SettingsSlider
            label="Size"
            unit="px"
            value={parseInt(getSetting("size", settings, objectPath) || "22")}
            min={10}
            max={100}
            onChange={(val) =>
            handleSettingChange(`${objectPath}.size`, parseInt(val.toString()))
            }
        />

        <ColorPicker
            label="Color"
            value={getSetting("color", settings, objectPath)}
            onChange={handleChange("color")}
        />
        <SubSettingsContainer
            name="Icons Container"
            SettingsComponent={
                <BackgroundEditor
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    objectPath={`${objectPath}.background`}
                    allow={["shadow", "color", "border", "padding"]}
                    responsiveSize={false}
                />
            }
        />
        <SubSettingsContainer
            name="Icon Background"
            SettingsComponent={
                <BackgroundEditor
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    objectPath={`${objectPath}.iconBackground`}
                    allow={["shadow", "color", "border", "padding"]}
                    responsiveSize={false}
                />
            }
        />        
    </div>
  );
};

export default IconsSettingsHandler;
