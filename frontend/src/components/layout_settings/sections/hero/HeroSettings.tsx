import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import FirstHeroSettings from "./first/FirstHeroSettings"
import HeroWithButtonBetweenImagesSettings from "./with_button_between_images/HeroWithButtonBetweenImagesSettings";
import HeroWithImagePatternAndBoxSettings from "./with_image_pattern_and_box/HeroWithImagePatternAndBoxSettings";
import HeroWithSlidingImages from "./with_sliding_images/HeroWithSlidingImagesSettings";
import HeroWithButtonImageAndTextSettings from "./with_button_image_and_text/HeroWithButtonImageAndTextSettings";
const HeroSettings = () => {
  const dispatch = useAppDispatch();
  const variation = useAppSelector((state) => state.layoutSettings.hero.variation);
  const settings = useAppSelector((state) => state.layoutSettings);
  const handleSettingChange = (field: string, value: any) => {
      dispatch(updateSetting({ field, value }));
  };
  if (variation === "first") {
    return <FirstHeroSettings />
  }

  if (variation === "heroWithImagePatternAndBox") {
    return <HeroWithImagePatternAndBoxSettings settings={settings} handleSettingChange={handleSettingChange}/>
  }

  if (variation === "heroWithSlidingImages") {
    return <HeroWithSlidingImages />
  }

  if (variation === "heroWithButtonBetweenImages") {
    return <HeroWithButtonBetweenImagesSettings settings={settings} handleSettingChange={handleSettingChange}/>
  }
  
  if (variation === "heroWithButtonImageAndText") {
    return <HeroWithButtonImageAndTextSettings settings={settings} handleSettingChange={handleSettingChange}/>
  }

  return (
    <FirstHeroSettings />
  )
}

export default HeroSettings