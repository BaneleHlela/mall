import { useEffect } from "react";
import { useAppSelector } from "../../../../../app/hooks";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import SubSettingsContainer from "../../../extras/SubSettingsContainer";
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

  const currentNumber = getSetting("number", settings, objectPath) || 1;
  const platformsObj: Record<string, string> =
  (typeof getSetting("platforms", settings, objectPath) === 'object' && getSetting("platforms", settings, objectPath) !== null)
    ? getSetting("platforms", settings, objectPath)
    : {};
  const MAX_ICONS = 3;
  const indexKeyMap = ["first", "second", "third"];
  const socials = useAppSelector((state) => state.stores?.currentStore?.socials);
  console.log(socials)
  const availablePlatforms = socials?.map((item) => item.platform) || [];
  const maxIcons = Math.min(MAX_ICONS, availablePlatforms.length);

  useEffect(() => {
    if (currentNumber > availablePlatforms.length) {
      handleSettingChange(`${objectPath}.number`, availablePlatforms.length);
    }
  }, [availablePlatforms.length, currentNumber, handleSettingChange, objectPath]);

  useEffect(() => {
    if (typeof platformsObj !== 'object' || platformsObj === null) return;
    const newPlatforms = { ...platformsObj };
    indexKeyMap.forEach((key, i) => {
      if (i >= currentNumber) {
        delete newPlatforms[key];
      }
    });
    if (JSON.stringify(newPlatforms) !== JSON.stringify(platformsObj)) {
      handleSettingChange(`${objectPath}.platforms`, newPlatforms);
    }
  }, [currentNumber, platformsObj, handleSettingChange, objectPath, indexKeyMap]);

  console.log(socials)

  const handlePlatformChange = (index: number, value: string) => {
    const key = indexKeyMap[index];
    const safePlatformsObj = (typeof platformsObj === 'object' && platformsObj !== null) ? platformsObj : {};
    const newPlatforms = {
      ...safePlatformsObj,
      [key]: value,
    };
    handleSettingChange(`${objectPath}.platforms`, newPlatforms);
  };

  const renderPlatformTogglers = () =>
    Array.from({ length: currentNumber }).map((_, i) => {
      const key = indexKeyMap[i];
      const safePlatformsObj = (typeof platformsObj === 'object' && platformsObj !== null) ? platformsObj : {};
      return (
        <div key={i} className="my-2">
          <OptionsToggler
            label={`Icon ${String.fromCharCode(65 + i)}`} //@ts-ignore
            options={availablePlatforms}
            value={safePlatformsObj[key] || ""}
            onChange={(val) => handlePlatformChange(i, val)}
          />
        </div>
      );
    });


    return (
      <div className="space-y-1 px-2 py-1">
          {/* {allowDisplay && (
              <OptionsToggler
                label="Display"
                options={["true", "false"]}
                value={getSetting("display", settings, objectPath)?.toString() || "true"}
                onChange={(newValue) =>
                handleSettingChange(`${objectPath}.display`, newValue === "true")
                }
              />
          )} */}

          <SettingsSlider
            label="Number of icons"
            value={currentNumber}
            min={1}
            max={maxIcons}
            step={1}
            onChange={(newVal) =>
              handleSettingChange(`${objectPath}.number`, newVal)
            }
          />

          {renderPlatformTogglers()}
          
          <SettingsSlider
              label="Size"
              unit="vh"
              value={parseFloat(getSetting("size", settings, objectPath) || "22")}
              min={0}
              max={7}
              step={.1}
              onChange={(val) =>
              handleSettingChange(`${objectPath}.size`, `${val}vh`)
              }
          />

          <OptionsToggler
              label="Color"
              options={["primary", "secondary", "accent", "quad", "pent"]}
              value={getSetting("color", settings, objectPath) || "primary"}
              onChange={(val) => handleSettingChange(`${objectPath}.color`, val)}
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
