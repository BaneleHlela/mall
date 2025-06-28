import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import TextEditor from "../../../text/TextEditor";
import OptionsToggler from "../../../supporting/OptionsToggler";
import SettingsSlider from "../../../supporting/SettingsSlider";

interface HeroWithButtonImageAndTextSettingsProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const HeroWithButtonImageAndTextSettings: React.FC<HeroWithButtonImageAndTextSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "hero";


  return (
    <div className="space-y-2">

      {/* Background Settings */}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <div className="px-2 space-y-2">
            <BackgroundEditor
              objectPath={`${objectPath}.background`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["opacity", "height"]}
              widthUnit="vw"
              heightUnit="vh"
              responsiveSize
            />
          </div>
        }
      />

      {/* Image Settings */}
      <SubSettingsContainer
        name="Image"
        SettingsComponent={
          <div className="px-2 space-y-2">
            <MultipleLayoutImagesHandler
              objectPath={`${objectPath}.image`}
              min={1}
              max={1}
              images={getSetting("image", settings, objectPath)}
            />
          </div>
        }
      />

      {/* Text Settings */}
      <SubSettingsContainer
        name="Text Lines"
        SettingsComponent={
          <div className="px-2 space-y-1 py-1">
            {/* Text Width Settings */}
            <SubSettingsContainer
                name="Text Width"
                SettingsComponent={
                <div className="px-2 space-y-2">
                    <BackgroundEditor
                    objectPath={`${objectPath}.text`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["width"]}
                    widthUnit="vw"
                    responsiveSize={true}
                    />
                </div>
                }
            />
            {["firstLine", "secondLine", "thirdLine"].map((lineKey) => (
              <SubSettingsContainer
                name={lineKey}
                SettingsComponent={
                    <>
                        <div className="px-2">
                            <OptionsToggler
                                label={`Show`}
                                options={["true", "false"]}
                                value={getSetting(`text.${lineKey}.show`, settings, objectPath) ? "true" : "false"}
                                onChange={(value) =>
                                    handleSettingChange(`${objectPath}.text.${lineKey}.show`, value === "true")
                                }
                            />
                        </div>
                        <TextEditor
                            key={lineKey}
                            objectPath={`${objectPath}.text.${lineKey}`}
                            settings={settings}
                            handleSettingChange={handleSettingChange}
                            allow={["input", "fontFamily", "fontSize", "weight"]}
                            responsiveSize
                        />
                    </>  
                }
            /> 
            ))}
          </div>
        }
      />

      {/* Button Settings */}
      <SubSettingsContainer
        name="Button"
        SettingsComponent={
          <StoreButtonSettings
            objectPath={`${objectPath}.button`}
            settings={settings}
          />
        }
      />
    </div>
  );
};

export default HeroWithButtonImageAndTextSettings;
