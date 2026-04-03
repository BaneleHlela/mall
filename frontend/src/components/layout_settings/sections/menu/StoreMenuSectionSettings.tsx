import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import PopularStoreMenuSectionSettings from './popular/PopularStoreMenuSectionSettings';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import AddToMenuBarToggler from '../../extras/AddToMenubarToggler';
import SectionPositionMover from '../../supporting/SectionPositionMover';

const StoreMenuSectionSettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.sections.menu.variation);
    const settings = useAppSelector((state) => state.layoutSettings);
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    return (
        <>
            <SectionPositionMover section="menu" />
            <AddToMenuBarToggler section='menu' />
            <PopularStoreMenuSectionSettings
                settings={settings}
                handleSettingChange={handleSettingChange}
            />
        </>
    )
 }

export default StoreMenuSectionSettings