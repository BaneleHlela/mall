import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import AddToMenuBarToggler from '../../extras/AddToMenubarToggler';
import HorizontalProductSettings from './horizontal_products/HorizontalProductSettings';
import PopularProductsSectionSettings from './popular/PopularProductsSectionSettings';

const ProductsSectionSettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.sections.products.variation);
    const settings = useAppSelector((state) => state.layoutSettings);
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    if ( variation === "productsSectionPopular") {
        return (
            <>
                <AddToMenuBarToggler section='products' />
                <PopularProductsSectionSettings settings={settings} handleSettingChange={handleSettingChange}/>
            </>
        ) 
    }    
    
    if (variation === "horizontalProducts") {
        return (
            <>
                <AddToMenuBarToggler section='products' />
                <HorizontalProductSettings />
            </>
        )
    }
    
    return (
        <div>ProductsSectionSettings</div>
    )
}

export default ProductsSectionSettings