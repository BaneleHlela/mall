import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import PopularStoreMenuSectionSettings from './popular/PopularStoreMenuSectionSettings';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';

const StoreMenuSectionSettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.sections.menu.variation);
    const settings = useAppSelector((state) => state.layoutSettings);
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
  
    if (variation === "popularMenu") {
        <PopularStoreMenuSectionSettings
            settings={settings}
            handleSettingChange={handleSettingChange}
        />
    }
    return (
        <PopularStoreMenuSectionSettings
            settings={settings}
            handleSettingChange={handleSettingChange}
        />
    )
 }

export default StoreMenuSectionSettings