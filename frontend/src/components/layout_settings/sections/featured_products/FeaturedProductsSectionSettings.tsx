import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import PopularFeaturedProductsSectionSettings from "./popular/PopularFeaturedProductsSectionSettings";

const FeaturedProductsSectionSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.layoutSettings);
  const handleSettingChange = (field: string, value: any) => {
      dispatch(updateSetting({ field, value }));
  };

  return (
    <PopularFeaturedProductsSectionSettings settings={settings} handleSettingChange={handleSettingChange}/>
  )
}

export default FeaturedProductsSectionSettings