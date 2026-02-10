import React from 'react'
import PopularStorePackagesSectionsSettings from './popular/PopularStorePackagesSectionsSettings'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import AddToMenuBarToggler from '../../extras/AddToMenubarToggler';

const StorePackagesSectionSettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.sections.hero.variation);
    const settings = useAppSelector((state) => state.layoutSettings);

    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <div>
            <div className="mb-4">
                <AddToMenuBarToggler section="packages" />
            </div>
            <PopularStorePackagesSectionsSettings 
                handleSettingChange={handleSettingChange}
                settings={settings}
            />
        </div>
    )
}

export default StorePackagesSectionSettings;
