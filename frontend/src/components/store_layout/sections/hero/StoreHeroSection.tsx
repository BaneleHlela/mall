import { useAppSelector } from '../../../../app/hooks';
import FirstHero from './first/FirstHero'
import HeroWithSlidingImages from './second/HeroWithSlidingImages';
import HeroWithButtonBetweenImagesSection from './third/HeroWithButtonBetweenImages';

const StoreHeroSection = () => {
  const variation = useAppSelector((state) => state.layoutSettings.hero.variation);
  if ( variation === "firstHero") {
  return (
    <HeroWithSlidingImages/>
  )}
  if ( variation === "heroWithButtonBetweenImages") {
    return (
      <HeroWithButtonBetweenImagesSection />
    )}
}

export default StoreHeroSection;
