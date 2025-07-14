import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import OrderDnD from '../../../extras/OrderDnD';
import LogoSettings from './LogoSettings';
import MenubarLinksSettings from './MenubarLinksSettings';
import IconsSettingsHandler from './IconsSettingsHandler';
import StoreButtonSettings from '../../../extras/StoreButtonSettings';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../../supporting/SlidingPanel';
import { AnimatePresence } from 'framer-motion';
import IconsOrButtonSettings from './IconsOrButtonSettings';

const DesktopTopbarSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings);
  const order = settings.menubar.topbar.desktop.order;

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  return (
    <div className="space-y-1 px-2 py-1">
      {/* Order Section */}
      <div className="flex flex-col items-center text-center border rounded py-1">
        <p>Order</p>
        <OrderDnD
          order={order}
          objectPath="menubar.topbar.desktop.order"
        />
      </div>

      {/* Clickable Sections */}
      <FirstOrderSubSettingsContainer
        name="Logo"
        onClick={() => setActivePanel('logo')}
      />
      <FirstOrderSubSettingsContainer
        name="Links"
        onClick={() => setActivePanel('links')}
      />
      
      <FirstOrderSubSettingsContainer
        name="Extras"
        onClick={() => setActivePanel('extras')}
      />
      {activePanel === "extras" && (
        <SlidingPanel
          key="extras"
          isOpen={true}
          onClose={closePanel}
          title="Extras Settings"
        >
          <IconsOrButtonSettings
            objectPath="menubar.topbar.desktop.extras"
            handleSettingChange={handleSettingChange}
            settings={settings}
          />
        </SlidingPanel>
      )}
      {/* Panels */}
      <AnimatePresence>
        {activePanel === 'logo' && (
          <SlidingPanel
            key="logo"
            isOpen={true}
            onClose={closePanel}
            title="Logo Settings"
          >
            <LogoSettings
              objectPath="menubar.topbar.desktop.logo"
              device="desktop"
            />
          </SlidingPanel>
        )}

        {activePanel === 'links' && (
          <SlidingPanel
            key="links"
            isOpen={true}
            onClose={closePanel}
            title="Links Settings"
          >
            <MenubarLinksSettings type="desktop" />
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesktopTopbarSettings;
