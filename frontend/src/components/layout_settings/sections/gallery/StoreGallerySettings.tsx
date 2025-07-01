import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import GalleryWithImageSliderSettings from "./with_image_slider/GalleryWithImageSliderSettings";
const StoreGallerySettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.gallery.variation);
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    if (variation === "galleryWithImageSlider") {
        return <GalleryWithImageSliderSettings settings={settings} handleSettingChange={handleSettingChange} />
    }
    
    return (
        <div>StoreGallerySettings</div>
    )
}

export default StoreGallerySettings;