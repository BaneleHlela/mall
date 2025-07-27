import { motion, AnimatePresence } from "framer-motion";
import MenubarSettings from "./menubar/MenubarSettings";
import { useState } from "react";
import SettingsContainer from "./SettingsContainer";
import GeneralLayoutSettings from "./GeneralLayoutSettings";
import SlidingPanel from "./supporting/SlidingPanel";
import PagesSettings from "./pages/PagesSettings";
import StoreFloatsSettings from "./extras/floats/StoreFloatsSettings";

const LayoutSettings = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <motion.div
      className="h-screen min-w-[22vw] z-10 flex flex-col items-center justify-start p-2[.6vh] space-y-[.3vh] relative overflow-hidden"
      style={{ boxShadow: '8px 0 8px -4px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Header with vertical line */}
      <div className="flex flex-col items-center w-full my-3">
        <div className="flex flex-row justify-between text-[20px] font-[500]">
          Settings
        </div>
        <div className="w-[80%] h-[1px] bg-gray-600"></div>
      </div>
      
      <div className="w-full h-full space-y-[.3vh] ">
        <SettingsContainer
          name="General"
          onClick={() => setActivePanel("general")}
        />
        <SettingsContainer
          name="Menubar"
          onClick={() => setActivePanel("menubar")}
        />
        <SettingsContainer
          name="Pages & Sections"
          onClick={() => setActivePanel("pages")}
        />
        <SettingsContainer
          name="floats"
          onClick={() => setActivePanel("floats")}
        />
      </div>

      <AnimatePresence>
        {activePanel === "general" && (
          <SlidingPanel key="general" isOpen={true} onClose={closePanel} title="General Settings">
            <GeneralLayoutSettings />
          </SlidingPanel>
        )}
        {activePanel === "menubar" && (
          <SlidingPanel key="menubar" isOpen={true} onClose={closePanel} title="Menubar Settings">
            <MenubarSettings />
          </SlidingPanel>
        )}
        {activePanel === "pages" && (
          <SlidingPanel key="pages" isOpen={true} onClose={closePanel} title="Pages">
            <PagesSettings />
          </SlidingPanel>
        )}
        {activePanel === "floats" && (
          <SlidingPanel
            key="floats"
            isOpen={true}
            onClose={closePanel}
            title="Floats"
          >
            <StoreFloatsSettings />
          </SlidingPanel>
          
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LayoutSettings;