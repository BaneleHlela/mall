import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import BorderEditor from "../../../background/BorderEditor";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import TextEditor from "../../../text/TextEditor";

interface AboutWithImageAndTextSettingsProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const AboutWithImageAndTextSettings: React.FC<AboutWithImageAndTextSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "about";

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
              allow={["color"]}
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
              objectPath={`${objectPath}.image.imageUrl`}
              min={1}
              max={1}
              images={getSetting("image.imageUrl", settings, objectPath)}
            />
            <SubSettingsContainer
              name="Border"
              SettingsComponent={
                <BorderEditor
                    objectPath={`${objectPath}.image.border`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                />
            }
            />
          </div>
        }
      />

      {/* Text Settings */}
      <SubSettingsContainer
        name="Text"
        SettingsComponent={
          <div className="px-2 space-y-1 py-1">
            <SubSettingsContainer
              name="Border"
              SettingsComponent={
                <BorderEditor
                    objectPath={`${objectPath}.text.border`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                />
            }
            />
            <SubSettingsContainer
                name="Title"
                SettingsComponent={
                <TextEditor
                objectPath={`${objectPath}.text.title`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["input", "fontFamily", "fontSize", "color", "fontWeight", "fontStyle"]}
                responsiveSize
                />}
            />
            <SubSettingsContainer
                name="Paragraph"
                SettingsComponent={
                <TextEditor
                objectPath={`${objectPath}.text.title`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["input", "fontFamily", "fontSize", "color", "fontWeight", "fontStyle"]}
                responsiveSize
            />}
            />
          </div>
        }
      />
    </div>
  );
};

export default AboutWithImageAndTextSettings;
