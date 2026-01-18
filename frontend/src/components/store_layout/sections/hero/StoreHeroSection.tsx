import { useAppSelector } from '../../../../app/hooks';
import HeroWithImagePatternAndBox from './hero_with_pattern_image_and_box/HeroWithImagePatternAndBox';
import HeroWithSlidingImages from './second/HeroWithSlidingImages';
import HeroWithButtonBetweenImagesSection from './hero_with_button_between_images/HeroWithButtonBetweenImages';
import HeroWithButtonImageAndText from './hero_with_button_image_and_text/HeroWithButtonImageAndText';
import HeroWithReviewCardAndEmailForm from './with_review_card_and_email_form/HeroWithReviewCardAndEmailForm';
import HeroWithBox from './hero_with_box/HeroWithBox';
import HeroWithDivAndImage from './hero_with_div_and_image/HeroWithDivAndImage';
import StylishHero from './styling_hero/StylishHero';
import HeroWithTwoTextAreas from './hero_with_two_text_areas/HeroWithTwoTextAreas';

const StoreHeroSection = () => {
  const variation = useAppSelector(
    (state) => state.layoutSettings.sections.hero.variation
  );

  switch (variation) {
    case 'heroWithButtonBetweenImages':
      return <HeroWithButtonBetweenImagesSection />;

    case 'stylishHero':
      return <StylishHero />;

    case 'heroWithImagePatternAndBox':
      return <HeroWithImagePatternAndBox />;

    case 'heroWithReviewCardAndEmailForm':
      return <HeroWithReviewCardAndEmailForm />;

    case 'heroWithBox':
      return <HeroWithBox />;

    case 'heroWithDivAndImage':
      return <HeroWithDivAndImage />;

    case 'firstHero':
      return <HeroWithSlidingImages />;

    case 'heroWithButtonImageAndText':
      return <HeroWithButtonImageAndText />;
    case 'heroWithTwoTextAreas':
      return <HeroWithTwoTextAreas />
    default:
      return null;
  }
};

export default StoreHeroSection;
