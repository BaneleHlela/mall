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
import IconsOrButtonSettings from './IconsOrButtonSettings';
import BackgroundEditor from '../../../background/BackgroundEditor';
import SubSettingsContainer from '../../../extras/SubSettingsContainer';

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

      <SubSettingsContainer
          name="Background"
          SettingsComponent={
              <BackgroundEditor
                  objectPath={`menubar.sidebar.background`}
                  settings={settings}
                  handleSettingChange={handleSettingChange}
                  allow={['color', 'border', 'padding', "height", "width"]}
              />
          }
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
            <MenubarLinksSettings type="sidebar" allowPositioning={true}/>
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
            <IconsOrButtonSettings
              objectPath="menubar.sidebar.extras"
              handleSettingChange={handleSettingChange}
              settings={settings}
            />
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarSettings;
