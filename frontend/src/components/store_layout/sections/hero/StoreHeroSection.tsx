import { useAppSelector } from '../../../../app/hooks';
import HeroWithImagePatternAndBox from './hero_with_pattern_image_and_box/HeroWithImagePatternAndBox'
import HeroWithSlidingImages from './second/HeroWithSlidingImages';
import HeroWithButtonBetweenImagesSection from './hero_with_button_between_images/HeroWithButtonBetweenImages';

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

  if ( variation === "firstHero") {
  return (
    <HeroWithSlidingImages/>
  )}
  
}

export default StoreHeroSection;
