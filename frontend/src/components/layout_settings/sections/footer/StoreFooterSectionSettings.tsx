import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import FooterWithStoreDetailsButtonAndFormOrLocationSettings from './with_store_details_button_and_form_or_location/FooterWithStoreDetailsButtonAndFormOrLocationSettings';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';

const StoreFooterSectionSettings = () => {
  const dispatch = useAppDispatch();
  const variation = useAppSelector((state) => state.layoutSettings.footer.variation);
  const settings = useAppSelector((state) => state.layoutSettings);
  const handleSettingChange = (field: string, value: any) => {
      dispatch(updateSetting({ field, value }));
  };
  if ( variation === "footerWithStoreDetailsButtonAndFormOrLocation") {
    return (
      <>
        <FooterWithStoreDetailsButtonAndFormOrLocationSettings handleSettingChange={handleSettingChange} settings={settings}/>
      </>
    )
  }
  return (
    <div>StoreFooterSectionSetting</div>
  )
}

export default StoreFooterSectionSettings