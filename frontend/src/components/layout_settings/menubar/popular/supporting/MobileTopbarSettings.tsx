import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import LogoSettings from './LogoSettings';
import IconsSettingsHandler from './IconsSettingsHandler';
import StoreButtonSettings from '../../../extras/StoreButtonSettings';
import OptionsToggler from '../../../supporting/OptionsToggler';
import HamburgerSettings from './HamburgerSettings';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../../supporting/SlidingPanel';
import { AnimatePresence } from 'framer-motion';

const MobileTopbarSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  return (
    <div className="space-y-1 px-2 py-1">
      {/* Togglers */}
      <div className="border rounded px-2">
        <OptionsToggler
            label="Hamburger First"
            options={['true', 'false']}
            value={String(settings.menubar.topbar.mobile.hamburgerFirst)}
            onChange={(value) =>
            handleSettingChange('menubar.topbar.mobile.hamburgerFirst', value === 'true')
            }
        />
        <OptionsToggler
            label="Display"
            options={['logo', 'extras']}
            value={settings.menubar.topbar.mobile.display}
            onChange={(value) => handleSettingChange('menubar.topbar.mobile.display', value)}
        />
      </div>
      {/* Subsettings Panels */}
      <FirstOrderSubSettingsContainer
        name="Logo Settings"
        onClick={() => setActivePanel('logo')}
      />
      <FirstOrderSubSettingsContainer
        name="Icons"
        onClick={() => setActivePanel('icons')}
      />
      <FirstOrderSubSettingsContainer
        name="Button"
        onClick={() => setActivePanel('button')}
      />
      <FirstOrderSubSettingsContainer
        name="Hamburger"
        onClick={() => setActivePanel('hamburger')}
      />

      {/* Sliding Panels */}
      <AnimatePresence>
        {activePanel === 'logo' && (
          <SlidingPanel
            key="logo"
            isOpen={true}
            onClose={closePanel}
            title="Mobile Logo Settings"
          >
            <LogoSettings
              objectPath="menubar.topbar.mobile.logo"
              device="mobile"
            />
          </SlidingPanel>
        )}

        {activePanel === 'icons' && (
          <SlidingPanel
            key="icons"
            isOpen={true}
            onClose={closePanel}
            title="Mobile Icons Settings"
          >
            <IconsSettingsHandler
              settings={settings}
              handleSettingChange={handleSettingChange}
              objectPath="menubar.topbar.mobile.extras.icons"
            />
          </SlidingPanel>
        )}

        {activePanel === 'button' && (
          <SlidingPanel
            key="button"
            isOpen={true}
            onClose={closePanel}
            title="Mobile Button Settings"
          >
            <StoreButtonSettings
              objectPath="menubar.topbar.mobile.extras.button"
              settings={settings}
            />
          </SlidingPanel>
        )}

        {activePanel === 'hamburger' && (
          <SlidingPanel
            key="hamburger"
            isOpen={true}
            onClose={closePanel}
            title="Hamburger Settings"
          >
            <HamburgerSettings />
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileTopbarSettings;
