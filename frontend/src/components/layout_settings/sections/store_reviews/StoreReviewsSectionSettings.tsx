import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import FirstStoreReviewsSectionSettings from "./first/FirstStoreReviewsSectionSettings";

const StoreReviewsSectionSettings = () => {
    const dispatch = useAppDispatch();
    const variation = useAppSelector((state) => state.layoutSettings.reviews.variation);
    const settings = useAppSelector((state) => state.layoutSettings);
    const handleSettingChange = (field: string, value: any) => {
        dispatch(updateSetting({ field, value }));
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