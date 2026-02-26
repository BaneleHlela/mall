import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import FirstOrderSubSettingsContainer from "../FirstOrderSubSettingsContainer";
import PopularStoreMenubarSettings from "./popular/PopularStoreMenubarSettings";
import { AnimatePresence } from "framer-motion";
import SlidingPanel from "../supporting/SlidingPanel";
import { FaPlus } from "react-icons/fa";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice";
import StoreAlertDivSettings from "../extras/alert_div/StoreAlertDivSettings";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MenubarWithSearchbarSettings from "./with_searchbar/MenubarWithSearchbarSettings";
import { defaultStoreAlertDivConfig } from "../../../utils/defaults/extras/defaultStoreAlertDivConfig";
import RestuarantMenubarSettings from "./restuarant_menubar/RestuarantMenubarSettings";
import ArtMenubarSettings from "./art/ArtMenubarSettings";
import CakeMenubarSettings from "./cake/CakeMenubarSettings";
import { useBreadcrumbs } from "../../../contexts/BreadcrumbContext";
import { Menu, Bell } from "lucide-react";
import { motion } from "framer-motion";

const MenubarSettings = () => {
  const settings = useAppSelector((state) => state.layoutSettings);
  const { variation, alertDiv } = useAppSelector((state) => state.layoutSettings.menubar || {});
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const { addBreadcrumb, removeBreadcrumb, currentPanel } = useBreadcrumbs();
  const closePanel = () => {
    setActivePanel(null);
  };
  const dispatch = useAppDispatch();
  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  const handlePanelOpen = (panelId: string, label: string) => {
    setActivePanel(panelId);
    addBreadcrumb(panelId, label, closePanel);
  };

  const MySwal = withReactContent(Swal);

  const handleAddAlertDivClick = () => {
    handleSettingChange('menubar.alertDiv', defaultStoreAlertDivConfig);
  };
  
  const handleDeleteAlertDivClick = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "This will remove the Alert Div from your menubar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, remove it",
    });
    if (result.isConfirmed) {
      handleSettingChange("menubar.alertDiv.display", false);
    }
  };

  if (!alertDiv || alertDiv.display != true) {
    return (
      <div className="space-y-[.8vh] flex flex-col w-full items-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center space-x-[.8vh] py-[1.2vh] px-[1.6vh] bg-gradient-to-r from-stone-100 to-stone-50 border border-stone-200 text-stone-700 rounded-xl hover:from-stone-200 hover:to-stone-100 transition-all shadow-sm"
          onClick={handleAddAlertDivClick}
        >
          <FaPlus className="text-[2vh]" />
          <span className="text-[1.8vh] font-medium">Add Alert Div</span>
        </motion.button>
        <div className="w-full mt-[.6vh] p-0">
          {variation === "popular" && <PopularStoreMenubarSettings />}
          {variation === "menubarWithSearchbar" && <MenubarWithSearchbarSettings />}
          {variation === "restuarantMenubar" && <RestuarantMenubarSettings />}
          {variation === "artMenubar" && <ArtMenubarSettings />}
          {variation === "cakeMenubar" && <CakeMenubarSettings />}
        </div>
      </div>
    );
  }

  if (alertDiv && alertDiv.display == true) {
    return (
      <div className="space-y-[.8vh] p-[.4vh]">
        <FirstOrderSubSettingsContainer
          name="Menubar"
          onClick={() => handlePanelOpen("menubar_settings", "Menubar")}
          panelId="menubar_settings"
          icon={<Menu size={16} />}
        />
        <FirstOrderSubSettingsContainer
          name="Alert Div"
          onClick={() => handlePanelOpen("alert_div", "Alert Div")}
          deletable
          onDeleteClick={handleDeleteAlertDivClick}
          panelId="alert_div"
          icon={<Bell size={16} />}
        />
        
        <AnimatePresence>
          {activePanel === "menubar_settings" && (
            <SlidingPanel
              key="menubar"
              isOpen={true}
              onClose={closePanel}
              title="Menubar Settings"
              panelId="menubar_settings"
            >
              {variation === "popular" && <PopularStoreMenubarSettings />}
              {variation === "menubarWithSearchbar" && <MenubarWithSearchbarSettings />}
              {variation === "restuarantMenubar" && <RestuarantMenubarSettings />}
              {variation === "artMenubar" && <ArtMenubarSettings />}
              {variation === "cakeMenubar" && <CakeMenubarSettings />}
            </SlidingPanel>
          )}
          {activePanel === "alert_div" && (
            <SlidingPanel
              key="alert_div"
              isOpen={true}
              onClose={closePanel}
              title="Alert Div Settings"
              panelId="alert_div"
            >
              <StoreAlertDivSettings
                objectPath="menubar.alertDiv"
                handleSettingChange={handleSettingChange}
                settings={settings}
              />
            </SlidingPanel>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="p-4 text-center text-stone-500">
      <p>Menubar settings not available</p>
    </div>
  );
};

export default MenubarSettings;
