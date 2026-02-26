import { motion, AnimatePresence } from "framer-motion";
import MenubarSettings from "./menubar/MenubarSettings";
import React, { useState, useEffect } from "react";
import SettingsContainer from "./SettingsContainer";
import GeneralLayoutSettings from "./GeneralLayoutSettings";
import SlidingPanel from "./supporting/SlidingPanel";
import PagesSettings from "./pages/PagesSettings";
import StoreFloatsSettings from "./extras/floats/StoreFloatsSettings";
import { useBreadcrumbs } from "../../contexts/BreadcrumbContext";
import { IoIosSettings, IoIosClose, IoIosArrowRoundBack } from "react-icons/io";
import { Layout, Menu, FileText, Layers, Settings } from "lucide-react";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  quickAccessSection?: 'fonts' | 'colors' | null;
  onQuickAccessHandled?: () => void;
}

const LayoutSettings: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  quickAccessSection,
  onQuickAccessHandled,
}) => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { addBreadcrumb, clearBreadcrumbs, currentPanel, setCurrentPanel } = useBreadcrumbs();

  // Handle quick access from floating buttons
  useEffect(() => {
    if (quickAccessSection && isOpen) {
      setActivePanel('general');
      addBreadcrumb('general', 'General', closePanel);
      // Expand the corresponding section after a short delay to allow panel to open
      setTimeout(() => {
        setExpandedSection(quickAccessSection);
        onQuickAccessHandled?.();
      }, 300);
    }
  }, [quickAccessSection, isOpen]);

  const closePanel = () => {
    setActivePanel(null);
    setExpandedSection(null);
    clearBreadcrumbs();
  };

  const handlePanelOpen = (panelId: string, label: string) => {
    setActivePanel(panelId);
    clearBreadcrumbs();
    addBreadcrumb(panelId, label, closePanel);
  };

  const handleGeneralClick = () => {
    handlePanelOpen("general", "General");
  };

  const handleSectionToggle = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const settingsItems = [
    { id: "general", name: "General", icon: Settings, onClick: handleGeneralClick },
    { id: "menubar", name: "Menubar", icon: Menu, onClick: () => handlePanelOpen("menubar", "Menubar") },
    { id: "pages", name: "Pages & Sections", icon: FileText, onClick: () => handlePanelOpen("pages", "Pages") },
    { id: "floats", name: "Floats", icon: Layers, onClick: () => handlePanelOpen("floats", "Floats") },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          className="fixed lg:relative h-full w-screen sm:w-80 lg:w-[45vh] z-20 flex flex-col bg-white shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex-shrink-0 bg-gradient-to-r from-stone-800 to-stone-700 text-white">
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Layout className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-[2.5vh] font-semibold tracking-wide">Settings</h1>
                  <p className="text-[1.7vh] text-stone-300">Customize your layout</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <IoIosClose className="text-xl" />
              </button>
            </div>
          </div>

          {/* Quick Access Bar */}
          <div className="flex-shrink-0 px-[1.2vh] py-[.8vh] bg-stone-100 border-b border-stone-200">
            <button
              onClick={handleGeneralClick}
              className="w-full flex items-center justify-center space-x-[.8vh] py-[.8vh] px-[1.6vh] bg-gradient-to-r from-stone-700 to-stone-600 text-white rounded-lg hover:from-stone-600 hover:to-stone-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <IoIosSettings className="text-[2.5vh]" />
              <span className="text-[1.8vh] font-medium">Quick General Settings</span>
            </button>
          </div>

          {/* Settings List */}
          <div className="flex-1 overflow-y-auto p-[1.2vh] space-y-[.8vh]">
            {settingsItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <SettingsContainer
                    name={item.name}
                    onClick={item.onClick}
                    icon={<IconComponent size={18} />}
                    isActive={activePanel === item.id}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-4 py-3 bg-stone-50 border-t border-stone-200">
            <p className="text-[1.6vh] text-stone-500 text-center">
              Changes are saved automatically
            </p>
          </div>

          {/* Sliding Panels */}
          <AnimatePresence>
            {activePanel === "general" && (
              <SlidingPanel 
                key="general" 
                isOpen={true} 
                onClose={closePanel} 
                title="General Settings"
                panelId="general"
                onHomeClick={() => setActivePanel(null)}
              >
                <GeneralLayoutSettings 
                  expandedSection={expandedSection}
                  onSectionToggle={handleSectionToggle}
                />
              </SlidingPanel>
            )}
            {activePanel === "menubar" && (
              <SlidingPanel 
                key="menubar" 
                isOpen={true} 
                onClose={closePanel} 
                title="Menubar Settings"
                panelId="menubar"
                onHomeClick={() => setActivePanel(null)}
              >
                <MenubarSettings />
              </SlidingPanel>
            )}
            {activePanel === "pages" && (
              <SlidingPanel 
                key="pages" 
                isOpen={true} 
                onClose={closePanel} 
                title="Pages"
                panelId="pages"
                onHomeClick={() => setActivePanel(null)}
              >
                <PagesSettings />
              </SlidingPanel>
            )}
            {activePanel === "floats" && (
              <SlidingPanel
                key="floats"
                isOpen={true}
                onClose={closePanel}
                title="Floats"
                panelId="floats"
                onHomeClick={() => setActivePanel(null)}
              >
                <StoreFloatsSettings />
              </SlidingPanel>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LayoutSettings;
