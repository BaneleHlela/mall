import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { updateSetting } from "../../../../../features/layouts/layoutSettingsSlice";
import { getSetting } from "../../../../../utils/helperFunctions";
import BackgroundEditor from "../../../background/BackgroundEditor";
import StoreButtonSettings from "../../../extras/StoreButtonSettings";
import CartSettings from "../../CartSettings";
import DesktopTopbarSettings from "./DesktopTopbarSettings";
import MobileTopbarSettings from "./MobileTopbarSettings";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import TextEditor from "../../../text/TextEditor";
import { useBreadcrumbs } from "../../../../../contexts/BreadcrumbContext";
import { Heart, ShoppingCart, Monitor, Smartphone } from "lucide-react";

const TopbarSettings = () => {
  const settings = useAppSelector((state: any) => state.layoutSettings);
  const store = useAppSelector((state) => state.stores.currentStore);
  const dispatch = useAppDispatch();
  const { addBreadcrumb } = useBreadcrumbs();

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  const handlePanelOpen = (panelId: string, label: string) => {
    setActivePanel(panelId);
    addBreadcrumb(panelId, label, closePanel);
  };

  return (
    <div className="p-1 space-y-2">
      <FirstOrderSubSettingsContainer
        name="Heart"
        onClick={() => handlePanelOpen("heart", "Heart")}
        panelId="heart"
        icon={<Heart size={16} />}
      />
      {Array.isArray(store?.trades) && store.trades.includes("products") && (
        <FirstOrderSubSettingsContainer
          name="Cart"
          onClick={() => handlePanelOpen("cart", "Cart")}
          panelId="cart"
          icon={<ShoppingCart size={16} />}
        />
      )}

      <FirstOrderSubSettingsContainer
        name="Desktop"
        onClick={() => handlePanelOpen("desktop", "Desktop")}
        panelId="desktop"
        icon={<Monitor size={16} />}
      />
      <FirstOrderSubSettingsContainer
        name="Mobile"
        onClick={() => handlePanelOpen("mobile", "Mobile")}
        panelId="mobile"
        icon={<Smartphone size={16} />}
      />

      <AnimatePresence>
        {activePanel === "background" && (
          <SlidingPanel
            key="background"
            isOpen={true}
            onClose={closePanel}
            title="Topbar Background"
            panelId="background"
          >
            <BackgroundEditor
              objectPath="menubar.background"
              handleSettingChange={handleSettingChange}
              settings={settings}
              allow={["padding", "border", "shadow"]}
              heightUnit="vh"
              responsiveSize={true}
              responsivePadding
            />
          </SlidingPanel>
        )}

        {activePanel === "desktop" && (
          <SlidingPanel
            key="desktop"
            isOpen={true}
            onClose={closePanel}
            title="Desktop Topbar Settings"
            panelId="desktop"
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
            panelId="mobile"
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
            panelId="cart"
          >
            <CartSettings
              settings={settings}
              handleSettingChange={handleSettingChange}
            />
          </SlidingPanel>
        )}
        {activePanel === "heart" && (
          <SlidingPanel
            key="heart"
            isOpen={true}
            onClose={closePanel}
            title="Heart Settings"
            panelId="heart"
          >
            {/* Favorite Icon settings */}
            <TextEditor
              settings={settings}
              handleSettingChange={handleSettingChange}
              allow={["color", "fontSize"]}
              objectPath="menubar.topbar.mobile.heart"
            />
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopbarSettings;
