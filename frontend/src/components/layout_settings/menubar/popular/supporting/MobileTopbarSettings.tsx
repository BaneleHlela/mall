import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { updateSetting } from "../../../../../features/layouts/layoutSettingsSlice";
import BackgroundEditor from "../../../background/BackgroundEditor";
import HamburgerSettings from "./HamburgerSettings";
import StoreLayoutLogoSettings from "./StoreLayoutLogoSettings";
import IconsSettingsHandler from "./IconsSettingsHandler";
import FirstOrderSubSettingsContainer from "../../../FirstOrderSubSettingsContainer";
import SlidingPanel from "../../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import { useBreadcrumbs } from "../../../../../contexts/BreadcrumbContext";
import { Menu, Image, Star } from "lucide-react";

const MobileTopbarSettings = () => {
  const settings = useAppSelector((state: any) => state.layoutSettings);
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

  const mobileSettings = [
    { id: "hamburger", name: "Hamburger", icon: <Menu size={16} />, component: <HamburgerSettings /> },
    { id: "logo", name: "Logo", icon: <Image size={16} />, component: <StoreLayoutLogoSettings objectPath="menubar.topbar.mobile.logo" device="mobile" /> },
    { id: "icons", name: "Icons", icon: <Star size={16} />, component: <IconsSettingsHandler settings={settings} handleSettingChange={handleSettingChange} objectPath="menubar.topbar.mobile.icons" /> },
  ];

  return (
    <div className="p-1 space-y-2">
      {mobileSettings.map((item) => (
        <FirstOrderSubSettingsContainer
          key={item.id}
          name={item.name}
          onClick={() => handlePanelOpen(item.id, item.name)}
          panelId={item.id}
          icon={item.icon}
        />
      ))}

      <AnimatePresence>
        {mobileSettings.map((item) => (
          activePanel === item.id && (
            <SlidingPanel
              key={item.id}
              isOpen={true}
              onClose={closePanel}
              title={`${item.name} Settings`}
              panelId={item.id}
            >
              {item.component}
            </SlidingPanel>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MobileTopbarSettings;
