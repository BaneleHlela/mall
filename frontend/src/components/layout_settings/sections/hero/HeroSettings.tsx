import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import FirstHeroSettings from "./first/FirstHeroSettings"
import HeroWithButtonBetweenImagesSettings from "./with_button_between_images/HeroWithButtonBetweenImagesSettings";
import HeroWithImagePatternAndBoxSettings from "./with_image_pattern_and_box/HeroWithImagePatternAndBoxSettings";
import HeroWithSlidingImages from "./with_sliding_images/HeroWithSlidingImagesSettings";
import HeroWithButtonImageAndTextSettings from "./with_button_image_and_text/HeroWithButtonImageAndTextSettings";
import OptionsToggler from "../../supporting/OptionsToggler";

export const handleAddSectionToLinks = (
  dispatch: any,
  settings: any,
  section: string,
  option: string
) => {
  const currentInLinks = settings.routes.home.inLinks || [];
  let newInLinks;

  if (option === 'yes') {
    if (!currentInLinks.some((link: { section: string }) => link.section === section)) {
      newInLinks = [...currentInLinks, { section, name: section.charAt(0).toUpperCase() + section.slice(1) }];
    } else {
      newInLinks = currentInLinks;
    }
  } else {
    newInLinks = currentInLinks.filter((link: { section: string }) => link.section !== section);
  }

  dispatch(updateSetting({ 
    field: 'routes.home.inLinks', 
    value: newInLinks 
  }));
};

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
    return (
      <div className="space-y-1">
        <div className="px-2 py-1 border rounded">
          <OptionsToggler
            label="Add to Menubar ?"
            options={['yes', 'no']}
            value={settings.routes?.home?.inLinks?.some(link => link.section === 'hero') ? 'yes' : 'no'}
            onChange={(option) => handleAddSectionToLinks(dispatch, settings, 'hero', option)}
          />
        </div>
        <HeroWithImagePatternAndBoxSettings settings={settings} handleSettingChange={handleSettingChange}/>
      </div>
    )
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

export default HeroSettings;