import React from 'react'
import PopularRentalsSettings from './popular_rentals/PopularRentalsSettings';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';

const RentalsSettings = () => {
  const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
  return (
    <PopularRentalsSettings settings={settings} handleSettingChange={handleSettingChange}/>
  )
}

export default RentalsSettings;