import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import AddToMenuBarToggler from "../../extras/AddToMenubarToggler";
import OptionsToggler from "../../supporting/OptionsToggler";
import { handleAddSectionToLinks } from "../hero/HeroSettings";
import FirstStoreReviewsSectionSettings from "./first/FirstStoreReviewsSectionSettings";
import ReviewsWithBackgroundImageAndCardSettings from "./with_bg_image_and_card/ReviewsWithBackgroundImageAndCardSettings";

const StoreReviewsSectionSettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.reviews.variation);
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
    }

    if (variation === "reviewsWithBackgroundImageAndCard") {
        return (
            <>
                <AddToMenuBarToggler section='reviews' />
                <ReviewsWithBackgroundImageAndCardSettings
                    settings={settings} 
                    handleSettingChange={handleSettingChange}
                />
            </>
        )
    }

    if (variation === "firstStoreReviewsSection") {
        return (
            <>
                <div className="px-2 py-1 border rounded">
                    <OptionsToggler
                        label="Add to Menubar ?"
                        options={['yes', 'no']}
                        value={settings.routes?.home?.inLinks?.some(link => link.section === 'reviews') ? 'yes' : 'no'}
                        onChange={(option) => handleAddSectionToLinks(dispatch, settings, 'reviews', option)}
                    />
                </div>
                <FirstStoreReviewsSectionSettings 
                    settings={settings} 
                    handleSettingChange={handleSettingChange}
                />
            </>
        )
    }

    return (
        <div>StoreReviewsSectionSettings</div>
    )
}

export default StoreReviewsSectionSettings