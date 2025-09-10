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
import OptionsToggler from '../../../supporting/OptionsToggler';
import { getSetting } from '../../../../../utils/helperFunctions';
import BackgroundEditor from '../../../background/BackgroundEditor';

const DesktopTopbarSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings);
  const order = settings.menubar.topbar.desktop.order;

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };
  console.log(getSetting("desktop.position", settings, "menubar.topbar"))

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
      {/* Position Settings*/}
      <div className="px-2">
        <OptionsToggler
          label="Sticky?"
          options={["static", "sticky", "fixed"]}
          value={getSetting("desktop.position", settings, "menubar.topbar")}
          onChange={(newValue) =>
            handleSettingChange("menubar.topbar.desktop.position", newValue)
          }
        />
      </div>

      {/* Clickable Sections */}
      {/* Background */}
      <FirstOrderSubSettingsContainer
        name="Background"
        onClick={() => setActivePanel('background')}
      />
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
        {activePanel === "background" && (
          <SlidingPanel
            key="background"
            isOpen={true}
            onClose={closePanel}
            title="Desktop Topbar Background"
          >
            <BackgroundEditor
              objectPath="menubar.topbar.desktop.background"
              handleSettingChange={handleSettingChange}
              settings={settings}
              allow={['color', "padding", "height"]}
              heightUnit='vh'
            />
          </SlidingPanel>
        )}
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
