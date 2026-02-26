import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import BackgroundEditor from '../../background/BackgroundEditor';
import IconsOrButtonSettings from './supporting/IconsOrButtonSettings';
import SidebarSettings from './supporting/SidebarSettings';
import TopbarSettings from './supporting/TopbarSettings';
import SlidingPanel from '../../supporting/SlidingPanel';
import { AnimatePresence } from 'framer-motion';
import FirstOrderSubSettingsContainer from '../../FirstOrderSubSettingsContainer';
import { useBreadcrumbs } from '../../../../contexts/BreadcrumbContext';
import { Monitor, Tablet, LayoutPanelLeft } from 'lucide-react';

const PopularStoreMenubarSettings = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const { addBreadcrumb, currentPanel } = useBreadcrumbs();
  
  const closePanel = () => setActivePanel(null);

  const settings = useAppSelector((state: any) => state.layoutSettings);
  const dispatch = useAppDispatch();
  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  const handlePanelOpen = (panelId: string, label: string) => {
    setActivePanel(panelId);
    addBreadcrumb(panelId, label, closePanel);
  };

  return (
    <div className="space-y-[.8vh] w-full">
      {/* Topbar */}
      <FirstOrderSubSettingsContainer
        name="Topbar"
        onClick={() => handlePanelOpen('topbar', 'Topbar')}
        panelId="topbar"
        icon={<Monitor size={16} />}
      />

      {/* Sidebar */}
      <FirstOrderSubSettingsContainer
        name="Sidebar"
        onClick={() => handlePanelOpen('sidebar', 'Sidebar')}
        panelId="sidebar"
        icon={<LayoutPanelLeft size={16} />}
      />

      <AnimatePresence>
        {activePanel === 'topbar' && (
          <SlidingPanel
            key="topbar"
            isOpen={true}
            onClose={closePanel}
            title="Topbar Settings"
            panelId="topbar"
          >
            <TopbarSettings />
          </SlidingPanel>
        )}

        {activePanel === 'sidebar' && (
          <SlidingPanel
            key="sidebar"
            isOpen={true}
            onClose={closePanel}
            title="Sidebar Settings"
            panelId="sidebar"
          >
            <SidebarSettings />
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopularStoreMenubarSettings;
