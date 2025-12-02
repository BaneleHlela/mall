import { useAppSelector } from '../../../../app/hooks';
import HeroWithImagePatternAndBox from './hero_with_pattern_image_and_box/HeroWithImagePatternAndBox'
import HeroWithSlidingImages from './second/HeroWithSlidingImages';
import HeroWithButtonBetweenImagesSection from './hero_with_button_between_images/HeroWithButtonBetweenImages';
import HeroWithButtonImageAndText from './hero_with_button_image_and_text/HeroWithButtonImageAndText';
import HeroWithReviewCardAndEmailForm from './with_review_card_and_email_form/HeroWithReviewCardAndEmailForm';
import HeroWithBox from './hero_with_box/HeroWithBox';
import HeroWithDivAndImage from './hero_with_div_and_image/HeroWithDivAndImage';
import StylishHero from './styling_hero/StylishHero';
const StoreHeroSection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.sections.hero.variation);
  
  if ( variation === "heroWithButtonBetweenImages") {
    return (
      <HeroWithButtonBetweenImagesSection />
  )}

  if ( variation === "stylishHero") {
    return (
      <StylishHero />
  )}
  
  if (variation === "heroWithImagePatternAndBox") {
    return (
      <HeroWithImagePatternAndBox/>
    )
  }
  if (variation === "heroWithReviewCardAndEmailForm") {
    return (
      <HeroWithReviewCardAndEmailForm />
    )
  }

  if (variation === "heroWithBox") {
    return (
      <HeroWithBox />
    )
  }

  if (variation === "heroWithDivAndImage") {
    return (
      <HeroWithDivAndImage />
    )
  }

  if ( variation === "firstHero") {
  return (
    <HeroWithSlidingImages/>
  )}
  if (variation === "heroWithButtonImageAndText") {
    return (
      <HeroWithButtonImageAndText/>
    )
  }
}

export default StoreHeroSection;
