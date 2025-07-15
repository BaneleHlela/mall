import React, { useState } from "react";
import { getSetting } from "../../../../../utils/helperFunctions";
import OptionsToggler from "../../../supporting/OptionsToggler";
import SettingsSlider from "../../../supporting/SettingsSlider";
import { useAppSelector } from "../../../../../app/hooks";
import IconsSettingsHandler from "./IconsSettingsHandler";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";

const MAX_ICONS = 3;
const indexKeyMap = ["first", "second", "third"];

interface Props {
  objectPath: string;
  settings: any;
  handleSettingChange: any;
  allow?: "icons" | "button";
}

const IconsOrButtonSettings: React.FC<Props> = ({
  objectPath,
  handleSettingChange,
  settings,
  allow,
}) => {
  const [activePanel, setActivePanel] = useState<"icons" | "button" | null>(null);
  const closePanel = () => setActivePanel(null);

  const currentInclude = getSetting("include", settings, objectPath);
  const currentNumber = getSetting("icons.number", settings, objectPath) || 1;
  const socials = useAppSelector((state) => state.stores.currentStore?.socials);
  const availablePlatforms = socials?.map((item) => item.platform);
  const platformsObj: Record<string, string> =
    getSetting("icons.platforms", settings, objectPath) || {};

  const showType = allow || currentInclude;

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

  return (
    <div className="space-y-2">
      {!allow && (
        <div className="px-2">
          <OptionsToggler
            label="Show"
            options={["icons", "button", "none"]}
            value={currentInclude}
            onChange={(newValue) =>
              handleChange("include")({
                target: { value: newValue },
              } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)
            }
          />
        </div>
        
      )}

      {showType === "icons" && (
        <FirstOrderSubSettingsContainer
          name="Icons"
          onClick={() => setActivePanel("icons")}
        />
      )}

      {showType === "button" && (
        <FirstOrderSubSettingsContainer
          name="Button"
          onClick={() => setActivePanel("button")}
        />
      )}

      <AnimatePresence>
        {activePanel === "icons" && (
          <SlidingPanel
            key="icons"
            isOpen={true}
            onClose={closePanel}
            title="Icon Settings"
          >
            <div className="p-2 space-y-4">
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

              <IconsSettingsHandler
                settings={settings}
                handleSettingChange={handleSettingChange}
                objectPath={`${objectPath}.icons`}
              />
            </div>
          </SlidingPanel>
        )}

        {activePanel === "button" && (
          <SlidingPanel
            key="button"
            isOpen={true}
            onClose={closePanel}
            title="Button Settings"
          >
            <div className="p-2">
              <StoreButtonSettings
                objectPath={`${objectPath}.button`}
                settings={settings}
              />
            </div>
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IconsOrButtonSettings;
