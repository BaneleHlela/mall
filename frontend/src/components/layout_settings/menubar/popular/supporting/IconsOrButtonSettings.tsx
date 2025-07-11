import React from "react";
import { getSetting } from "../../../../../utils/helperFunctions";
import OptionsToggler from "../../../supporting/OptionsToggler";
import SettingsSlider from "../../../supporting/SettingsSlider";
import type { EditorProps } from "../../../../../types/layoutSettingsType";
import { useAppSelector } from "../../../../../app/hooks";

const MAX_ICONS = 3;

const indexKeyMap = ["first", "second", "third"];
const buttonOptions = ["call", "book", "subscribe", "contact", "buy"];
//@ts-ignore
interface Props extends EditorProps {
  allow?: "icons" | "button";
}

const IconsOrButtonSettings: React.FC<Props> = ({
  objectPath,
  handleSettingChange,
  settings,
  allow,
}) => {
  const currentInclude = getSetting("include", settings, objectPath);
  const currentNumber = getSetting("icons.number", settings, objectPath) || 1;
  const socials = useAppSelector(
    (state) => state.stores.currentStore?.socials
  );
  console.log(socials);
  const availablePlatforms = socials?.map((item) => item.platform);
  const platformsObj: Record<string, string> =
    getSetting("icons.platforms", settings, objectPath) || {};
  const currentButtonFunction =
    getSetting("button.function", settings, objectPath) || "";

  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      handleSettingChange(`${objectPath}.${field}`, e.target.value);
    };

  const handlePlatformChange = (index: number, value: string) => {
    const key = indexKeyMap[index];
    const newPlatforms = {
      ...platformsObj,
      [key]: value,
    };
    handleSettingChange(`${objectPath}.icons.platforms`, newPlatforms);
  };

  const renderPlatformTogglers = () =>
    Array.from({ length: currentNumber }).map((_, i) => {
      const key = indexKeyMap[i];
      return (
        <div key={i} className="my-2">
          <OptionsToggler
            label={`Icon ${String.fromCharCode(65 + i)}`} //@ts-ignore
            options={availablePlatforms}
            value={platformsObj[key] || ""}
            onChange={(val) => handlePlatformChange(i, val)}
          />
        </div>
      );
    });

  const showType = allow || currentInclude;

  return (
    <div className="p-2 space-y-4">
      {!allow && (
        <OptionsToggler
          label="Show"
          options={["icons", "button"]}
          value={currentInclude}
          onChange={(newValue) =>
            handleChange("include")({
              target: { value: newValue },
            } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
          }
        />
      )}

      {showType === "icons" && (
        <div className="shadow-sm border border-black text-black rounded-sm px-2 py-1">
          <div className="w-full text-center font-semibold mb-2">
            Icon Settings
          </div>

          <SettingsSlider
            label="Number of icons"
            value={currentNumber}
            min={1}
            max={MAX_ICONS}
            onChange={(newVal) =>
              handleSettingChange(`${objectPath}.icons.number`, newVal)
            }
          />

          {renderPlatformTogglers()}
        </div>
      )}

      {showType === "button" && (
        <div className="border border-black text-black rounded-sm px-2 py-1">
          <div className="w-full text-center font-semibold mb-2">
            Button Settings
          </div>

          <OptionsToggler
            label="Button Function"
            options={buttonOptions}
            value={currentButtonFunction}
            onChange={(val) =>
              handleSettingChange(`${objectPath}.button.function`, val)
            }
          />
        </div>
      )}
    </div>
  );
};

export default IconsOrButtonSettings;
