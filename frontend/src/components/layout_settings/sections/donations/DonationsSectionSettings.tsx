import React from 'react'
import PopularDonationsSettings from './popular_donations/PopularDonationsSettings';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';

const DonationsSettings = () => {
  const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
  return (
    <PopularDonationsSettings settings={settings} handleSettingChange={handleSettingChange}/>
  )
}

export default DonationsSettings;