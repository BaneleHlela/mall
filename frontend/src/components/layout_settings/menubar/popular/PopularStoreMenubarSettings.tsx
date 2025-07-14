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

const PopularStoreMenubarSettings = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  const settings = useAppSelector((state: any) => state.layoutSettings);
  const dispatch = useAppDispatch();

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  return (
    <div className="p-2 space-y-1">
      {/* Shared Settings */}
      <div className="w-full border border-black text-black rounded-sm">
        <BackgroundEditor
          objectPath="menubar.background"
          handleSettingChange={handleSettingChange}
          settings={settings}
          allow={['color']}
        />
      </div>

      {/* Topbar */}
      <FirstOrderSubSettingsContainer
        name="Topbar"
        onClick={() => setActivePanel('topbar')}
      />

      {/* Sidebar */}
      <FirstOrderSubSettingsContainer
        name="Sidebar"
        onClick={() => setActivePanel('sidebar')}
      />

      <AnimatePresence>
        {activePanel === 'topbar' && (
          <SlidingPanel
            key="topbar"
            isOpen={true}
            onClose={closePanel}
            title="Topbar Settings"
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
          >
            <SidebarSettings />
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopularStoreMenubarSettings;
