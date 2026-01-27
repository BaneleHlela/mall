import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import FooterWithStoreDetailsButtonAndFormOrLocationSettings from './with_store_details_button_and_form_or_location/FooterWithStoreDetailsButtonAndFormOrLocationSettings';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import AddToMenuBarToggler from '../../extras/AddToMenubarToggler';
import FooterWithSocialsAndEmailSettings from './footer_with_socials_and_email/FooterWithSocialsAndEmailSettings';
import FastFoodFooterSettings from './fast_food_footer/FastFoodFooterSettings';

const StoreFooterSectionSettings = () => {
  const dispatch = useAppDispatch();
  const variation = useAppSelector((state) => state.layoutSettings.sections.footer.variation);
  const settings = useAppSelector((state) => state.layoutSettings);
  const handleSettingChange = (field: string, value: any) => {
      dispatch(updateSetting({ field, value }));
  };
  if ( variation === "footerWithStoreDetailsButtonAndFormOrLocation") {
    return (
      <>
        <AddToMenuBarToggler section='footer' />
        <FooterWithStoreDetailsButtonAndFormOrLocationSettings handleSettingChange={handleSettingChange} settings={settings}/>
      </>
    )
  }

  if ( variation === "footerWithSocialsAndEmail") {
    return (
      <>
        <AddToMenuBarToggler section='footer' />
        <FooterWithSocialsAndEmailSettings handleSettingChange={handleSettingChange} settings={settings}/>
      </>
    )
  }

  if ( variation === "fastFoodFooter") {
    return (
      <>
        <AddToMenuBarToggler section='footer' />
        <FastFoodFooterSettings handleSettingChange={handleSettingChange} settings={settings}/>
      </>
    )
  }

  return (
    <div>No settings matching {variation}</div>
  )
}

export default StoreFooterSectionSettings