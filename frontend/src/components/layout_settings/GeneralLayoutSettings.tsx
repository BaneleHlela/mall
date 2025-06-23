import React from 'react'
import LayoutFontsSelector from './extras/LayoutFontsSelector'
import SubSettingsContainer from './extras/SubSettingsContainer'
import BackgroundEditor from './background/BackgroundEditor'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { updateSetting } from '../../features/layouts/layoutSettingsSlice'

const GeneralLayoutSettings = () => {
  const settings = useAppSelector((state: any) => state.layoutSettings);

    const dispatch = useAppDispatch();
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
  return (
    <div
        className='p-2 space-y-1'
    >
        <div className="shadow-sm border border-black text-black rounded-sm px-2 py-1">
          <div className="w-full text-center font-semibold mb-2">
            Store Background Settings
          </div>
          <BackgroundEditor
            objectPath="background"
            handleSettingChange={handleSettingChange}
            settings={settings}
            allow={["width", "color"]}
            responsiveSize={true}
          />
        </div>
        
        <SubSettingsContainer 
            name="Fonts" 
            SettingsComponent={<LayoutFontsSelector />}
        />
    </div>
  )
}

export default GeneralLayoutSettings