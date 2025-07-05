import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import FirstStoreServicesSectionSettings from './first/FirstStoreServicesSectionSettings';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';

const ServicesSectionSettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.services.variation);
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };


    if (variation === 'firstStoreServices') {
        return (
            <FirstStoreServicesSectionSettings settings={settings} handleSettingChange={handleSettingChange}/>
        )
    }
    return (
        <div>ServicesSectionSettings</div>
    )
}

export default ServicesSectionSettings