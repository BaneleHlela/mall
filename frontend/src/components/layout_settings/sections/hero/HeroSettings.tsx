import { useAppSelector } from "../../../../app/hooks";
import FirstHeroSettings from "./first/FirstHeroSettings"
import HeroWithSlidingImages from "./with_sliding_images/HeroWithSlidingImages";


const HeroSettings = () => {
  const variation = useAppSelector((state) => state.layoutSettings.hero.variation);

  if (variation === "first") {
    return <FirstHeroSettings />
  }
  if (variation === "heroWithSlidingImages") {
    return <HeroWithSlidingImages />
  }

  return (
    <>No settings matching this hero</>
  )
}

export default HeroSettings