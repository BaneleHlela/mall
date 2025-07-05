import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import AboutWithImageNextToTextSettings from "./with_image_next_to_text/AboutWithImageNextToTextSettings";

const AboutSettingsSection = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((state) => state.layoutSettings);
    const variation = useAppSelector((state) => state.layoutSettings.about.variation);
    
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };
    if (variation === "aboutWithImageNextToText") {
        return (
            <AboutWithImageNextToTextSettings settings={settings} handleSettingChange={handleSettingChange}/>
        )
    }
    return (
        <div>No settings found</div>
    )
}

export default AboutSettingsSection