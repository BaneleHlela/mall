import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import PopularProductsSectionSettings from './popular/PopularProductsSectionSettings';

const ProductsSectionSettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.products.variation);
    const settings = useAppSelector((state) => state.layoutSettings);
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    if ( variation === "productsSectionPopular") {
        return <PopularProductsSectionSettings settings={settings} handleSettingChange={handleSettingChange}/>
    }    
    
    
    return (
        <div>ProductsSectionSettings</div>
    )
}

export default ProductsSectionSettings