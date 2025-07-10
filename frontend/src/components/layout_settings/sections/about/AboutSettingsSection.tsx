import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import OptionsToggler from "../../supporting/OptionsToggler";
import { handleAddSectionToLinks } from "../hero/HeroSettings";
import AboutWithImageNextToTextSettings from "./with_image_next_to_text/AboutWithImageNextToTextSettings";

const AboutSettingsSection = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const variation = useAppSelector((state) => state.layoutSettings.about.variation);
    const routes = useAppSelector((state) => state.layoutSettings.routes);
    const pageSections = routes.home?.contains || [];
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    if (variation === "aboutWithImageNextToText") {
        return (
            <div className="space-y-1">
                {pageSections.includes('about') && (
                    <div className="px-2 py-1 border rounded">
                        <OptionsToggler
                            label="Add to Menubar ?"
                            options={['yes', 'no']}
                            value={settings.routes?.home?.inLinks?.some(link => link.section === 'about') ? 'yes' : 'no'}
                            onChange={(option) => handleAddSectionToLinks(dispatch, settings, 'about', option)}
                        />
                    </div>
                )}
                <AboutWithImageNextToTextSettings settings={settings} handleSettingChange={handleSettingChange}/>
            </div>
        )
    }
    return (
        <div>No settings found</div>
    )
}

export default AboutSettingsSection