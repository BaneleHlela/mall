import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import PopularStoreTeamSectionSettings from "./popular/PopularStoreTeamSectionSettings"

const StoreTeamSectionSettings = () => {
  const dispatch = useAppDispatch();
  const variation = useAppSelector((state) => state.layoutSettings.hero.variation);
  const settings = useAppSelector((state) => state.layoutSettings);
  const handleSettingChange = (field: string, value: any) => {
      dispatch(updateSetting({ field, value }));
  };

  return (
    <PopularStoreTeamSectionSettings settings={settings} handleSettingChange={handleSettingChange}/>
  )
}

export default StoreTeamSectionSettings