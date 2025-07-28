import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import FirstStoreServicesSectionSettings from './first/FirstStoreServicesSectionSettings';
import { updateSetting } from '../../../../features/layouts/layoutSettingsSlice';
import ServicesSectionSimpleSettings from './simple/ServicesSectionSimpleSettings';
import OptionsToggler from '../../supporting/OptionsToggler';
import { handleAddSectionToLinks } from '../hero/HeroSettings';

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
    if (variation === 'servicesSectionSimple') {
        return (
            <div className='space-y-1'>
                <div className="px-2 py-1 border rounded">
                    <OptionsToggler
                        label="Add to Menubar ?"
                        options={['yes', 'no']}
                        value={settings.routes?.home?.inLinks?.some(link => link.section === 'services') ? 'yes' : 'no'}
                        onChange={(option) => handleAddSectionToLinks(dispatch, settings, 'services', option)}
                    />
                </div>
                <ServicesSectionSimpleSettings settings={settings} handleSettingChange={handleSettingChange}/>
            </div>
            
        )
    }

    return (
        <div>ServicesSectionSettings</div>
    )
}

export default ServicesSectionSettings