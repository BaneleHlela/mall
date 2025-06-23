import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import BackgroundEditor from '../../background/BackgroundEditor';
import SubSettingsContainer from '../../extras/SubSettingsContainer'
import IconsOrButtonSettings from './supporting/IconsOrButtonSettings';
import SidebarSettings from './supporting/SidebarSettings';
import TopbarSettings from './supporting/TopbarSettings';

const PopularStoreMenubarSettings = () => {
    const settings = useAppSelector((state: any) => state.layoutSettings);
    const dispatch = useAppDispatch();
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
      <div className='p-2 space-y-1'>
          {/* Shared Settigns */}
          <SubSettingsContainer 
            name="Shared Settings" 
            SettingsComponent={
              <div className="w-full border border-black text-black rounded-sm">
                <BackgroundEditor 
                  objectPath="menubar.background"
                  handleSettingChange={handleSettingChange}
                  settings={settings}
                  allow={["color"]}
                />
                <IconsOrButtonSettings 
                  objectPath="menubar.extras" 
                  handleSettingChange={handleSettingChange}
                  settings={settings}
                />
              </div>
            }
          />
          
          <SubSettingsContainer 
            name="Topbar" 
            SettingsComponent={<TopbarSettings />}
          />
          <SubSettingsContainer 
            name="Sidebar" 
            SettingsComponent={<SidebarSettings />}
          />
      </div>
    )
}

export default PopularStoreMenubarSettings;