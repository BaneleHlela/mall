import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import FirstOrderSubSettingsContainer from "../FirstOrderSubSettingsContainer";
import PopularStoreMenubarSettings from "./popular/PopularStoreMenubarSettings";
import { AnimatePresence } from "framer-motion";
import SlidingPanel from "../supporting/SlidingPanel";
import { FaPlus } from "react-icons/fa";
import { updateSetting } from "../../../features/layouts/layoutSettingsSlice";
import StoreAlertDivSettings from "../extras/alert_div/StoreAlertDivSettings";

const MenubarSettings = () => {
  const settings = useAppSelector((state) => state.layoutSettings)
    const { variation, alertDiv } = useAppSelector((state) => state.layoutSettings.menubar );
    const [activePanel, setActivePanel] = useState<string | null>(null);
    const closePanel = () => setActivePanel(null);
    const dispatch = useAppDispatch();
    const handleSettingChange = (field: string, value: any) => {
      dispatch(updateSetting({ field, value }));
    };
    const handleAddAlertDivClick = () => {
      handleSettingChange('menubar.alertDiv.display', true)
    }
    const handleDeleteAlertDivClick = () => {
      handleSettingChange('menubar.alertDiv.display', false)
    }

    if (variation === "popular" && alertDiv.display !== true) {
      return (
          <div className="space-y-[.3vh] flex flex-col w-full items-center">
            <button
              className="text-[2vh] flex flex-row justify-between items-center bg-stone-50 border-[.35vh] border-white text-black rounded px-[2.4vh] py-[.6vh] shadow-md hover:scale-103 hover:opacity-85"
              onClick={handleAddAlertDivClick}
            >
              Add Alert Div <FaPlus className="ml-[.6vh]" />
            </button>
            <PopularStoreMenubarSettings/>
          </div>
         
      )
    }

    if (variation === "popular" && alertDiv.display === true) {
      
      return (
        <div className="space-y-[.3vh]">
            <FirstOrderSubSettingsContainer
                name="Menubar"
                onClick={() => setActivePanel("menubar")}
            />
            <FirstOrderSubSettingsContainer
                name="Alert Div"
                onClick={() => setActivePanel("alert_div")}
                deletable
                onDeleteClick={handleDeleteAlertDivClick}
            />
            <AnimatePresence>
              {activePanel === "menubar" && (
                <SlidingPanel
                    key="menubar"
                    isOpen={true}
                    onClose={closePanel}
                    title="Menubar Settings"
                > 
                  <PopularStoreMenubarSettings/>
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