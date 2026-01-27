import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import { AnimatePresence } from 'framer-motion';
import SubSettingsContainer from '../../extras/SubSettingsContainer';
import FirstOrderSubSettingsContainer from '../../FirstOrderSubSettingsContainer';
import ColorPicker from '../../supporting/ColorPicker';
import OptionsToggler from '../../supporting/OptionsToggler';
import SlidingPanel from '../../supporting/SlidingPanel';
import GoogleFontsSelector from '../../text/GoogleFontsSelector';
import SimpleLogoSettings from '../popular/supporting/SimpleLogoSettings';
import TextEditor from '../../text/TextEditor';

const BlueSidebarSettings: React.FC = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings);
  const sidebarSettings = settings.menubar?.sidebar || {};

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
        value={sidebarSettings.animation || 'leftToRight'}
        onChange={(value) => handleSettingChange('menubar.sidebar.animation', value)}
      />

      {/* Background Color */}
      <OptionsToggler
        label="Background Color"
        options={['primary', 'secondary', 'tertiary', 'quad', 'pent']}
        value={sidebarSettings.backgroundColor || settings.colors.primary}
        onChange={(value) => handleSettingChange('menubar.sidebar.backgroundColor', value)}
      />

      {/* Logo Settings */}
      <FirstOrderSubSettingsContainer
        name="Logo"
        onClick={() => setActivePanel('logo')}
      />

      {/* Links Settings */}
      <FirstOrderSubSettingsContainer
        name="Links"
        onClick={() => setActivePanel('links')}
      />

      <AnimatePresence>
        {/* Logo Panel */}
        {activePanel === 'logo' && (
          <SlidingPanel
            key="logo"
            isOpen={true}
            onClose={closePanel}
            title="Sidebar Logo"
          >
            <SimpleLogoSettings objectPath="menubar.sidebar.logo" />
          </SlidingPanel>
        )}

        {/* Links Panel */}
        {activePanel === 'links' && (
          <SlidingPanel
            key="links"
            isOpen={true}
            onClose={closePanel}
            title="Sidebar Links"
          >
            <div className="space-y-2">
                <OptionsToggler
                    label="Alignment"
                    options={['left', 'center', 'right']}
                    value={sidebarSettings.links?.alignment || 'center'}
                    onChange={(value) => handleSettingChange('menubar.sidebar.links.alignment', value)}
                />
                <TextEditor
                    objectPath="menubar.sidebar.links"
                    settings={settings}
                    handleSettingChange={handleSettingChange}
                    allow={["color", "fontFamily", "fontWeight"]}
                />
                {/* <ColorPicker
                    label="Text Color"
                    value={sidebarSettings.links?.color || settings.colors.secondary}
                    onChange={(e) => handleSettingChange('menubar.sidebar.links.color', e.target.value)}
                />
                <SubSettingsContainer
                    name="Font Family"
                    SettingsComponent={
                    <GoogleFontsSelector
                        onFontSelect={(font) => handleSettingChange('menubar.sidebar.links.fontFamily', font)}
                        selectedFont={sidebarSettings.links?.fontFamily || settings.fonts.primary}
                        fullWidth
                    />
                    }
                /> */}
                {/* Option Toggler Border Color Picker */}
                <OptionsToggler
                    label="Border Color"
                    options={['primary', 'secondary', 'tertiary', 'quad', 'pent']}
                    value={sidebarSettings.links?.borderColor || settings.colors.quad}
                    onChange={(value) => handleSettingChange('menubar.sidebar.links.borderColor', value)}
                />
            </div>
          </SlidingPanel>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlueSidebarSettings;