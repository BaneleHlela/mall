import { useAppSelector } from '../../../../app/hooks';
import HeroWithImagePatternAndBox from './hero_with_pattern_image_and_box/HeroWithImagePatternAndBox'
import HeroWithSlidingImages from './second/HeroWithSlidingImages';
import HeroWithButtonBetweenImagesSection from './hero_with_button_between_images/HeroWithButtonBetweenImages';
import HeroWithButtonImageAndText from './hero_with_button_image_and_text/HeroWithButtonImageAndText';
import HeroWithReviewCardAndEmailForm from './with_review_card_and_email_form/HeroWithReviewCardAndEmailForm';
const StoreHeroSection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.hero.variation);
  
  if ( variation === "heroWithButtonBetweenImages") {
    return (
      <HeroWithButtonBetweenImagesSection />
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
