import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
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
            <ReviewsWithBackgroundImageAndCardSettings
                settings={settings} 
                handleSettingChange={handleSettingChange}
            />
        )
    }

    if (variation === "firstStoreReviewsSection") {
        return (
            <FirstStoreReviewsSectionSettings 
                settings={settings} 
                handleSettingChange={handleSettingChange}
            />
        )
    }

    return (
        <div>StoreReviewsSectionSettings</div>
    )
}

export default StoreReviewsSectionSettings