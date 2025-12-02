import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateSetting } from "../../../../features/layouts/layoutSettingsSlice";
import FirstHeroSettings from "./first/FirstHeroSettings"
import HeroWithButtonBetweenImagesSettings from "./with_button_between_images/HeroWithButtonBetweenImagesSettings";
import HeroWithImagePatternAndBoxSettings from "./with_image_pattern_and_box/HeroWithImagePatternAndBoxSettings";
import HeroWithSlidingImages from "./with_sliding_images/HeroWithSlidingImagesSettings";
import HeroWithButtonImageAndTextSettings from "./with_button_image_and_text/HeroWithButtonImageAndTextSettings";
import HeroWithReviewCardAndEmailFormSettings from "./with_review_card_and_email_form/HeroWithReviewCardAndEmailFormSettings";
import HeroWithBoxSettings from "./hero_with_box/HeroWithBoxSettings";
import HeroWithDivAndImageSettings from "./hero_with_div_and_image/HeroWithDivAndImageSettings";
import StylishHero from "../../../store_layout/sections/hero/styling_hero/StylishHero";
import StylishHeroSettings from "./stylish_hero/StylishHeroSettings";

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
  const variation = useAppSelector((state) => state.layoutSettings.sections.hero.variation);
  const settings = useAppSelector((state) => state.layoutSettings);

  const handleSettingChange = (field: string, value: any) => {
    dispatch(updateSetting({ field, value }));
  };
  console.log(variation);
  switch (variation) {
    case "first":
      return <FirstHeroSettings />;

    case "heroWithImagePatternAndBox":
      return (
        <div className="space-y-1">
          <HeroWithImagePatternAndBoxSettings
            settings={settings}
            handleSettingChange={handleSettingChange}
          />
        </div>
      );

    case "heroWithSlidingImages":
      return <HeroWithSlidingImages />;

    case "heroWithButtonBetweenImages":
      return (
        <HeroWithButtonBetweenImagesSettings
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
      );

    case "heroWithButtonImageAndText":
      return (
        <HeroWithButtonImageAndTextSettings
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
      );

    case "heroWithBox":
      return (
        <HeroWithBoxSettings
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
      );

    case "heroWithReviewCardAndEmailForm":
      return (
        <div className="space-y-1">
          <HeroWithReviewCardAndEmailFormSettings
            settings={settings}
            handleSettingChange={handleSettingChange}
          />
        </div>
      );

    case "heroWithDivAndImage":
      return (
        <HeroWithDivAndImageSettings
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
    );
      
    case "stylishHero": 
      return (
        <StylishHeroSettings
          settings={settings}
          handleSettingChange={handleSettingChange}
        />
      );
      
    default:
      return <>No Settings for this hero</>;
  }
};

export default HeroSettings;
