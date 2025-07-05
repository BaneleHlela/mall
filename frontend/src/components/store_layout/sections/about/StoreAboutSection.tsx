import { useAppSelector } from "../../../../app/hooks";
import type { SectionProps } from "../../../../types/layoutTypes"
import AboutWithImageNextToText from "./with_image_next_to_text/AboutWithImageNextToText";

const StoreAboutSection = ({id}: SectionProps) => {
  const variation = useAppSelector((state) => state.layoutSettings.about.variation);

  if (variation === "aboutWithImageNextToText") {
    return (
      <AboutWithImageNextToText /*id = {id}*//>
    )
  }
}

export default StoreAboutSection;