import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import BorderEditor from "../../../background/BorderEditor";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
import MultipleLayoutImagesHandler from "../../../supporting/MultipleLayoutImagesHandler";
import TextEditor from "../../../text/TextEditor";

interface AboutWithImageNextToSettingsProps {
  settings: any;
  handleSettingChange: (field: string, value: any) => void;
}

const AboutWithImageNextToSettings: React.FC<AboutWithImageNextToSettingsProps> = ({
  settings,
  handleSettingChange,
}) => {
  const objectPath = "about";

  return (
    <div className="space-y-1">
      
      {/* Background Settings */}
      <SubSettingsContainer
        name="Background"
        SettingsComponent={
          <div className="px-2 space-y-1">
            <BackgroundEditor
              objectPath={`${objectPath}.background`}
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["color", "width"]}
              widthUnit="%"
              responsiveSize
            />
          </div>
        }
      />

      {/* Image Settings */}
      <SubSettingsContainer
        name="Image"
        SettingsComponent={
          <div className="px-2 space-y-1 py-1">
            <MultipleLayoutImagesHandler
              objectPath={`${objectPath}.image.imageUrl`}
              min={1}
              max={1}
              images={getSetting("image.imageUrl", settings, objectPath)}
            />
            <SubSettingsContainer
              name="Background"
              SettingsComponent={
                <BackgroundEditor
                  objectPath={`${objectPath}.image.background`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={["width", "height", "border"]}
                  responsiveSize
                  widthUnit="%"
                  heightUnit="vh"
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
                objectPath={`${objectPath}.text.title.style`}
                settings={settings}
                handleSettingChange={handleSettingChange}
                allow={["input", "fontFamily", "fontSize", "color", "weight", "fontStyle", "lineHeight", "textDecotation", "animation" ]}
                responsiveSize
                />}
            />
            <SubSettingsContainer
                name="Paragraph"
                SettingsComponent={
                <TextEditor
                    objectPath={`${objectPath}.text.style`}
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["input", "fontFamily", "fontSize", "color", "weight", "fontStyle", "animation"]}
                    responsiveSize
                />
              }
            />
          </div>
        }
      />
    </div>
  );
};

export default AboutWithImageNextToSettings;
