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
        name="Logo Settings"
        onClick={() => setActivePanel('logo')}
      />
      <FirstOrderSubSettingsContainer
        name="Links Settings"
        onClick={() => setActivePanel('links')}
      />
      {settings.menubar.extras.include === 'icons' && (
        <FirstOrderSubSettingsContainer
          name="Icons"
          onClick={() => setActivePanel('icons')}
        />
      )}

      {settings.menubar.extras.include === 'button' && (
        <FirstOrderSubSettingsContainer
          name="Button"
          onClick={() => setActivePanel('button')}
        />
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

        {activePanel === 'icons' && settings.menubar.extras.include === 'icons' && (
            <SlidingPanel
              key="icons"
              isOpen={true}
              onClose={closePanel}
              title="Icons Settings"
            >
              <IconsSettingsHandler
                settings={settings}
                handleSettingChange={handleSettingChange}
                objectPath="menubar.topbar.desktop.extras.icons"
              />
            </SlidingPanel>
        )}

        {activePanel === 'button' && settings.menubar.extras.include === 'button' && (
            <SlidingPanel
              key="button"
              isOpen={true}
              onClose={closePanel}
              title="Button Settings"
            >
              <StoreButtonSettings
                objectPath="menubar.topbar.desktop.extras.button"
                settings={settings}
              />
            </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesktopTopbarSettings;
