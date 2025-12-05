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
import { mockLayout } from "../../../major_updates/mockLayout";
import { defaultStoreAlertDivConfig } from "../../../utils/defaults/extras/defaultStoreAlertDivConfig";
import RestuarantMenubarSettings from "./restuarant_menubar/RestuarantMenubarSettings";

const MenubarSettings = () => {
    const settings = useAppSelector((state) => state.layoutSettings)
    const { variation, alertDiv } = useAppSelector((state) => state.layoutSettings.menubar || {} );
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    const dispatch = useAppDispatch();
    const handleSettingChange = (field: string, value: any) => {
      dispatch(updateSetting({ field, value }));
    };

    
  const MySwal = withReactContent(Swal);

    const handleAddAlertDivClick = () => {
      handleSettingChange('menubar.alertDiv', defaultStoreAlertDivConfig);
    }
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
    }

    if (!alertDiv || alertDiv.display != true) {
      return (
          <div className="space-y-[.3vh] flex flex-col w-full items-center">
            <button
              className="text-[2vh] flex flex-row justify-between items-center bg-stone-50 border-[.35vh] border-white text-black rounded px-[2.4vh] py-[.6vh] shadow-md hover:scale-103 hover:opacity-85"
              onClick={handleAddAlertDivClick}
            >
              Add Alert Div <FaPlus className="ml-[.6vh]" />
            </button>
            {variation === "popular" && (
              <PopularStoreMenubarSettings/>
            )}
            {variation === "menubarWithSearchbar" && (
              <MenubarWithSearchbarSettings />
            )}
            {variation === "restuarantMenubar" && (
              <RestuarantMenubarSettings />
            )}
          </div>
      )
    }

    
    if (alertDiv && alertDiv.display == true) {
      
      return (
        <div className="space-y-[.3vh]">
            <FirstOrderSubSettingsContainer
                name="Menubar"
                onClick={() => setActivePanel("menubar_settings")}
            />
            <FirstOrderSubSettingsContainer
                name="Alert Div"
                onClick={() => setActivePanel("alert_div")}
                deletable
                onDeleteClick={handleDeleteAlertDivClick}
            />
            <AnimatePresence>
              {activePanel === "menubar_settings" && (
                <SlidingPanel
                    key="menubar"
                    isOpen={true}
                    onClose={closePanel}
                    title="Menubar Settings"
                > 
                  {variation === "popular" && (
                    <PopularStoreMenubarSettings/>
                  )}
                  {variation === "menubarWithSearchbar" && (
                    <MenubarWithSearchbarSettings />
                  )}
                </SlidingPanel>
              )}
              {activePanel === "alert_div" && (
                <SlidingPanel
                  key="menubar"
                  isOpen={true}
                  onClose={closePanel}
                  title="Menubar Settings"
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
      )
  }

  
  return (
    <div>MenubarSettings</div>
  )
}

export default MenubarSettings;