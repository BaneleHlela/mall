import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { updateSetting } from "../../../../../features/layouts/layoutSettingsSlice";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import OptionsToggler from "../../../supporting/OptionsToggler";
import TextEditor from "../../../text/TextEditor";
import CartSettings from "../../CartSettings";
import DesktopTopbarSettings from "./DesktopTopbarSettings";
import IconsSettingsHandler from "./IconsSettingsHandler";
import MobileTopbarSettings from "./MobileTopbarSettings";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";

const TopbarSettings = () => {
  const settings = useAppSelector((state: any) => state.layoutSettings);
  const store = useAppSelector((state) => state.stores.currentStore);
  const dispatch = useAppDispatch();

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  return (
    <div className="p-1.5 space-y-1">
      {/* Background, Desktop, Mobile */}
      <FirstOrderSubSettingsContainer
        name="Background"
        onClick={() => setActivePanel("background")}
      />
      {Array.isArray(store?.trades) && store.trades.includes("products") && (
          <FirstOrderSubSettingsContainer
            name="Cart"
            onClick={() => setActivePanel("cart")}
          />
      )}
      <FirstOrderSubSettingsContainer
        name="Desktop"
        onClick={() => setActivePanel("desktop")}
      />
      <FirstOrderSubSettingsContainer
        name="Mobile"
        onClick={() => setActivePanel("mobile")}
      />

      <AnimatePresence>
        {activePanel === "background" && (
          <SlidingPanel
            key="background"
            isOpen={true}
            onClose={closePanel}
            title="Topbar Background"
          >
            <BackgroundEditor
              objectPath="menubar.background"
              handleSettingChange={handleSettingChange}
              settings={settings}
              allow={["height", "padding", "border", "shadow"]}
              heightUnit="vh"
              responsiveSize={true}
            />
          </SlidingPanel>
        )}

        {activePanel === "desktop" && (
          <SlidingPanel
            key="desktop"
            isOpen={true}
            onClose={closePanel}
            title="Desktop Topbar Settings"
          >
            <DesktopTopbarSettings />
          </SlidingPanel>
        )}

        {activePanel === "mobile" && (
          <SlidingPanel
            key="mobile"
            isOpen={true}
            onClose={closePanel}
            title="Mobile Topbar Settings"
          >
            <MobileTopbarSettings />
          </SlidingPanel>
        )}

        {activePanel === "cart" && (
          <SlidingPanel
            key="cart"
            isOpen={true}
            onClose={closePanel}
            title="Cart Settings"
          >
            <CartSettings
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopbarSettings;
