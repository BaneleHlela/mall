import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import OptionsToggler from "../../supporting/OptionsToggler";
import { handleAddSectionToLinks } from "../hero/HeroSettings";
import GalleryWithGroupedImagesSettings from "./with_grouped_images/GalleryWithGroupedImagesSettings";
import GalleryWithHorizontalImagesSettings from "./with_horizontal_images/GalleryWithHorizontalImagesSettings";
import GalleryWithImageSliderSettings from "./with_image_slider/GalleryWithImageSliderSettings";
import MaxThreeGallerySettings from "./max_three_gallery/MaxThreeGallerySettings";
const StoreGallerySettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.sections.gallery.variation);
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    };

    if (variation === "galleryWithImageSlider") {
        
        return (
        <div className="space-y-[.8vh]">
            <div className="px-2 py-1 border-[.1vh] rounded-[.5vh]">
                <OptionsToggler
                    label="Add to Menubar ?"
                    options={['yes', 'no']}
                    value={settings.routes?.home?.inLinks?.some(link => link.section === 'gallery') ? 'yes' : 'no'}
                    onChange={(option) => handleAddSectionToLinks(dispatch, settings, 'gallery', option)}
                />
            </div>
            <GalleryWithImageSliderSettings settings={settings} handleSettingChange={handleSettingChange} />
        </div>
        )
    }
    
    if (variation === "galleryWithGroupedImages") {
        return (
            <div className="space-y-[.8vh]">
                <div className="px-2 py-1 border-[.1vh] rounded-[.5vh]">
                    <OptionsToggler
                        label="Add to Menubar ?"
                        options={['yes', 'no']}
                        value={settings.routes?.home?.inLinks?.some(link => link.section === 'gallery') ? 'yes' : 'no'}
                        onChange={(option) => handleAddSectionToLinks(dispatch, settings, 'gallery', option)}
                    />
                </div>
                <GalleryWithGroupedImagesSettings settings={settings} handleSettingChange={handleSettingChange} />
            </div>
        )
    }
    if (variation === "galleryWithHorizontalImages") {
        return <GalleryWithHorizontalImagesSettings settings={settings} handleSettingChange={handleSettingChange}  />
    }
    if (variation === "maxThreeGallery") {
        return (
            <div className="space-y-[.8vh]">
                <div className="px-2 py-1 border-[.1vh] rounded-[.5vh]">
                    <OptionsToggler
                        label="Add to Menubar ?"
                        options={['yes', 'no']}
                        value={settings.routes?.home?.inLinks?.some(link => link.section === 'gallery') ? 'yes' : 'no'}
                        onChange={(option) => handleAddSectionToLinks(dispatch, settings, 'gallery', option)}
                    />
                </div>
                <MaxThreeGallerySettings settings={settings} handleSettingChange={handleSettingChange} />
            </div>
        )
    }
    return (
        <div>StoreGallerySettings</div>
    )
}

export default StoreGallerySettings;