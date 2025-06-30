import { useAppSelector } from "../../../../app/hooks";
import type { SectionProps } from "../../../../types/layoutTypes"
import SecondStoreAboutSection from "./second/SecondStoreAboutSection";

const StoreAboutSection = ({id}: SectionProps) => {
  const variation = useAppSelector((state) => state.layoutSettings.about.variation);

  if (variation === "aboutWithImageAndText") {
    return (
      <SecondStoreAboutSection /*id = {id}*//>
    )
  }
}

export default StoreAboutSection;