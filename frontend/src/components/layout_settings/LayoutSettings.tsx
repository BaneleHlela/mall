import { motion, AnimatePresence } from "framer-motion";
import MenubarSettings from "./menubar/MenubarSettings";
import { useState } from "react";
import SettingsContainer from "./SettingsContainer";
import GeneralLayoutSettings from "./GeneralLayoutSettings";
import SlidingPanel from "./supporting/SlidingPanel";
import PagesSettings from "./pages/PagesSettings";

const LayoutSettings = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  return (
    <motion.div
      className="h-screen w-[25vw] bg-white z-10 flex flex-col items-center justify-start p-2 space-y-1 relative overflow-hidden"
      style={{ boxShadow: '8px 0 8px -4px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Header with vertical line */}
      <div className="flex flex-col items-center w-full my-3">
        <div className="flex flex-row justify-between text-[20px] font-[500]">
          Settings
        </div>
        <div className="w-[80%] h-[1px] bg-gray-600"></div>
      </div>
      
      <div className="w-full space-y-2">
        <SettingsContainer
          name="General"
          options={["edit"]}
          onOptionClick={() => {}}
          onClick={() => setActivePanel("general")}
        />
        <SettingsContainer
          name="Menubar"
          options={["edit"]}
          onOptionClick={() => {}}
          onClick={() => setActivePanel("menubar")}
        />
        <SettingsContainer
          name="Pages & Sections"
          options={["edit"]}
          onOptionClick={() => {}}
          onClick={() => setActivePanel("pages")}
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
      </AnimatePresence>
    </motion.div>
  );
};

export default LayoutSettings;