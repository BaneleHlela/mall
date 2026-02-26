import { useState } from "react";
import FirstOrderSubSettingsContainer from "../../FirstOrderSubSettingsContainer";
import StoreFloatingButtonSettings from "./StoreFloatingButtonSettings";
import StoreFloatingSocialsSettings from "./StoreFloatingSocialsSettings";
import SlidingPanel from "../../supporting/SlidingPanel";
import { AnimatePresence } from "framer-motion";
import { useBreadcrumbs } from "../../../../contexts/BreadcrumbContext";
import { MessageCircle, Share2 } from "lucide-react";

const StoreFloatsSettings = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const { addBreadcrumb } = useBreadcrumbs();

  const closePanel = () => setActivePanel(null);

  const handlePanelOpen = (panelId: string, label: string) => {
    setActivePanel(panelId);
    addBreadcrumb(panelId, label, closePanel);
  };

  const floatSettings = [
    { 
      id: "floatingButton", 
      name: "Floating Button", 
      icon: <MessageCircle size={16} />, 
      component: <StoreFloatingButtonSettings /> 
    },
    { 
      id: "floatingSocials", 
      name: "Floating Socials", 
      icon: <Share2 size={16} />, 
      component: <StoreFloatingSocialsSettings /> 
    },
  ];

  return (
    <div className="p-1 space-y-2">
      {floatSettings.map((float) => (
        <FirstOrderSubSettingsContainer
          key={float.id}
          name={float.name}
          onClick={() => handlePanelOpen(float.id, float.name)}
          panelId={float.id}
          icon={float.icon}
        />
      ))}

      <AnimatePresence>
        {floatSettings.map((float) => (
          activePanel === float.id && (
            <SlidingPanel
              key={float.id}
              isOpen={true}
              onClose={closePanel}
              title={`${float.name} Settings`}
              panelId={float.id}
            >
              {float.component}
            </SlidingPanel>
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default StoreFloatsSettings;