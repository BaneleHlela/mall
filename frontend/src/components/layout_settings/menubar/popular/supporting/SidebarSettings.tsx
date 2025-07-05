import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { updateSetting } from '../../../../../features/layouts/layoutSettingsSlice';
import OptionsToggler from '../../../supporting/OptionsToggler';
import MenubarLinksSettings from './MenubarLinksSettings';
import IconsSettingsHandler from './IconsSettingsHandler';
import StoreButtonSettings from '../../../extras/StoreButtonSettings';
import FirstOrderSubSettingsContainer from '../../../FirstOrderSubSettingsContainer';
import SlidingPanel from '../../../supporting/SlidingPanel';
import { AnimatePresence } from 'framer-motion';

const SidebarSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: any) => state.layoutSettings);
  const sidebarAnimation = settings.menubar.sidebar.animation;

  const [activePanel, setActivePanel] = useState<string | null>(null);
  const closePanel = () => setActivePanel(null);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };

  const animationOptions = ['leftToRight', 'rightToLeft', 'upToDown', 'downToUp', 'fade'];

  return (
    <div className="space-y-1 px-2 py-1">
      {/* Animation Toggler */}
      <OptionsToggler
        label="Animation"
        options={animationOptions}
        value={sidebarAnimation}
        onChange={(value) => handleSettingChange('menubar.sidebar.animation', value)}
      />

      {/* Refactored: Links Section */}
      <FirstOrderSubSettingsContainer
        name="Links"
        onClick={() => setActivePanel('links')}
      />

      {/* Refactored: Extras Section */}
      <FirstOrderSubSettingsContainer
        name="Extras"
        onClick={() => setActivePanel('extras')}
      />

      <AnimatePresence>
        {/* Links Panel */}
        {activePanel === 'links' && (
          <SlidingPanel
            key="links"
            isOpen={true}
            onClose={closePanel}
            title="Sidebar Links"
          >
            <MenubarLinksSettings type="sidebar" />
          </SlidingPanel>
        )}

        {/* Extras Panel */}
        {activePanel === 'extras' && (
          <SlidingPanel
            key="extras"
            isOpen={true}
            onClose={closePanel}
            title="Sidebar Extras"
          >
            <div className="px-2 space-y-2 py-1">
              <div className="px-2">
                <OptionsToggler
                    label="Display"
                    options={['icons', 'button', 'none']}
                    value={settings.menubar.sidebar.display}
                    onChange={(value) =>
                    handleSettingChange('menubar.sidebar.display', value)
                    }
                />
              </div>
              <IconsSettingsHandler
                settings={settings}
                handleSettingChange={handleSettingChange}
                objectPath="menubar.sidebar.icons"
              />
              <StoreButtonSettings
                objectPath="menubar.sidebar.button"
                settings={settings}
              />
            </div>
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarSettings;
